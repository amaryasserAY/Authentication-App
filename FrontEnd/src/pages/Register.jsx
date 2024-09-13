import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

const Register = () => {


  const {loading,error} = useSelector((state)=>state.user)
  const [formData, setFormData] = useState({})
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();



const handelChange = (e)=>{
setFormData({...formData , [e.target.id] : e.target.value});
}


const handelSubmit = async (e)=>{
  e.preventDefault() ;
try{

dispatch(signInStart());

  const res = await fetch('/api/auth/signup',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
  const data = await res.json()


  if (data.success === false) {
  dispatch(signInFailure(data));
  } 
 

dispatch(signInSuccess(data));
  navigate("/profile")
}catch(error){


dispatch(signInFailure(error));
}

 


}

  return (
    <div className="p-3 max-w-lg mx-auto">
<h1 className="text-3xl text-center font-semibold my-7" >Register Up</h1>


<form className="flex flex-col gap-4" onSubmit = {handelSubmit}>
<input   type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg "  onChange={handelChange}/>
<input   type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg "  onChange={handelChange}/>
<input   type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg " onChange={handelChange} />
<button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
  {loading ? 'Loading...' : 'Register'}
</button>
<OAuth />
</form>

<div className="flex gap-2 mt-5">
  <p>Have an Account?</p>
  <Link className="text-blue-500" to="/login">Sign in</Link>
</div>
<p className='text-red-700 mt-5'>{error && 'something is wrong' }</p>
    </div>
  )
}

export default Register