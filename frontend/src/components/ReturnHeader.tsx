import ReturnIcon from "./ReturnIcon";

type Props = {
  header: string;
};

const ReturnHeader = ({ header }: Props) => {
  return (
    <div className="flex items-start gap-2">
      <ReturnIcon />
      <h1 className=""> {header}.</h1>
    </div>
  );
};

export default ReturnHeader;
