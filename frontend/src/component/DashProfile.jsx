import { useSelector } from "react-redux";
import {TextInput,Button} from "flowbite-react"

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>

      <form action="" className="flex flex-col gap-4 ">
        <div className="self-center cursor-pointer shadow-md overflow-hidden w-32 h-32 rounded-full">
          <img
            src={currentUser.profilepicture}
            alt="user"
            className="w-32 h-32 rounded-full w-full h-full object-cover border-8 shadow-md border-[lightgray]"
          />
        </div>
        <TextInput type='text' id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput type='email' id="email" placeholder="email" defaultValue={currentUser.email} />
        <TextInput type='password' id="password" placeholder="password"  />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline >Update</Button>
      </form>
      <div className=" text-red-600 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out </span>
      </div>
    </div>
  );
};

export default DashProfile;
