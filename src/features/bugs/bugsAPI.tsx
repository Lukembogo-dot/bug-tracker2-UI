import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TBug = {
    bugid: number;
    title: string;
    description: string | null;
    status: "Open" | "In Progress" | "Resolved" | "Closed";
    priority: "Low" | "Medium" | "High" | "Critical";
    projectid: number;
    reportedby: number | null;
    assignedto: number | null;
    createdat: string;
};

export const bugsAPI = createApi({
    reducerPath: "bugsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: apidomain,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Bugs"],
    endpoints: (builder) => ({
        getBugs: builder.query<{ bugs: TBug[] }, void>({
            query: () => "/bugs",
            providesTags: ["Bugs"],
        }),
        getBugsByAssignedUser: builder.query<{ bugs: TBug[] }, number>({
            query: (userid) => `/bugs/assignee/${userid}`,
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
    useGetBugsByAssignedUserQuery,
    useCreateBugMutation,
    useUpdateBugMutation,
    useDeleteBugMutation,
} = bugsAPI;