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
      { success: boolean; message: string },
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
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
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
    deleteUser: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query<
      {
        success: boolean;
        message: string;
        data: IUser[];
        pagination: {
          totalUsers: number;
          currentPage: number;
          totalPages: number;
          pageSize: number;
        };
      },
      { page: number; search: string }
    >({
      query: ({ page, search }) => ({
        url: `${USERS_URL}?page=${page}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUser: builder.query<
      { success: boolean; message: string; data: IUser },
      string
    >({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserProfile: builder.query<IUser, void>({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    addUser: builder.mutation<
      { success: boolean; message: string },
      { data: Partial<IUser> }
    >({
      query: (data) => ({
        url: `${USERS_URL}/add-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useMultiRegisterMutation,
  useRegisterAdminMutation,
  useUpdateMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserProfileQuery,
  useLogoutMutation,
  useAddUserMutation,
} = userApiSlice;
