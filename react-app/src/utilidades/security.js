import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { login, logout } from '../store/auth-slice'
import { Esperando } from './comunes';
import store from "../store/store";

const API_AUTH = process.env.REACT_APP_API_AUTH || 'http://localhost:4321/'

axios.interceptors.request.use((config) => {
    if (store.getState().auth.isAuth)
        config.headers['Authorization'] = store.getState().auth.authToken;
    // XSRF
    // config.withCredentials = true;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axios;

export const LoginComponent = () => {
    const [auth, setAuth] = useState(store.getState().auth);
    const [loading, setLoading] = useState(false);
    const [usr, setUser] = useState('admin')
    const [pwd, setPwd] = useState('P@$$w0rd')
    const dispatch = useDispatch();

    const onLogin = () => {
        setLoading(true);
        axios.post(API_AUTH + 'login', { name: usr, password: pwd })
            .then(resp => {
                if (resp.data.success) {
                    dispatch(login({ authToken: resp.data.token, name: resp.data.name, roles: resp.data.roles }))
                    setAuth(store.getState().auth)
                } else {
                    store.AddErrNotify('Usuario o contraseña invalida.')
                }
                setLoading(false);
            }
            ).catch(err => {
                store.AddErrNotify(err);
                setLoading(false);
            });
    }
    const onLogout = () => {
        dispatch(logout())
        setAuth(store.getState().auth)
    }

    if (loading) return <Esperando />;

    if (auth.isAuth)
        return (
            <div>
                Hola {auth.name} <input className="btn btn-outline-success" type="button btn-sm" value="logout" onClick={onLogout} />
            </div>
        );
    return (
        <form className="text-end d-flex justify-content-end flex-wrap flex-sm-nowrap">
            <input type="text" value={usr} onChange={(e) => setUser(e.target.value)} placeholder='Usuario' className="form-control form-control-sm" />
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='Contraseña' className="form-control form-control-sm" />
            <input className="btn btn-outline-success btn-sm" type="button" value="login" onClick={onLogin} />
        </form>
    );
}

