import { useSelector } from "react-redux"


const Profile = () => {
  const  {currentUser} = useSelector(state => state.user)

  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7" > Profile</h1>


<form className="flex flex-col gap-4">
  <img src= {currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" />


<input defaultValue={currentUser.username} type="text" id="username" placeholder="UserName" className="bg-slate-100 rounded-lg p-3 " />

<input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3 " />

<input  type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3 " />

<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">update</button>

</form>

<div className="flex justify-between mt-5 items-center">

  <span className="text-red-700 cursor-pointer ">Delete Account</span>
  <span className="text-red-700 cursor-pointer ">Sign Out</span>
</div>


    </div>
  )
}

export default Profile