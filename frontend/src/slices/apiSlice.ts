import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import {AppDispatch } from '../store'
import { AppDispatch } from "../store";
import { clearCredentials, setCredentials } from "./authSlice";
import { IUser } from "../definitions";

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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // console.warn("Unauthorized: Logging out and redirecting...");

    // (api.dispatch as AppDispatch)(clearCredentials());

    // window.location.href = "/login";

    // console.log("Attemp tot refresh access token");

    const refreshResult = await baseQuery(
      "/api/users/refresh-token",
      api,
      extraOptions
    );

    // console.log("refreshResult  ", refreshResult);

    if (refreshResult.data) {
      // Store new token
      (api.dispatch as AppDispatch)(
        setCredentials({
          ...(refreshResult.data.data as IUser),
        })
      );

      // Retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logout or show login again
      (api.dispatch as AppDispatch)(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  // baseQuery,
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Department", "Organization", "File"],
  endpoints: () => ({}),
});
