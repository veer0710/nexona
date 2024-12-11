import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {

    // States for handling user information
    const [name, setname] = useState('')
    const [mobile, setmobile] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    // To display rules
    // For Name
    const [DisplaySignupNameRules, setDisplaySignupNameRules] = useState('')
    const [isNameFocused, setisNameFocused] = useState(true)

    // For Mobile
    const [DisplaySignupMobileRules, setDisplaySignupMobileRules] = useState('')
    const [isMobileFocused, setisMobileFocused] = useState(true)

    // For Email
    const [DisplaySignupEmailRules, setDisplaySignupEmailRules] = useState('')
    const [isEmailFocused, setisEmailFocused] = useState(true)

    // For Password
    const [DisplaySignupPasswordRules, setDisplaySignupPasswordRules] = useState('')
    const [isPasswordFocused, setisPasswordFocused] = useState(true)

    // Handle focus in and out for name input
    const handlefocusIn = () => {
        setisNameFocused(true)
        if (name.length > 0) {
            setDisplaySignupNameRules('Enter at least 1 character')
        }
        else {
            setDisplaySignupNameRules('Enter at least 1 character')
        }
    }

    const handlefocusOut = () => {
        setisNameFocused(false);
        if (name.length === 0) {
            setDisplaySignupNameRules('Enter your name');
        } else {
            setDisplaySignupNameRules('');
        }
    }

    // Handle focus in and out for Mobile input
    const mobileRegex = /^(\+91|91|0)?\s?(\d{10})$/
    const MobilehandlefocusIn = () => {
        setisMobileFocused(true)
        if (mobile.length <= 10) {
            setDisplaySignupMobileRules('Enter a valid mobile number')
        }
        else if (mobile.length === 10 && mobileRegex.test(mobile) === true) {
            setDisplaySignupMobileRules('Valid mobile number')
        }
    }

    const MobilehandlefocusOut = () => {
        setisMobileFocused(false);
        if (mobile.length === 0) {
            setDisplaySignupMobileRules('Enter mobile number');
        } else if (!mobileRegex.test(mobile)) {
            setDisplaySignupMobileRules('Enter a valid mobile number');
        } else {
            setDisplaySignupMobileRules('');
        }
    }

    // Handle focus in and out for Email input
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const EmailhandlefocusIn = () => {
        setisEmailFocused(true)
        if (!EmailRegex.test(email)) {
            setDisplaySignupEmailRules('Enter a valid email')
        }
        else {
            setDisplaySignupEmailRules('Valid email')
        }
    }

    const EmailhandlefocusOut = () => {
        setisEmailFocused(false);
        if (email.length === 0) {
            setDisplaySignupEmailRules('Enter your email');
        } else if (!EmailRegex.test(email)) {
            setDisplaySignupEmailRules('Enter a valid email');
        } else {
            setDisplaySignupEmailRules('');
        }
    }

    // Handle focus in and out for Password input
    const PasswordhandlefocusIn = () => {
        setisPasswordFocused(true)
        if (password.length < 8) {
            setDisplaySignupPasswordRules('Password must be at least 8 characters')
        }
        else if (password.includes("@", "$", "#", "*", "%", "^")) {
            setDisplaySignupPasswordRules('Strong Password')
        }
        else if (!password.includes("@", "$", "#", "*", "%", "^")) {
            setDisplaySignupPasswordRules('Weak Password')
        }
    }

    const PasswordhandlefocusOut = () => {
        setisPasswordFocused(false);
        if (password.length === 0) {
            setDisplaySignupPasswordRules('Enter password');
        } else if (password.length < 8) {
            setDisplaySignupPasswordRules('Password must be at least 8 characters');
        } else {
            setDisplaySignupPasswordRules('');
        }
    }

    const handlesignup = (e) => {
        e.preventDefault();

        let isValid = true;

        // For validation
        // Name validation
    if (!name) {
        setDisplaySignupNameRules('Enter your name');
        setisNameFocused(false);
        isValid = false;
    } else {
        setDisplaySignupNameRules('');
    }

    // Mobile validation
    if (!mobile || !mobileRegex.test(mobile)) {
        setDisplaySignupMobileRules('Enter a valid mobile number');
        setisMobileFocused(false);
        isValid = false;
    } else {
        setDisplaySignupMobileRules('');
    }

    // Email validation
    if (!email || !EmailRegex.test(email)) {
        setDisplaySignupEmailRules('Enter a valid email');
        setisEmailFocused(false);
        isValid = false;
    } else {
        setDisplaySignupEmailRules('');
    }

    // Password validation
    if (!password || password.length < 8) {
        setDisplaySignupPasswordRules('Password must be at least 8 characters');
        setisPasswordFocused(false);
        isValid = false;
    } else {
        setDisplaySignupPasswordRules('');
    }

        if (isValid) {
            // Store data in localStorage if the form is valid
            const userData = {
                Name: name,
                Mobile: mobile,
                Email: email,
                Password: password,
            };

            // Store the user data in localStorage (as a JSON string)
            localStorage.setItem('userData', JSON.stringify(userData))

            // Clear the form after submission
            setname('')
            setmobile('')
            setemail('')
            setpassword('')

            alert('User registered successfully!');

        }

        else {
            alert('Form has invalid inputs. User cannot be registered!');
        }

    }

    return (
        <>
            <form className="SignUpBody" onSubmit={handlesignup}>

                <h4>Create Account</h4>

                <div className="SignUpName">
                    <p>Name</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value)
                            // RulesofSignupName({ name })
                        }}
                        placeholder='Your first and last name'
                        className='SignUpNameInput'
                        onFocus={handlefocusIn}
                        onBlur={handlefocusOut}
                        style={{
                            border: isNameFocused ? "rgb(44, 139, 255,0.5) 2px solid"
                                : name.length === 0 && !isNameFocused ? "rgba(255, 12, 28, 0.7) 2px solid" : "",

                            boxShadow: name.length >= 0 && isNameFocused ? "0 0 5px rgb(44, 139, 255, 0.5)"
                                : name.length === 0 && !isNameFocused ? "0 0 5px rgb(255, 12, 28, 0.5)" : ""
                        }}
                    />
                    <div className='DisplaySignupNameRules'
                        style={{
                            color: name.length === 0 && !isNameFocused ? "red"
                                : name.length > 0 ? "green" : "grey"
                        }}>
                        {DisplaySignupNameRules}</div>
                </div>

                <div className="MobileandCodeStart">
                    <p>Mobile number</p>
                    <div className='MobileandCode'>
                        <div className="selectCode">
                            <select className='SignUpSelectClass' name="country" id="country">
                                <option value="IN">India (+91)</option>
                                <option value="US">United States (+1)</option>
                                <option value="CA">Canada (+1)</option>
                                <option value="GB">United Kingdom (+44)</option>
                                <option value="AU">Australia (+61)</option>
                            </select>
                        </div>
                        <div className="SignUpMobile">
                            <input type="tel"
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                                onFocus={MobilehandlefocusIn}
                                onBlur={MobilehandlefocusOut}
                                placeholder='Your number'
                                className='SignUpMobileInput'
                                style={{
                                    border: !isMobileFocused ?
                                        !mobileRegex.test(mobile) ?
                                            "rgba(255, 12, 28, 0.7) 2px solid"
                                            : isMobileFocused && mobileRegex.test(mobile) ? "rgb(44, 139, 255,0.5) 2px solid"
                                                : "#bbbbbb 1px solid"
                                        : "",

                                    boxShadow: !isMobileFocused ?
                                        !mobileRegex.test(mobile) ?
                                            "0 0 5px rgb(255, 12, 28, 0.5)"
                                            : isMobileFocused && mobileRegex.test(mobile) ? "0 0 5px rgb(44, 139, 255, 0.5)"
                                                : ""
                                        : ""

                                }}
                            />
                            <div className='DisplaySignupMobileRules'
                                style={{
                                    color: !isMobileFocused && !mobileRegex.test(mobile) ?
                                        "red"
                                        : isMobileFocused && mobileRegex.test(mobile) ? "green"
                                            : "grey"

                                }}
                            >
                                {DisplaySignupMobileRules}</div>
                        </div>
                    </div>
                </div>

                <div className="SignUpEmail">
                    <p>Email</p>
                    <input type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder='johndoe@gmail.com'
                        className='SignUpEmailInput'
                        onFocus={EmailhandlefocusIn}
                        onBlur={EmailhandlefocusOut}
                        style={{
                            border: !isEmailFocused ?
                                !EmailRegex.test(email) ?
                                    "rgba(255, 12, 28, 0.7) 2px solid"
                                    : isEmailFocused && email.length === 0 ? "rgb(44, 139, 255,0.5) 2px solid"
                                        : ""
                                : "",

                            boxShadow: !isEmailFocused ?
                                !EmailRegex.test(email) ?
                                    "0 0 5px rgb(255, 12, 28, 0.5)"
                                    : isEmailFocused && email.length === 0 ? "0 0 5px rgb(44, 139, 255, 0.5)"
                                        : ""
                                : ""
                        }}
                    />
                    <div className='DisplaySignupEmailRules' style={{
                        color: !isEmailFocused && !EmailRegex.test(email)
                            ? "red"
                            : isEmailFocused && EmailRegex.test(email) ? "green" : "grey"
                    }}>{DisplaySignupEmailRules}</div>
                </div>

                <div className="SignUpPassword">
                    <p>Password</p>
                    <input type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder='At least 8 characters'
                        className='SignUpPasswordInput'
                        onFocus={PasswordhandlefocusIn}
                        onBlur={PasswordhandlefocusOut}
                        style={{
                            border: !isPasswordFocused
                                ? password.length < 8
                                    ? "rgba(255, 12, 28, 0.7) 2px solid"
                                    : isPasswordFocused && password.length === 0 ? "rgb(44, 139, 255,0.5) 2px solid"
                                        : ""
                                : "",

                            boxShadow: !isPasswordFocused
                                ? password.length < 8
                                    ? "0 0 5px rgb(255, 12, 28, 0.5)"
                                    : isPasswordFocused && password.length === 0 ? "0 0 5px rgb(44, 139, 255, 0.5)"
                                        : ""
                                : ""
                        }}
                    />
                    <div className='DisplaySignupPasswordRules' style={{
                        color: !isPasswordFocused && password.length < 8
                            ? "red"
                            : isPasswordFocused && password.length >= 8 ? "green" : "grey"
                    }}>{DisplaySignupPasswordRules}</div>
                </div>

                <button type='submit' className='SignUpSubmit'>Submit</button>

                <div className='AlreadyAccount'>
                    <p>Already have an account?</p>
                    <Link to="/Login">Login</Link>
                </div>

                <div className="bottomDisclaimer">
                    <p>By creating an account or logging in, you agree to Nexona's <Link>conditions of use</Link> and <Link>Privacy Policy</Link></p>
                </div>

            </form>
        </>
    )
}

export default SignUp