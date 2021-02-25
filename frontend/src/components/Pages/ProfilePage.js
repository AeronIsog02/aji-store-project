import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/UserAction';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import swal from 'sweetalert';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/UserConstants';

export default function ProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { 
        success: successUpdate, 
        error: errorUpdate, 
        loading: loadingUpdate
    } = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(()=>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            swal('Error', 'Password and Confirm Password does not match', 'error');
        }else{
            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }
    return (
        <div className="p-1">
            <form className="form" onSubmit={submitHandler}>
                <div className="form-title">
                    <h1>USER PROFILE</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    : 
                    error? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        {
                            loadingUpdate && <LoadingBox></LoadingBox>
                        }
                        {
                            errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>
                        }
                        {
                            successUpdate && <MessageBox variat="success">Profile Updated Successfully</MessageBox>
                        }
                        <div className="form-body">
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" placeholder="Enter Email" value={email}  onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="Enter Password"   onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input id="confirmPassword" type="password" placeholder="Confirm Password"  onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            </div>
                            <div>
                                <br/>
                                <label />
                                <button className="primary" type="submit">
                                    Update
                                </button>
                                <br/>
                            </div>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
