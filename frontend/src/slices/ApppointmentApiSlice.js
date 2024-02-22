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
            query: ({appointId, apoointmentData}) => ({
              url: `/api/appointments/edit/${appointId}`,
              method: 'PUT',
              body: apoointmentData,
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
        cancelAppointment: builder.mutation({
            query: (id) => ({
                url: `/api/appointments/cancel/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["Appointments"],
        }),
        sendMeetingIdToUser: builder.mutation({
            query: (meetingId, appointId) => ({
                url: `/api/appointments/sendMeetingId`,
                method: 'POST',
                body: meetingId, appointId,
            }),
        }),
    }),
});
export const{
    useFetchAppointmentsQuery,
    useFetchAppointmentsByUserQuery,
    useDeleteAppointmentMutation,
    useEditAppointmentMutation,
    useAddAppointmentMutation,
    useGetAppointmentBYIDQuery,
    useCancelAppointmentMutation,
    useSendMeetingIdToUserMutation,
   
} = AppointmentApiSlice;
