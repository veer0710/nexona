import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserLoginContext } from './UserLoginContext'

function Login() {

    const {setloggedInUser} = useUserLoginContext()

    // const [showpassword, setshowpassword] = useState('')
    const [isPasswordVisible, setisPasswordVisible] = useState(false)

    // States for email, password, error throwing
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')

    const functionshowpassword = () => {
        setisPasswordVisible(!isPasswordVisible)
    }

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();


        // Fetching user info
        const storedUserData = localStorage.getItem('userData')

        if (!storedUserData) {
            alert('No account found, Please sign up first')
            return;
        }

        const userData = JSON.parse(storedUserData)

        if (email === userData.Email && password === userData.Password) {
            seterror('')
            alert('Login successfully')

            // Setting Username in loggedInUser, so it can be accessible by UserloginContext.jsx
            setloggedInUser(userData.Name)

            // Navigate to homepage after successfully logged in
            navigate('/')
        }
        else {
            seterror('Invalid email or password')
        }

    }
    return (
        <>
            <form className='LoginFormBody' onSubmit={handleLogin}>
                <h4>Login</h4>

                <div className="LoginEmail">
                    <p>Email</p>
                    <input type="email" placeholder='Your registered email'
                        value={email} onChange={(e) => {
                            setemail(e.target.value)
                        }} />
                </div>

                <div className="LoginPassword">
                    <p>Password</p>

                    <div className="PasswordInputWrapper">
                        <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }}
                        />
                        <span className='PasswordIcon'
                            onClick={functionshowpassword}>
                            {isPasswordVisible ? "Hide" : "Show"}
                        </span>
                    </div>

                </div>

                <div className="errorThrowing">
                    <p style={{color: "red"}}>{error}</p>
                </div>
                <button type='submit' className='LoginBtn'>Login</button>

                <div className='DonthaveAccount'>
                    <p>Don't have a account?</p>
                    <Link to="/SignUp">Sign Up</Link>
                </div>

                <div className="LoginbottomDisclaimer">
                    <p>By creating an account or logging in, you agree to Nexona's <Link>conditions of use</Link> and <Link>Privacy Policy</Link></p>
                </div>
            </form>
        </>
    )
}

export default Login