import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { AppDispatch } from "../store";
import { clearCredentials, setCredentials } from "./authSlice";
import { IUser } from "../definitions";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn("Attempting to refresh access token...");

    // Try to get new access token
    const refreshResult = await baseQuery(
      "/api/users/refresh-token",
      api,
      extraOptions
    );

    const newData = refreshResult.data as {
      success: boolean;
      message: string;
      data: IUser;
    };

    if (newData.success) {
      // Set new credentials
      (api.dispatch as AppDispatch)(setCredentials(newData.data));

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout
      console.warn("Refresh token failed, logging out");
      (api.dispatch as AppDispatch)(clearCredentials());

      // Optionally replace the original error with refresh error
      result = refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  // baseQuery: customBaseQuery,
  baseQuery,
  tagTypes: ["User", "Department", "Organization", "File"],
  endpoints: () => ({}),
});
