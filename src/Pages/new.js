//import area
import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useState } from 'react';
//import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = require('../config.json')

//rfc
export default function UploadFile() {
    //1.State/Hook variable
    const [file ,setFile] = useState('');
    const [mydata ,setMydata] = useState({
        percent:0,
        loaded:false
    });  
    const [isdisable,setIsDisable] = useState(false); 

    //2.Function
    let logOut = (e)=>{
        console.log('LOGOUT');
        localStorage.removeItem('user_data');
        window.location.reload();
    }

    let hendleData = (e)=>{

        setIsDisable(true);

        console.log('change value',e[0]);
        setFile(e[0]);
        setMydata({
            //get previous value and place here
            ...mydata,
            //set new value
            percent:0,
            loaded:false
        });
    }

    let FileUpload = async (e) =>{
        e.preventDefault();
        //console.log('okokokokokok')


        let data = new FormData();
        data.append('files',file);

        try {
            setMydata({
                //get previous value and place here
                ...mydata,
                //
                percent:0,
                loaded:true
            });
            
            let response = await axios({
                method: 'POST',
                //url:'http://localhost:1337/api/uplload',
                url:`${config.prod_api_url}/api/upload`,
                data,
                onUploadProgress:(progress) =>{
                    //console.log(progress);
                    setMydata({
                        //get previous value and place here
                        ...mydata,
                        //set new value
                        loaded:true,
                        percent:Math.round(progress.loaded/progress.total*100)
                        //percent:Math.ceil(progress.loaded/progress.total*100)
                        //percent:Math.floor(progress.loaded/progress.total*100)
                    })
                }
            })
            if(response.request.status === 200){
                console.log('done');
                //swal("Done!", "File upload Successfully!", "success");
                
                setMydata({
                    //get previous value and place here
                    ...mydata,
                    //set new value
                    readFile :'',
                    loaded:false
                });
                    toast("File upload Successfully!");
            }  
        } 
        catch (error) {
            console.log('error');
            setMydata({
                //get previous value and place here
                ...mydata,
                //set new value
                readFile :'',
                loaded:true
            }) 
          
            
            //swal("Done!", "File upload Successfully!", "success");
            toast("error, No File Selected!"); 
        }
    }

    //3.return statement

    return (
      <div className="row mt-5">
          <div className="col-6 offset-3">
            <form className="mb-5" onSubmit={ (e)=>{ FileUpload(e) } }>
                <h1 className="text-center">File Upload ReactJs with axios</h1>
                <div className="mb-3 mt-5">
                    <label htmlFor="file" className="visually-hidden">Upload File</label>
                    <input type="file" name="file" accept="image/*" className="form-control" id="file" onChange={(e)=>{hendleData(e.target.files)}} />
                </div>
                <div className="col-auto">
                    {
                        !file &&
                        <button type="submit" className="btn btn-primary mb-3">File upload</button>
                    }
                    
                </div>
            </form>
            {
                mydata.loaded && mydata.readFile &&
                <div className="progress">
                    <div className="progress-bar" id="k_progress" role="progressbar" style={{width: mydata.percent+'%'}} aria-valuenow={mydata.percent} aria-valuemin={0} aria-valuemax={100}>{mydata.percent}%</div>
                </div>
            }
            <button className="btn btn-success" onClick={(e)=>{logOut(e)}} disabled={isdisable}>Log Out</button>
            <ToastContainer />
          </div>
      </div>
  );
}
