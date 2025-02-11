import { apiSlice } from "./apiSlice";
import { IUser } from "../definitions";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { success: boolean; message: string; data: IUser },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation<
      { success: boolean; message: string; data: IUser },
      Partial<IUser>
    >({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    multiRegister: builder.mutation<
      { success: boolean; message: string; data: IUser[] },
      { emails: string[] }
    >({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    registerAdmin: builder.mutation<
      { success: boolean; message: string; data: IUser[] },
      Partial<IUser>
    >({
      query: (data) => ({
        url: `${USERS_URL}/admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    update: builder.mutation<
      {
        success: boolean;
        message: string;
        data: IUser;
      },
      { id: string; data: Partial<IUser> }
    >({
      query: ({ data, id }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    delete: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      void
    >({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query<
      { success: boolean; message: string; data: IUser[] },
      void
    >({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query<
      { success: boolean; message: string; data: IUser },
      { id: string }
    >({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useMultiRegisterMutation,
  useRegisterAdminMutation,
  useUpdateMutation,
  useDeleteMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = userApiSlice;
