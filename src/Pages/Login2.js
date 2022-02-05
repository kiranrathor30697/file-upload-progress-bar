import axios from 'axios';
import React, { useEffect, useState } from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Uploadfile from './Uploadfile';


const config = require('../config.json')
//RFC React Functional Components
export default function Login() {
  //1. State/Hoook Variable
  const [creds,setCreds] = useState({
    identifier: 'kiran@gmail.com',
    password: 'kiran@123',
    is_sending:''
  });
  const [user,setUser] = useState({});
  const [loggedIn,setLoggedIn] = useState(false);

  //2. Functions

  useEffect(()=>{
    console.log('Page Loaded Successfully');
    try {
      const user = JSON.parse(localStorage.getItem('userinfo'));
      if(user){
        setUser({
          user
        });
        console.log(user);
        setLoggedIn(true);
      }
      
      
    } catch (error) {
      setLoggedIn(false);
    }
    
  },[])//

  let handleChange = (e)=>{
    //console.log(e.target.classList.contains('identifier')); 
    if(e.target.classList.contains('identifier')){
      //username
      setCreds({
        ...creds,
        identifier: e.target.value
      })
      console.log('Username block')
    }
    if(e.target.classList.contains('password')){
      //username
      setCreds({
        ...creds,
        password: e.target.value
      })
      console.log('password block')
    }
    

  }
  let login = async (e)=>{
    e.preventDefault();
    setCreds({
      ...creds,
      is_sending:'disabled'
    })
    console.log('Login')
    console.log(creds);
    try {
      let data = await axios.post(`${config.dev_api_url}/api/auth/local`,{
        identifier: creds.identifier,
        password: creds.password,
      });
      console.log(data)
      localStorage.setItem('userinfo',JSON.stringify(data.data));
      toast("Login Success");
      setLoggedIn(true);
      
    } catch (error) {
      console.log(error)
    }
   
  }
  //3. return statement
  return (
    <>
    <div className="row">
      <div className="col-6 offset-3 pt-5">
        <h1 className="text-center">Login</h1>
        <form onSubmit={(e)=>{ login(e) }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name="identifier" value={ creds.identifier } onChange={(e)=>{ handleChange(e) }} className="form-control identifier" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" value={ creds.password } onChange={(e)=>{handleChange(e)}} className="form-control password" id="exampleInputPassword1" />
          </div>

          <button type="submit" className={`btn btn-primary ${creds.is_sending}`}>Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
    { 
      loggedIn &&
      <Uploadfile />
    }
    </>
  );
}