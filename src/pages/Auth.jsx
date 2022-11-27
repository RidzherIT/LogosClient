import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "..";

export default observer(function Auth() {
    const [loginReg, setLoginReg] = useState('');
    const [passReg, setPassReg] = useState('');
    const [loginLog, setLoginLog] = useState('');
    const [passLog, setPassLog] = useState('');
    const { store } = useContext(Context);
    const reg = async () => {
        const data = {
            login: loginReg,
            password: passReg
        }
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        setLoginReg('');
        setPassReg('');
        if (json) {
            alert('Вы успешно зарегистрировались!')
        }
    }

    const login = async () => {
        const data = {
            login: loginLog,
            password: passLog
        }
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json && json.auth) {
            store.setAuth(true);
            alert('Вы успешно вошли в аккаунт!')
        }
        setLoginLog('');
        setPassLog('');
    }

    const logout = async () => {
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/api/logout');
        const json = await res.json();
        if (json && !json.auth) {
            store.setAuth(false);
            alert('Вы успешно вышли из аккаунта!')
        }
    }

    return (
        <div className="admin-auth__wrapper">
            <Link to='/'>
                <p className="admin__btn">Вернуться в магазин</p>
            </Link>
            <h1 className="admin__title">Аутентификация администратора</h1>
            {!store.auth ? <>
                <input placeholder="Введите логин" className="admin__input" onChange={e => setLoginReg(e.target.value)} value={loginReg} type="text" />
                <input placeholder="Введите пароль" className="admin__input" onChange={e => setPassReg(e.target.value)} value={passReg} type="text" />
                <button className="admin__btn" onClick={reg}>Регистрация</button>
                <input placeholder="Введите логин" className="admin__input" onChange={e => setLoginLog(e.target.value)} value={loginLog} type="text" />
                <input placeholder="Введите пароль" className="admin__input" onChange={e => setPassLog(e.target.value)} value={passLog} type="text" />
                <button className="admin__btn" onClick={login}>Войти</button>
            </>
                :
                <button className="admin__btn" onClick={logout}>Выйти</button>
            }
        </div>
    );
})