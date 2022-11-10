import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FileDownloader from './download'
import Header from './header'
import Fileupload from './upload'

import ("../styles/home.css")
const Home=()=> {
    const token = localStorage.getItem("token")
    const [data ,setData]=useState([]);

    useEffect(()=>{

        const config= {
            headers: {
                "authorization": token
            }
        }
        const data = axios.get("http://localhost:8080/api/home", config)
        .then((res) =>{
            setData(res.data.data)
        });
    },[])

  return (
    <>{
        (token)?
        <div className='main_container_home'>
        <div className='header_holder_home'>
            <Header></Header>
        </div>
        <div className='upload_download_holder'>
        <div className='downloadholder'>
            <div className='component_holder downloadtable'>
            <FileDownloader data={data}/>
            </div>
        </div>
        <div className='uploadholder'>
           <div className='component_holder'>
           <Fileupload ></Fileupload>

           </div>
        </div>
        </div>

    </div>
    :
     <div>
        <p> log in first !!!!!</p>
    </div>
    }
    </>
  )
}

export default Home