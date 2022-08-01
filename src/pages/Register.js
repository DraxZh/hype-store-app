import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'commons/axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Register(props){
    const {register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async data =>{
        //处理注册逻辑;
        try{
            const {nickname, email, password} = data
            const res = await axios.post('/auth/register',{nickname,email, password, type: 0});
            const jwToken = res.data;
            console.log(jwToken)
            global.auth.setToken(jwToken);
            localStorage.setItem('store_token_id', jwToken)
            toast.success('Register Success')
            navigate('/');
        }catch (error) {
            const message = error.message;
            toast.error(message);
        }
        //this.props.history.push('/');
    };

    return(
        <div className="login-wrapper">
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                {/* Input Email section */}
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input
                            className={"input ${errors.nickname && 'is-danger'}"}
                            type="text"
                            placeholder="Your Nickname"
                            name="nickname"
                            {...register("nickname",
                                {
                                    required:'Nickname is required',
                                    maxLength:{
                                        value:7,
                                        message: 'cannot be more than 7 digits'
                                    }
                                })
                            }
                        />
                        {errors.nickname &&(
                            <p className="helper has-text-danger">{errors.nickname.message}</p>
                        )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className={"input ${errors.email && 'is-danger'}"}
                            type="text"
                            placeholder="Your Email"
                            name="email"
                            {...register("email",
                                {
                                    required:'Email is required',
                                    pattern: {
                                        value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                                        message: 'invalid email'
                                    }
                                })
                            }
                        />
                        {errors.email &&(
                            <p className="helper has-text-danger">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            {...register("password", {
                                required:'Password is required',
                                minLength:{
                                    value:6,
                                    message: 'cannot be less than 6 digits'
                                }
                            })}
                            className="input"
                            type="password"
                            placeholder="Your Password"
                            name="password"
                        />
                        {errors.password &&(
                            <p className="helper has-text-danger">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary">Register</button>
                </div>
            </form>
        </div>

    );
}

