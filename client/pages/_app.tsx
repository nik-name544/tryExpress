import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Store from "../src/store/store";
import {createContext} from "react";

interface State {
    store: Store
}

export const store = new Store()

export const Context = createContext<State>({
    store
})

function MyApp({Component, pageProps}: AppProps) {
    return <Context.Provider value={{store}}> <Component {...pageProps} /></Context.Provider>
}

export default MyApp
