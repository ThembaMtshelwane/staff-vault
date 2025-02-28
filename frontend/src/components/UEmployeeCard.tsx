type Props = {
  firstName: string;
  lastName: string;
  position: string;
  image?: string;
  department?: string;
  id: string;
};

const UEmployeeCard = ({ firstName, lastName, position, id }: Props) => {
  return (
    <div
      key={id}
      className="h-[360px] max-w-[340px] w-full  rounded-lg bg-white justify-self-center hover:scale-[1.01]"
    >
      <img
        className="h-[60%] object-center object-cover w-full rounded-tl-lg rounded-tr-lg"
        src={
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt=""
      />
      <div className="px-4 py-4">
        <h3 className="font-bold">
          {firstName && lastName
            ? `${firstName} ${lastName}`
            : "Name is missing"}
          .
        </h3>
        <p>{position ? position : "No positon provided"}</p>
        <p>Software Development Academy.</p>
      </div>
    </div>
  );
};

export default UEmployeeCard;
