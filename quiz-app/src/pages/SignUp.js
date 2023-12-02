import React, { Fragment, useState  } from "react";
import { Link } from 'react-router-dom'
import createAPIEndpoint from "../API/api";
import { ENDPOINTS } from "../API/api"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function SignUp(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userEndpoint = createAPIEndpoint(ENDPOINTS.user);

        const newUser = {
        email: email,
        fullName: fullName,
        password: password
        };

        userEndpoint.post(newUser)
        .then(response => {
            console.log('Registration successful:', response.data);
            toast.success('Registration successful');
            navigate('/');
        })
        .catch(error => {
            console.error('Registration failed:', error);
            // Xử lý lỗi đăng ký (ví dụ: hiển thị thông báo lỗi, vv.)
        });
    };
    return(
        <Fragment>
            <div
                style={{
                    backgroundImage: 'url(assets/img/figure/bg5-l.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: '100% 100%'
                }}
                className="bg-fix"
                >
                <div id="wrapper" className="wrapper">
                <div className="fxt-template-layout5"> {/*fxt-template-animation*/}
                    <div className="fxt-bg-img fxt-none-767 bg-fix">
                        <div className="fxt-intro">
                            <div className="sub-title">Welcome To</div>
                            <h1>Quiz</h1>
                            <p>Grursus mal suada faci lisis Lorem ipsum dolarorit ametion consectetur elit. Vesti ulum nec the dumm.</p>
                        </div>
                    </div>
                    <div className="fxt-bg-color">
                        <div className="fxt-header">
                            <Link to="/" className="fxt-logo"><img src="assets/img/logo.png"  alt="Logo" style={{ height: '60px' }}/></Link>
                            <div className="fxt-page-switcher">
                                <Link to="/" className="switcher-text switcher-text1">LogIn</Link>
                                <Link to="/register" className="switcher-text switcher-text2 active">Register</Link>
                            </div>
                        </div>
                        <div className="fxt-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group fxt-transformY-50 fxt-transition-delay-2">
                                    <input type="email" className="form-control" placeholder="Your Email" required="required"  value={email} onChange={handleEmailChange}/>
                                    <i className="flaticon-envelope"></i>
                                </div>
                                <div className="form-group fxt-transformY-50 fxt-transition-delay-1">
                                    <input type="text" className="form-control" placeholder="Full Name" required="required" value={fullName} onChange={handleFullNameChange}  />
                                    <i className="flaticon-user"></i>
                                </div>
                                
                                {/* <div className="m-group fxt-transformY-50 fxt-transition-delay-3">
                                    <input type="password" className="form-control" placeholder="Password" required="required" value={password} onChange={handlePasswordChange} />
                                    <i className="flaticon-padlock"></i>
                                </div> */}

                                <div className="form-group fxt-transformY-50 fxt-transition-delay-2">
                                    <input type="password" className="form-control" placeholder="Password" required="required" value={password} onChange={handlePasswordChange} />
                                    <i className="flaticon-padlock"></i>
                                </div>

                                <div className="form-group fxt-transformY-50 fxt-transition-delay-4">
                                    <div className="fxt-content-between">
                                        <button type="submit" className="fxt-btn-fill">Register</button>
                                        <div className="checkbox">
                                            <input id="checkbox1" type="checkbox"/>
                                            <label>I agree the terms of services</label>
                                        </div>
                                    </div>
                                </div>
                                <ToastContainer />
                            </form>
                        </div>
                        <div className="fxt-footer">
                            <ul className="fxt-socials">
                                <li className="fxt-facebook fxt-transformY-50 fxt-transition-delay-6"><a href="/#" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                <li className="fxt-twitter fxt-transformY-50 fxt-transition-delay-7"><a href="/#" title="twitter"><i className="fab fa-twitter"></i></a></li>
                                <li className="fxt-google fxt-transformY-50 fxt-transition-delay-8"><a href="/#" title="google"><i className="fab fa-google-plus-g"></i></a></li>
                                <li className="fxt-linkedin fxt-transformY-50 fxt-transition-delay-9"><a href="/#" title="linkedin"><i className="fab fa-linkedin-in"></i></a></li>
                                <li className="fxt-pinterest fxt-transformY-50 fxt-transition-delay-9"><a href="/#" title="pinterest"><i className="fab fa-pinterest-p"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default SignUp