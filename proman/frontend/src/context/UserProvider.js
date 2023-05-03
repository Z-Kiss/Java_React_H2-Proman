import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [user, setUser] = useState({userName: null, userId: null})

    const register = async (payload) => {
        const response = await fetch("/user/register", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        if (response.status === 200) {
            alert("User Registered")
        } else {
            alert("Some problem occurred with the Server try again")
        }
    }

    const loginAsGuest = async () => {
        await login({email: "guest@guest.com", password: "guestguest"})
    }

    const login = async (payload) => {
        const response = await fetch("/user/login", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(payload)
        })
        if (response.status === 200) {
            const body = await response.json();
            const token = body.token;
            sessionStorage.setItem("token", token);
            await getMe()

        } else {
            alert("Wrong Email/Username combination")
        }
    }

    const getMe = async () => {
        await fetch("/user/me",
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then((response) => response.json())
            .then((userData) => setUser({userName: userData.userName, userId: userData.userId}))
    }


    const logout = () => {
        sessionStorage.removeItem("token")
        setUser({userName: null, userId: null});
    }

    useEffect(() =>{
        if(sessionStorage.getItem("token")){
            getMe()
        }
    },[])


    return (
        <UserContext.Provider value={{register, login, logout, user, loginAsGuest}}>
            {children}
        </UserContext.Provider>
    )

}

export const useRegister = () => useContext(UserContext).register;
export const useLogin = () => useContext(UserContext).login;
export const useLogout = () => useContext(UserContext).logout;
export const useLoginAsGuest = () => useContext(UserContext).loginAsGuest;
export const useUser = () => useContext(UserContext).user;
export default UserProvider;