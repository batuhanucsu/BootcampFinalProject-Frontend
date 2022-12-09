import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom"


function Register() {

const [firstName,setFirstName]= useState('');
const [lastName,setLastName]= useState('');
const [email,setEmail]= useState('');
const [password,setPassword]= useState('');
const [redirect,setRedirect]= useState(false);
const navigate = useNavigate();

const submit = async (e) => {

  e.preventDefault();
  await fetch("https://localhost:5001/api/auth/register",{
    method : 'POST',
    headers : {'Content-Type':'application/json'},
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  }).then(data => data.json())
  setRedirect(true);
}

useEffect(() => {
  if (redirect) {
    navigate('/login');
  }
},[redirect,navigate])
  return (
    <div >
    <main className="form-signin w-100 m-auto">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
    <div className="form-floating">
      <input type="name" className="form-control" placeholder="FirstName" onChange={e => setFirstName(e.target.value)} required/>
      <label htmlFor="floatingPassword">Name</label>
    </div>
     <div className="form-floating">
      <input type="surname" className="form-control" placeholder="LastName" onChange={e => setLastName(e.target.value)} required/>
      <label htmlFor="floatingPassword">Surname</label>
    </div>
    <div className="form-floating">
      <input type="email" className="form-control" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} required/>
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
      <label htmlFor="floatingPassword">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</main>

    </div>

  );
}

export default Register;