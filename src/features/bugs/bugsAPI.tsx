import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TBug = {
    bugid: number;
    title: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'critical';
    projectid: number;
    assignedto: number;
    createdby: number;
    createdat: string;
    updatedat: string;
};

export const bugsAPI = createApi({
    reducerPath: "bugsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: apidomain }),
    tagTypes: ["Bugs"],
    endpoints: (builder) => ({
        getBugs: builder.query<TBug[], void>({
            query: () => "/bugs",
            providesTags: ["Bugs"],
        }),
        getBugById: builder.query<TBug, number>({
            query: (id) => `/bugs/${id}`,
            providesTags: ["Bugs"],
        }),
        createBug: builder.mutation<TBug, Partial<TBug>>({
            query: (newBug) => ({
                url: "/bugs",
                method: "POST",
                body: newBug,
            }),
            invalidatesTags: ["Bugs"],
        }),
        updateBug: builder.mutation<TBug, { id: number; data: Partial<TBug> }>({
            query: ({ id, data }) => ({
                url: `/bugs/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Bugs"],
        }),
        deleteBug: builder.mutation<void, number>({
            query: (id) => ({
                url: `/bugs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Bugs"],
        }),
    }),
});

export const {
    useGetBugsQuery,
    useGetBugByIdQuery,
    useCreateBugMutation,
    useUpdateBugMutation,
    useDeleteBugMutation,
} = bugsAPI;