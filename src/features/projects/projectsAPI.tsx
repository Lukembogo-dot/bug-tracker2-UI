import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TProject = {
    projectid: number;
    projectname: string;
    description: string;
    createdby: number;
    assignedto: number;
    createdat: string;
    updatedat: string;
};

export const projectsAPI = createApi({
    reducerPath: "projectsAPI",
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
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        getProjects: builder.query<{ projects: TProject[] }, void>({
            query: () => "/projects",
            providesTags: ["Projects"],
        }),
        getProjectById: builder.query<TProject, number>({
            query: (id) => `/projects/${id}`,
            providesTags: ["Projects"],
        }),
        getProjectsByAssignedUser: builder.query<{ projects: TProject[] }, number>({
            query: (userid) => `/projects/assignee/${userid}`,
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
        deleteProject: builder.mutation<void, { id: number; force?: boolean }>({
            query: ({ id, force }) => ({
                url: `/projects/${id}${force ? '?force=true' : ''}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useGetProjectsByAssignedUserQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsAPI;