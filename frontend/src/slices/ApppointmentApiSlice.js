import { apiSlice } from "./apiSlice";

export const AppointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAppointments: builder.query({
            query: () => `/api/appointments`,
            providesTags: ["Appointments"],
        }),
        fetchAppointmentsByUser: builder.query({
            query: (userId) => `/api/appointments/${userId}`,
            providesTags: ["Appointments"],
        }),
        deleteAppointment: builder.mutation({
            query: (appointId) => ({
                url: `/api/appointments/${appointId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Appointments"],
        }),
        editAppointment: builder.mutation({
            query: (appointment) => ({
                url: `/api/appointments/${appointment.appointId}`,
                method: 'PUT',
                body: appointment,
            }),
            invalidatesTags: ["Appointments"],
        }),
        addAppointment: builder.mutation({
            query: (appointment) => ({
                url: `/api/appointments/create`,
                method: 'POST',
                body: appointment,
            }),
            invalidatesTags: ["Appointments"],
        }),
        getAppointmentBYID: builder.query({
            query: (appointId) => `/api/appointments/${appointId}`,
            providesTags: ["Appointments"],
        
        }),
    }),
});
export const{
    useFetchAppointmentsQuery,
    useFetchAppointmentsByUserQuery,
    useDeleteAppointmentMutation,
    useEditAppointmentMutation,
    useAddAppointmentMutation,
    useGetAppointmentBYIDQuery
} = AppointmentApiSlice;
