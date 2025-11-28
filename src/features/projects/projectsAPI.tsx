import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TProject = {
    projectid: number;
    name: string;
    description: string;
    createdby: number;
    createdat: string;
    updatedat: string;
};

export const projectsAPI = createApi({
    reducerPath: "projectsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: apidomain }),
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        getProjects: builder.query<TProject[], void>({
            query: () => "/projects",
            providesTags: ["Projects"],
        }),
        getProjectById: builder.query<TProject, number>({
            query: (id) => `/projects/${id}`,
            providesTags: ["Projects"],
        }),
        createProject: builder.mutation<TProject, Partial<TProject>>({
            query: (newProject) => ({
                url: "/projects",
                method: "POST",
                body: newProject,
            }),
            invalidatesTags: ["Projects"],
        }),
        updateProject: builder.mutation<TProject, { id: number; data: Partial<TProject> }>({
            query: ({ id, data }) => ({
                url: `/projects/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Projects"],
        }),
        deleteProject: builder.mutation<void, number>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsAPI;