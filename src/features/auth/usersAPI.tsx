import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export type Tuser = {
    userid: number;
    username: string;
    email: string;
    password: string;
    role: string;
};

export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({ baseUrl: apidomain }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        createUsers: builder.mutation<Tuser, Partial<Tuser>>({
            query : (newUser) => ({
                url : "/users",
                method : "POST",
                body : newUser,
            }), 
            invalidatesTags: ["Users"],
        }),
        getUsers: builder.query<Tuser[], void>({
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
    useCreateUsersMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = usersAPI;
