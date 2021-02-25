import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/UserAction';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

export default function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1] 
        : '/';
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    
    return (
        <div className="p-1">
            
            <form className="form" onSubmit={submitHandler}>
                <div className="f-90 m-auto form-title">
                    <h1>SIGN IN</h1>
                </div>
                { loading && <LoadingBox></LoadingBox> }
                { error && <MessageBox variant="danger" >{error}</MessageBox> }
                <div className="form-body">
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter Email" onChange={ e => setEmail(e.target.value) } required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" onChange={ e => setPassword(e.target.value) } required />
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">Sign In</button>
                    </div>
                    <div>
                        <label />
                        <div>
                            New Customer? {' '} 
                            <Link to={`/register?redirect=${redirect}`}>Create your account.</Link>
                        </div>
                        <br/>
                    </div>
                </div>
            </form>
        </div>
    )
}
