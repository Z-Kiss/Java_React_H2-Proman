import {useEffect, useState} from "react";

export default function Navbar(){
    const [loggedInUser, setLoggedInUser] = useState("");

    async function initLoggedInUser(){
        const response = await fetch("/user")
        setLoggedInUser(await response.json());
        console.log(loggedInUser)
    }

    useEffect( () => {
        initLoggedInUser();
    },[])

    return(
        <div id={"nav-container"}>

            <div id={"nav-board-btn"}>
                <img src="" alt="icon"/>
                <div>
                    <button>Create Board</button>
                    <label>Board to Show: </label>
                    <select name="boardTypes" id="boardTypes">
                        <option value="">Guest Boards</option>
                        <option value="">All Boards</option>
                        <option value="">Personal Boards</option>
                    </select>
                </div>
            </div>
            <div id={"nav-login-btn"}>
                <button>Login</button>
                <button>Register</button>
            </div>
        </div>
    )
}