import { useState } from "react";
import ReturnHeader from "../../../components/ReturnHeader";
import { TbCloudUpload } from "react-icons/tb";
import {
  useGetFileQuery,
  useUploadFileMutation,
} from "../../../slices/fileApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type Props = {
  type: string;
};

const UpdateFile = ({ type }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile] = useUploadFileMutation();
  const { data: docs } = useGetFileQuery({ documentType: type });
  const { userInfo } = useSelector((state: RootState) => state.auth);

  console.log("docs  ", docs);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    console.log("userInfo ", userInfo?._id);

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

      console.log("File uploaded successfully:", res.data);
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
          <p className="text-gray-600">Or drag and drop it here</p>
        </label>
        {file && (
          <button type="submit" className="button w-[150px] mx-auto">
            Upload File
          </button>
        )}
      </form>

      <ul className="rounded-lg max-w-[850px] mx-auto flex flex-col gap-4">
        {docs?.data.map((doc) => (
          <li className="flex justify-between items-center py-2 px-4  sm:p-4 rounded-lg shadow-lg hover:scale-[1.01] bg-white">
            <div className="flex flex-wrap gap-2 w-[80%] sm:w-[70%] justify-between border max-w-[450px]">
              <p>{doc.name}</p>
              <p>{new Date(doc.updatedAt).toDateString()}</p>
            </div>

            <button className="button">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateFile;
