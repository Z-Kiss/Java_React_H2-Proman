export default function UserButtons({loggedInUser}){
    return(loggedInUser != null
        ?
        <>
            <button>Logout</button>
            <button>{loggedInUser}</button>
        </>
        :
        <>
            <button>Login</button>
            <button>Register</button>
        </>
    )
}