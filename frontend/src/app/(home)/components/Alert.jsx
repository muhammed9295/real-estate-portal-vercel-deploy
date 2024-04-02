import { FaBell } from "react-icons/fa6";

function Alert() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] font-semibold text-center">Be the first to hear about new properties</p>
      <button className="bg-transparent border-2 border-secondary rounded-lg flex gap-2 py-3 px-4 w-full justify-center items-center text-secondary">
        <FaBell /> <p className="text-sm font-bold">ALERT ME OF NEW PROPERTIES</p>
      </button>
    </div>
  );
}

export default Alert;
