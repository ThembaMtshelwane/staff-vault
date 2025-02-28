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
        src={"default-user.jpg"}
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
