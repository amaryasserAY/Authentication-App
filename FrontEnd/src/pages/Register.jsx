import {Link} from 'react-router-dom'
const Register = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
<h1 className="text-3xl text-center font-semibold my-7" >Register Up</h1>


<form className="flex flex-col gap-4">
<input   type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" />
<input   type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" />
<input   type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" />
<button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Register</button>
</form>

<div className="flex gap-2 mt-5">
  <p>Have an Account?</p>
  <Link className="text-blue-500" to="/login">Sign in</Link>
</div>
    </div>
  )
}

export default Register