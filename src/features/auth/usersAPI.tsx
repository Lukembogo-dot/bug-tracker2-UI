import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type Tuser = {
    userid: number;
    username: string;
    email: string;
    password: string;
    role: string;
};

export const usersAPI = createApi({
    reducerPath: "usersAPI",
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
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string; user: Tuser }, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials,
            }),
        }),
        createUsers: builder.mutation<Tuser, Partial<Tuser>>({
            query : (newUser) => ({
                url : "/users/register",
                method : "POST",
                body : newUser,
            }),
            invalidatesTags: ["Users"],
        }),
        getUsers: builder.query<{ users: Tuser[] }, void>({
            query: () => "/users",
            providesTags: ["Users"],
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useLoginMutation,
    useCreateUsersMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = usersAPI;
