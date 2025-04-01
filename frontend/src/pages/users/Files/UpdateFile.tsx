import { useState } from "react";
import ReturnHeader from "../../../components/ReturnHeader";
import { TbCloudUpload } from "react-icons/tb";
import {
  useDeleteFileMutation,
  // useDownloadFileMutation,
  useGetFileQuery,
  useUploadFileMutation,
} from "../../../slices/fileApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaArrowDown } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

type Props = {
  type: string;
};

const UpdateFile = ({ type }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile] = useUploadFileMutation();
  const { data: docs } = useGetFileQuery({ documentType: type });
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [deleteFile] = useDeleteFileMutation();
  // const [downloadFile] = useDownloadFileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("pick file");

    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // const handleDownload = async (filename: string) => {
  //   try {
  //     const response = await downloadFile(filename).unwrap();
  //     if (response) {
  //       const blob = new Blob([response], { type: response.type });
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", filename);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     alert("File not found or could not be downloaded.");
  //   }
  // };

  const handleDownload = async (filename: string) => {
    try {
      const response = await fetch(`/api/files/download/${filename}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("File not found");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("File not found or could not be downloaded.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("employee", userInfo?._id || "");
    formData.append("documentType", type);

    try {
      const res = await uploadFile(formData).unwrap();

      if (!res.success) {
        console.error("Error uploading file:", res.message);
        return;
      }
      setFile(null);
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="w-full">
      <ReturnHeader header={`Update Files: ${type}`} />
      <form
        onSubmit={handleUpload}
        className="my-5 flex flex-col gap-4 max-w-[850px] mx-auto"
      >
        <label
          htmlFor="file-upload"
          className="h-[50vh] w-full flex flex-col  items-center justify-center rounded-lg border-dashed border-2 border-secondary cursor-pointer hover:scale-[1.02] hover:bg-gray-200 transition-transform duration-200 ease-in-out"
          tabIndex={0}
          aria-label="Upload a PDF file by clicking or dragging it here"
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <TbCloudUpload className="text-secondary text-[150px]" />
          <p className="mt-2 text-lg font-medium">
            {file ? `Selected: ${file.name}` : "Select a PDF file"}
          </p>
          {/* <p className="text-gray-600">Or drag and drop it here</p> */}
        </label>
        {file && (
          <button type="submit" className="button w-[150px] mx-auto">
            Upload File
          </button>
        )}
      </form>

      <ul className="rounded-lg max-w-[850px] mx-auto flex flex-col gap-4">
        {docs?.data.map((doc, index) => (
          <li
            className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-2 px-4  sm:p-4 rounded-lg shadow-lg hover:scale-[1.01] bg-white"
            key={doc.filename + index}
          >
            <div className="flex flex-wrap gap-2 w-full sm:w-[70%] justify-between max-w-[550px] ">
              <p className="w-[250px]">{doc.filename}</p>
              <p>{new Date(doc.uploadedAt).toDateString()}</p>
            </div>

            <div className="flex gap-4">
              <button
                className="button"
                onClick={() => handleDownload(doc.filename)}
              >
                <FaArrowDown />
              </button>
              <button
                className="button"
                onClick={async () => {
                  console.log("delete file");

                  await deleteFile({
                    documentType: doc.documentType,
                    filename: doc.filename,
                  });
                }}
              >
                <GrClose className="text-xl" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateFile;
