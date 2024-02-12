import {apiSlice} from "./apiSlice";
export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchMessages: builder.query({
            query: () => `/api/messages`,
            providesTags: ["Messages"],
        }),
        fetchMessagesByUser: builder.mutation({
            query: (userId) => ({
                url: `/api/messages/${userId}`,
                method: 'GET',
            }),
            invalidatesTags: ["Messages"],
        }),
        deleteMessage: builder.mutation({
            query: (messageId) => ({
                url: `/api/messages/${messageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Messages"],
        }),
        editMessage: builder.mutation({
            query: (message) => ({
                url: `/api/messages/${message.messageId}`,
                method: 'PUT',
                body: message,
            }),
            invalidatesTags: ["Messages"],
        }),
        sendMessage: builder.mutation({
            query: (message) => ({
                url: `/api/messages/create`,
                method: 'POST',
                body: message,
            }),
            invalidatesTags: ["Messages"],
        }),
    }),

});
export const{
    useSendMessageMutation,
    useEditMessageMutation,
    useDeleteMessageMutation,
    useFetchMessagesByUserMutation,
    useFetchMessagesQuery

} = messageApiSlice;