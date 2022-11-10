import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Fileupload = (props) => {
    const {data , setData} = props
   const token = localStorage.getItem('token')
    const [post, setPost] = useState({})

    const postData = async (e) => {
        e.preventDefault();
    
        postData.bind(this)
        const fdata = new FormData();
         fdata.append('uploadFile' , post.uploadFile)

        const config= {
            headers: {
                "Content-Type": "multipart/form-data",
                "authorization": token
            }
        }
       await axios.post("http://localhost:8080/api/upload", fdata, config )
       .then((res) => {
       
        const obj={
            file:res.data.name
        }
        setData(obj , ...data)
        alert(res.data.message)
    } );

       document.getElementById('filereader').value=""
       


    }
    return (
        <>
            <div className='form-container'>
                <form className='form-box' onSubmit={postData} method="POST">
                    <div className='post-divs'>
                        <input type="file"
                            onChange={(e) => {
                                setPost({ ...post, uploadFile: e.target.files[0] })
                            }}
                            name='uploadFile'
                            className='uploads' 
                            id='filereader'
                            required />
                    </div>

                    <button id="btn-post" type="submit" className='post_button' >Post</button>

                </form>
            </div>
        </>

    );
}

export default Fileupload