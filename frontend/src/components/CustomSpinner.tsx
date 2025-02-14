import ClipLoader from "react-spinners/ClipLoader";

export const CustomSpinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <ClipLoader
      color="text-secondary"
      loading={isLoading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
