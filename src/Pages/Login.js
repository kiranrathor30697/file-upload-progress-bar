//import area
import React, { useState } from 'react';

//rfc
export default function Login() {
    //1.state /Hook variables
    const [mydata, setMydata] = useState({
        'identifier':"",
        "password":""
    });

    //2.functions
    let hendleMyData = (e)=>{
        //console.log('change');
        
        console.log(e.target.classList.contains('k_email'));

        if(e.target.classList.contains('k_email')){
            console.log(e.target.value);

            setMydata({
                ...mydata,
                'identifier': e.target.value
            });
            //console.log('true');
            console.log('this is user block');
        }
        if(e.target.classList.contains('k_password')){
            console.log(e.target.value);

            setMydata({
                ...mydata,
                'password':e.target.value
            });
            //console.log('false');
            console.log('this is password block');
        }
        
    }
    let myLoinForm = (e)=>{
        e.preventDefault();
        console.log(e);
        console.log(mydata);
    }

    //3.return statement
        return (
            <div className="row">
                    <div className="col-6 offset-3">
                        <form className="pt-5" onSubmit={(e)=>{myLoinForm(e)}}>
                            <h1 className="text-center">Login Form</h1>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" name="identifier" onChange={(e)=>{hendleMyData(e)}} autoFocus className="form-control k_email" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" onChange={(e)=>{hendleMyData(e)}} className="form-control k_password" id="password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
            </div>
        );
        }
