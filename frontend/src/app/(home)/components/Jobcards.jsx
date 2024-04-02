import { FaLocationDot } from "react-icons/fa6";

function Jobcards(props) {
  return (
    <div className="bg-white p-10 drop-shadow-lg rounded-lg flex flex-col gap-2 md:w-80">
        <h3 className="text-xl font-bold">{props.title}</h3>
        <p className="flex gap-2 items-center text-gray-500"><FaLocationDot /> {props.location}</p>
    </div>
  )
}

export default Jobcards