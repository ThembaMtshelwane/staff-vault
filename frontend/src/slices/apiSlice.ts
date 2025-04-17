import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import {AppDispatch } from '../store'
import { AppDispatch } from "../store";
import { clearCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  // baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Catch 401 errors
  if (result.error && result.error.status === 401) {
    console.warn("Unauthorized: Logging out and redirecting...");

    // Dispatch logout action
    (api.dispatch as AppDispatch)(clearCredentials());

    // Optional: redirect using window.location or a custom function
    window.location.href = "/login"; // or "/"
  }

  return result;
};

export const apiSlice = createApi({
  // baseQuery,
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Department", "Organization", "File"],
  endpoints: () => ({}),
});
