import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/UserAction';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import swal from 'sweetalert';

export default function RegisterPage(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search 
        ? props.location.search.split('=')[1] 
        : '/';
    
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            swal("Error", "Password and Confirm Password are not match", "error");
        }
        else{
            dispatch(register(name, email, password));
        }  
    };

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-title">
                    <h1>CREATE ACCOUNT</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger" >{error}</MessageBox>}
                <div className="form-body">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter Name" onChange={ e => setName(e.target.value) } required />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter Email" onChange={ e => setEmail(e.target.value) } required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" onChange={ e => setPassword(e.target.value) } required />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="Enter Confirm Password" onChange={ e => setConfirmPassword(e.target.value) } required />
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">Register</button>
                    </div>
                    <div>
                        <label />
                        <div>
                            Already have an account? {' '} 
                            <Link to={`/login?redirect=${redirect}`}>Sign-In.</Link>
                        </div>
                        <br/>
                    </div>
                </div>
            </form>
        </div>
    )
}
