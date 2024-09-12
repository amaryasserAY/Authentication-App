import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

const OAuth = () => {

const dispatch = useDispatch();
const handelGoogleClick = async ()=>{
try{

const provider = new GoogleAuthProvider() ;
const auth = getAuth(app) ;
const result = await signInWithPopup(auth,provider)

const res =await fetch("/api/auth/google",{
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name:result.user.displayName,
        email : result.user.email,
        photo : result.user.photoURL
    }),
});

console.log(res)
console.log(result)

const data = await res.json()
console.log(data)
dispatch(signInSuccess(data))

}catch(error){
    console.log("Error getting google" ,error)
}
}



  return (
    <button type="button" onClick={handelGoogleClick} className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95">Continue With Google</button>
  )
}

export default OAuth