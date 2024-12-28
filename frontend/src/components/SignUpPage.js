import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; // Import useHistory hook
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import {postRequest, setAuthorizationToken} from "../axiosHelper";

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [mobile, setMobileNumber] = useState('');
    const [error, setError] = useState(''); // State to manage error messages
    const history = useNavigate(); // Get the history object for redirection

    const handleSignup = async () => {
        try {
            // Check for empty fields
            if (!username || !email || !password || !confirmPassword || !mobile) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const data = await postRequest("/auth/signup", {
                username, email, password, role, mobile
            });

            const token = data.jwt;// Assuming the token is in response.data.token
            console.log('JWT Token:', token);

            // Store the token in localStorage for persistence
            setAuthorizationToken(token); // Set the token in axios headers globally

            localStorage.setItem('authToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            history('/dashboard');
        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {/* Render error message if exists */}
                    {error && <p className="text-danger">{error}</p>}
                    <MDBInput wrapperClass='mb-3' id='username' placeholder={"User Name"} value={username} type='text'
                              onChange={(e) => setUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}/>


                    <MDBInput wrapperClass='mb-2' placeholder='Mobile Number' id='mobileNumber' value={mobile}
                              type='text'
                              onChange={(e) => setMobileNumber(e.target.value)}/>
                    <label className="form-label mb-1">Role:</label>
                    <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="ROLE_CUSTOMER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%'}}
                            onClick={handleSignup}>Sign Up
                    </button>

                    <div className="text-center">
                        <p>Already Register? <a href="/">Login</a></p>
                    </div>

                </MDBContainer>
            </div>
        </div>
    );
}

export default SignupPage;