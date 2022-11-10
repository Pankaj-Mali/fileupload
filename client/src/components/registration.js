import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"


import("../styles/register.css")
function Register() {

    let nav = useNavigate()
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = (e) => {
        e.preventDefault();
        if (info.email === "") {
            alert("provide email")
            return
        } else if (info.password === "") {
            alert("provide password")
            return
        } else if (info.password !== password) {
            alert("password dont match")
            return
        } else {

            const config = { headers: { "Content-Type": "application/json" } }
            axios.post("http://localhost:8080/api/register", info, config)
                .then((res) => {
                    alert("registration complited")
                    nav("/")
                })
                .catch((e) => {
                    console.log(e)
                    alert(e.response.data.res)
                });
        }
    }


    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: "554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com" })
        })
    }, [])

    const responseSuccessGoogle = (response) => {

        axios({
            method: "POST",
            url: "http://localhost:8080/google/register",
            data: { tokenId: response.tokenId }
        }).then((res) => {
           const tokrn = res.data.token
           const userName = res.data.userName
           localStorage.setItem("token" , tokrn)
           localStorage.setItem("google" , true)
           localStorage.setItem("user" , userName)
           nav("/home")
        }).catch((e)=>{
            alert(e.response.data.res)
            nav("/")
        })

    }

    const responseFailuareGoogle = (response) => {
        console.log(response);
        alert("REGISTRATION FAILED")

    }

    return (
        <div className='mainholder_registrationpage'>
            <div className='formholder_register'>
                <h1>NEW USER</h1>
                <form className='form'>
                    <div>
                        <input type="email"
                            placeholder="email"
                            name="email"
                            className='input'
                            value={email}
                            onChange={(e) => {
                                let input = e.target.value
                                setEmail(input)
                            }}
                        ></input>
                    </div>
                    <div>
                        <input type="text"
                            placeholder="password"
                            name="password"
                            value={info.password}
                            className='input'
                            onChange={(e) => {
                                let input = e.target.value
                                setInfo({
                                    email: email,
                                    password: input
                                })
                            }}
                        ></input>
                    </div>
                    <div>
                        <input type="text"
                            placeholder="Conform password"
                            name="password"
                            value={password}
                            className='input'
                            onChange={(e) => {
                                let input = e.target.value
                                setPassword(input)
                            }}
                        ></input>
                    </div>
                    <div>
                        <button className='loginB' onClick={userLogin} > REGISTOR </button>
                    </div>
                </form>

                <GoogleLogin

                    clientId="554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com"
                    buttonText='Join With Google'
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailuareGoogle}

                    className="loging"
                />

                <Link to="/">
                    <p className='link'> I AM A USER</p>
                </Link>
            </div>
        </div>
    )
}

export default Register