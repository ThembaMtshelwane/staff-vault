import { useState } from "react";
import ReturnHeader from "./ReturnHeader";
import { TbCloudUpload } from "react-icons/tb";

type Props = {
  type: string;
};

const UpdateFile = ({ type }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
    console.log("Uploading file:", file);
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

      <ul className="rounded-lg max-w-[850px] mx-auto">
        <li className="flex justify-between items-center py-2 px-4  sm:p-4 rounded-lg shadow-lg hover:scale-[1.01] bg-white">
          <div className="flex flex-wrap gap-2 w-[80%] sm:w-[60%] justify-between">
            <p>ThembaMtshelwane.pdf</p>
            <p>3 months ago</p>
          </div>

          <button className="button">X</button>
        </li>
      </ul>
    </div>
  );
};

export default UpdateFile;
