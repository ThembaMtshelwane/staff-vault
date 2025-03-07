import { apiSlice } from "./apiSlice";
import { IFile } from "../definitions";
const FILES_URL = "/api/files";

export const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      { success: boolean; message: string; data: IFile },
      FormData
    >({
      query: (formData) => ({
        url: `${FILES_URL}/upload`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["File"],
    }),

    getFile: builder.query<
      { success: boolean; message: string; data: IFile[] },
      { documentType: string }
    >({
      query: ({ documentType }) => ({
        url: `${FILES_URL}/filter/?documentType=${documentType}`,
        method: "GET",
      }),
      providesTags: ["File"],
    }),

    deleteFile: builder.mutation<
      { success: boolean; message: string; data: IFile[] },
      { documentType: string; filename: string }
    >({
      query: ({ filename, documentType }) => ({
        url: `${FILES_URL}/${filename}/${documentType}`,
        method: "DELETE",
      }),
      invalidatesTags: ["File"],
    }),

    downloadFile: builder.mutation<Blob, string>({
      query: (filename) => ({
        url: `/api/files/download/${filename}`,
        method: "GET",
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error("File not found");
          }
          return response.blob();
        },
      }),
      extraOptions: {
        // Prevent Redux from trying to serialize Blob
        serializeQueryArgs: false,
      },
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFileQuery,
  useDeleteFileMutation,
  useDownloadFileMutation,
} = fileApiSlice;
