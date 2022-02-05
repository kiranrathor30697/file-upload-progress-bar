//import area
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Uploadfile from './Uploadfile';

const config = require('../config.json');

//rfc
export default function Login() {

    //1.state /Hook variables
        const [mydata, setMydata] = useState({
            identifier:"",
            password:""
        });
        const [user,setUser] = useState({
            user:null,
            is_loggedin:true
        });

    //2.functions
        useEffect(()=>{
            console.log("Page loaded successfully");
            try {
               let localdata = JSON.parse(localStorage.getItem("form_login"));
                    //console.log(localdata);

               if (localdata) {
                setUser({
                       //get the previous and place here
                       ...user,
                       //new value place here
                        is_loggedin:true
                   })  
               }else{
                setUser({
                    //get the previous and place here
                    ...user,
                    //new value place here
                     is_loggedin:false
                })
               }
            }    
            catch (error) {
                
            }
        },[])
        let hendleMyData = (e)=>{
            //console.log('change');
            
            console.log(e.target.classList.contains('k_email'));
            //conditional rendring 
            if(e.target.classList.contains('k_email')){
                //console.log(e.target.value);

                setMydata({
                    //get previous value and place here
                    ...mydata,
                    //set new item
                    'identifier': e.target.value
                });
                //console.log('true');
                console.log('this is user block');
            }
            if(e.target.classList.contains('k_password')){
                //console.log(e.target.value);

                setMydata({
                    //get previous value and place here
                    ...mydata,
                    //set new item
                    'password':e.target.value
                });
                //console.log('false');
                //console.log('this is password block');
            }
            
        }
        let myLoinForm = async (e)=>{
            e.preventDefault();
            //console.log(e);
            //console.log(mydata);

            try {
                let { data } = await axios.post(`${config.dev_api_url}/api/auth/local`,{
                    identifier:mydata.identifier,
                    password:mydata.password
                })
                console.log(data);
                setUser({
                    //get previous value and place here
                    ...user,
                    //set new value 
                    is_loggedin : true
                })

            //set data local storage
            localStorage.setItem('user_data',JSON.stringify(data));
                
            } catch (error) {
                console.log('error')
            }
            
        }

    //3.return statement
        return (
            <>
                {
                    user.is_loggedin ||
                    <>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <form className="pt-5" onSubmit={(e)=>{myLoinForm(e)}}>
                                    <h1 className="text-center">Login Form</h1>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" name="identifier" onChange={(e)=>{hendleMyData(e)}} className="form-control k_email" id="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name="password" onChange={(e)=>{hendleMyData(e)}} className="form-control k_password" id="password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </>
                } 
                
                {
                    user.is_loggedin &&
                    <Uploadfile />
                } 
            </>     
        );
    }
