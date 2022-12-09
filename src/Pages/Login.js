import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import PropTypes from 'prop-types'



async function loginUser(credentials) {
  return fetch('https://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

 export default function Login({setToken}) {

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [redirect,setRedirect]= useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // const response = await fetch("https://localhost:5001/api/auth/login",{
    //   method : 'POST',
    //   headers : {'Content-Type':'application/json'},
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     email,
    //     password
    //   })
    // })

    // const content = await response.json(); 
    // console.log("content",content.data.token)
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    setRedirect(true);

  }

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect,navigate]);

  return (
    <div >
    <main className="form-signin w-100 m-auto">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

