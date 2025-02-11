import { IDepartment, IDepartmentInput } from "../definitions";
import { apiSlice } from "./apiSlice";

const DEPARTMENTS_URL = "/api/departments";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDepartments: builder.mutation<
      { success: boolean; message: string; data: IDepartment[] },
      IDepartmentInput[]
    >({
      query: (data) => ({
        url: `${DEPARTMENTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    createDepartment: builder.mutation<
      { success: boolean; message: string; data: IDepartment },
      Partial<IDepartment>
    >({
      query: (data) => ({
        url: `${DEPARTMENTS_URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    getDepartments: builder.query<
      { success: boolean; message: string; data: IDepartment[] },
      void
    >({
      query: () => ({
        url: `${DEPARTMENTS_URL}`,
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    getDepartment: builder.query<
      { success: boolean; message: string; data: IDepartment },
      string
    >({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<
      { success: boolean; message: string; data: IDepartment },
      { id: string; data: Partial<IDepartment> }
    >({
      query: ({ data, id }) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useCreateDepartmentsMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentQuery,
  useGetDepartmentsQuery,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
