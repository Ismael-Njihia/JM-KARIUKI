import {apiSlice} from "./apiSlice";

export const healthDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchHealthData: builder.query({
            query: () => `/api/healthdata`,
            providesTags: ["HealthData"],
        }),
        fetchHealthDataByUser: builder.query({
            query: (userId) => `/api/healthdata/${userId}`,
            providesTags: ["HealthData"],
        }),
        deleteHealthData: builder.mutation({
            query: (healthDataId) => ({
                url: `/api/healthdata/${healthDataId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["HealthData"],
        }),
        editHealthData: builder.mutation({
            query: (healthData) => ({
                url: `/api/healthdata/${healthData.healthDataId}`,
                method: 'PUT',
                body: healthData,
            }),
            invalidatesTags: ["HealthData"],
        }),
        //add health data
        addHealthData: builder.mutation({
            query: (healthData) => ({
                url: `api/health/create`,
                method: 'POST',
                body: healthData,
            }),
            invalidatesTags: ["HealthData"],
        }),
    }),
});
export const{
    useFetchHealthDataQuery,
    useFetchHealthDataByUserQuery,
    useDeleteHealthDataMutation,
    useEditHealthDataMutation,
    useAddHealthDataMutation,
} = healthDataApiSlice;