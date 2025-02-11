import { apiSlice } from "./apiSlice";

const DEPARTMENTS_URL = "/api/departments";

export const departmentApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDepartments: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    createDepartment: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENTS_URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    getDepartments: builder.query({
      query: () => ({
        url: `${DEPARTMENTS_URL}`,
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    getDepartment: builder.query({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: ({ data, id }) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});
