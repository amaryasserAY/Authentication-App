import { useSelector } from "react-redux"
import {useEffect, useRef, useState} from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import { updateUserSuccess,updateUserStart,updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from "../redux/user/userSlice"


const Profile = () => {

  const fileRef = useRef(null)
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
const dispatch = useDispatch();
const [updateSuccess , setUpdateSuccess ] = useState(false) ;
const  {currentUser,loading,error} = useSelector(state => state.user);
  useEffect(() =>{
if(image){
handleFileUpload(image);
}
  }, [image])

const handleFileUpload = async(image) =>{
const  storage = getStorage(app);
const fileName = new Date().getTime() + image.name;
const storageRef = ref(storage,fileName);
const uploadTask = uploadBytesResumable(storageRef, image);
uploadTask.on(
  'state_changed',
  (snapshot) =>{
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    setImagePercent(Math.round(progress));
  },

(error) =>{
setImageError(true)
console.log(error)
},

()=>{  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
  setFormData({...formData,profilePicture:downloadURL}));
}
  )};


const handleChange = (e)=>{
setFormData({...formData,[ e.target.id]:e.target.value});
}

const handleSubmit =async (e)=>{
e.preventDefault();

try{
dispatch(updateUserStart());
const res  = await fetch(`/api/user/update/${currentUser._id}`,{
  method: 'POST',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)

});

const data = await res.json();

if (data.success ===false){
dispatch(updateUserFailure(data));
return;
}

dispatch(updateUserSuccess(data));
setUpdateSuccess(true);

}catch(error) {
  dispatch(updateUserFailure(error));
}

} 

const handleDelete =async () =>{


try{



  const res  = await fetch(`/api/user/delete/${currentUser._id}`,{
    method: 'DELETE',
    });
dispatch(deleteUserStart())
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data));
      return;
    }

dispatch(deleteUserSuccess(data))

}catch(error) {
  dispatch(deleteUserFailure(error))
}

}





const handleSignOut = async () =>{


try{

await fetch(`/api/auth/signout`);

dispatch(signOut());
}catch(error) {
console.log(error);
}





}








  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7" > Profile</h1>


{/*   Firebase Storage Rules :
      allow read;
      allow write:if request.resource.size < 2 * 1024 *1024 && 
      request.resource.contentType.matches("image/.*") */}


<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
  <input type="file" ref={fileRef} hidden accept="image/*"  onChange={(e)=> setImage(e.target.files[0])}/>

  <img src= {formData.profilePicture || currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"  onClick={()=>fileRef.current.click()}/>

<p className="text-sm self-center">{imageError ? (  <span className="text-red-700 cursor-pointer ">Error Uploading</span>) : imagePercent > 0 && imagePercent < 100  ? (
    <span className="text-red-700 cursor-pointer ">{`Uploading : ${imagePercent} %`}</span>
) : imagePercent === 100 ? (  <span className="text-green-700 cursor-pointer ">Uploading Successfully</span>) : (" ")}</p>



<input defaultValue={currentUser.username} type="text" id="username" placeholder="UserName" className="bg-slate-100 rounded-lg p-3 "  onChange={handleChange}/>

<input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3 " onChange={handleChange} />

<input  type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3 "  onChange={handleChange}/>

<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'loading...' : 'update'}</button>

</form>

<div className="flex justify-between mt-5 items-center">

  <span className="text-red-700 cursor-pointer " onClick={handleDelete}>Delete Account</span>
  <span className="text-red-700 cursor-pointer " onClick={handleSignOut}>Sign Out</span>
</div>


<p className="text-red-700 mt-5">{error && 'Something is wrong!'}</p>
<p className="text-green-600 mt-5">{updateSuccess && 'User is Updated Success!'}</p>
    </div>

  )

}
export default Profile