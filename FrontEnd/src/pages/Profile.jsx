import { useSelector } from "react-redux"
import {useEffect, useRef, useState} from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from "../firebase"


const Profile = () => {
  const  {currentUser} = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
  useEffect(() =>{
if(image){
handleFileUpload(image);
}
  },[image])

const handleFileUpload = async(image) =>{
const  storage = getStorage(app);
const fileName = new Date().getTime() + image.name;
const storageRef = ref(storage,fileName);
const uploadTask = uploadBytesResumable(storageRef, image);
uploadTask.on(
  'state_changed',
  (snapshot) =>{
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    setImagePercent(Math.round(progress))
  },

(error) =>{
setImageError(true)
},

()=>getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
  setFormData({...formData,profilePicture:downloadURL})
}),

  )};

  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7" > Profile</h1>


{/*   Firebase Storage Rules :
      allow read;
      allow write:if request.resource.size < 2 * 1024 *1024 && 
      request.resource.contentType.matches("image/.*") */}


<form className="flex flex-col gap-4">
  <input type="file" ref={fileRef} hidden accept="image/*"  onChange={(e)=> setImage(e.target.files[0])}/>

  <img src= {currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"  onClick={()=>fileRef.current.click()}/>

<p className="text-sm self-center">{imageError ? (  <span className="text-red-700 cursor-pointer ">Error Uploading</span>) : imagePercent > 0 && imagePercent < 100  ? (
    <span className="text-red-700 cursor-pointer ">{`Uploading : ${imagePercent} %`}</span>
) : imagePercent === 100 ? (  <span className="text-green-700 cursor-pointer ">Uploading Successfully</span>) : '' }</p>



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