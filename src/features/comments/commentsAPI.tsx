 import { apidomain } from "../../utils/APIdomains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TComment = {
    commentid?: number;
    id?: number;
    commenttext: string;
    username: string;
    bugid: number;
    userid: number;
    createdat: string;
};

export const commentsAPI = createApi({
    reducerPath: "commentsAPI",
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
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        getComments: builder.query<{ comments: TComment[] }, void>({
            query: () => "/comments",
            providesTags: ["Comments"],
        }),
        getCommentById: builder.query<TComment, number>({
            query: (id) => `/comments/${id}`,
            providesTags: ["Comments"],
        }),
        createComment: builder.mutation<TComment, Partial<TComment>>({
            query: (newComment) => ({
                url: "/comments",
                method: "POST",
                body: newComment,
            }),
            invalidatesTags: ["Comments"],
        }),
        updateComment: builder.mutation<TComment, { id: number; data: Partial<TComment> }>({
            query: ({ id, data }) => ({
                url: `/comments/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Comments"],
        }),
        deleteComment: builder.mutation<void, number>({
            query: (id) => ({
                url: `/comments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comments"],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useGetCommentByIdQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentsAPI;