import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"


import("../styles/login.css")
const Login = (props) => {

    let nav = useNavigate()

    const [info, setInfo] = useState({
        email: "",
        password: ""
    })
    const [email, setEmail] = useState("")

    const userLogin = (e) => {
        e.preventDefault();
        if (info.email === "") {
            alert("provide email")
            return
        } else if (info.password === "") {
            alert("provide password")
            return
        } else {

            const config = { headers: { "Content-Type": "application/json" } }
            axios.post("http://localhost:8080/api/login", info, config)
                .then((res) => {
                    let tokrn = res.data.token
                    let userName = res.data.userName
                    localStorage.setItem('token', tokrn)
                    localStorage.setItem("user" , userName)

                    nav("/home")
                })
                .catch((e) => {
                    alert(e.response.data.message)
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
            url: "http://localhost:8080/google/login",
            data: { tokenId: response.tokenId }
        }).then((res) => {
            let tokrn = res.data.token
            let userName  = res.data.userName
            localStorage.setItem('token', tokrn)
            localStorage.setItem("google", true)
            localStorage.setItem("user" ,  userName)

            nav("/home")
        });
    }

    const responseFailuareGoogle = (response) => {
        console.log(response);
        alert("LOGIN FAILED")

    }
    return (
        <div className='mainholder_loginpage'>
            <div className='formholder'>
                <h1>LOGIN</h1>
                <form action='/' method='post'>
                    <div className='inputholder email'>
                        <input type="email"
                            placeholder="email"
                            name="email"
                            className='le'
                            value={email}
                            onChange={(e) => {
                                let input = e.target.value
                                setEmail(input)
                            }}
                        ></input>
                    </div>
                    <div className='inputholder password'>
                        <input type="text"
                            placeholder="password"
                            name="password"
                            value={info.password}
                            className='lp'
                            onChange={(e) => {
                                let input = e.target.value
                                setInfo({
                                    email: email,
                                    password: input
                                })
                            }}
                        ></input>
                    </div>
                    <div className='loginbutton'>
                        <button className='loginB' onClick={userLogin} > LOGIN </button>
                    </div>
                </form>

                <GoogleLogin

                    clientId="554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com"
                    buttonText='Login With Google'
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailuareGoogle}

                    className="loging"
                />

                <Link to="/register">
                    <p className='link'> I AM NOT A USER</p>
                </Link>
            </div>
        </div>

    )
}

export default Login