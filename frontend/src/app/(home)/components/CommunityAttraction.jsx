import { FcBookmark } from "react-icons/fc";

function CommunityAttraction() {
  return (
    <div className='bg-white rounded-xl flex items-center justify-center gap-5 h-28 p-5 drop-shadow-md cursor-pointer'>
        <FcBookmark className="text-6xl" />
        <span>
            <h2 className="text-lg font-bold">Dubai Marina</h2>
            <p className="text-sm">See the community attractions and lifestyle</p>
        </span>
    </div>
  )
}

export default CommunityAttraction