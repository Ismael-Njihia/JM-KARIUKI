import {apiSlice} from "./apiSlice";

export const medicalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        creatreMedical: builder.mutation({
            query: (prescription) => ({
                url: `/api/medical`,
                method: 'POST',
                body: prescription,
            }),
        }),
       fetchMedical: builder.query({
           query: () => `/api/medical`,
           method: 'GET',
           providesTags: ["Medical"],
       }),
    })
})
export const{
    useCreatreMedicalMutation,
    useFetchMedicalQuery,
} = medicalApiSlice;