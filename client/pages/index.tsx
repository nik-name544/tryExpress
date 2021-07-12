import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useContext, useEffect, useState} from 'react'
import LoginForm from "../src/components/LoginForm";
import {Context} from "./_app";
import {observer} from "mobx-react-lite";
import {IUser} from "../src/models/IUser";
import UserService from "../src/services/UserService";

function Home() {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const res = await UserService.fetchUsers()
            setUsers(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    if (store.isLoading) {
        return <p>Loading...</p>
    }

    if (!store.isAuth) {
        return <LoginForm/>
    }

    return (
        <>
            <h1>{store.isAuth ? `hello ${store.user.email}` : "user isn't logged in"}</h1>
            <h2>{store.user.isActivated ? "success email authorization" : "check your email "}</h2>
            <button onClick={() => store.logout()}>logout</button>
            <div>
                <button onClick={getUsers}>get users</button>
            </div>
            <div>
                {users.map((item, i) => {
                    return <div key={i}>
                        <h2>{item.email}</h2>
                    </div>
                })}
            </div>
        </>
    )
}

export default observer(Home)