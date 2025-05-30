import { IOrganization } from "../definitions";
import { apiSlice } from "./apiSlice";

const ORGANIZATION_URL = "/api/organizations";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateOrganization: builder.mutation<
      {
        success: boolean;
        message: string;
        data: IOrganization;
      },
      { id: string; data: Partial<IOrganization> }
    >({
      query: ({ id, data }) => ({
        url: `${ORGANIZATION_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Organization"],
    }),
    getOrganizationByAdmin: builder.query<
      { success: boolean; message: string; data: IOrganization },
      string
    >({
      query: (admin) => ({
        url: `${ORGANIZATION_URL}/admin/${admin}`,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
  }),
});

export const { useGetOrganizationByAdminQuery, useUpdateOrganizationMutation } =
  organizationApiSlice;
