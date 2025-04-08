'use client'
import SignInSignOut from '../../components/SignInSignOut'
export default function Login(){
    return(
        <div className = 'flex flex-col justify-center items-center h-screen'>
        <SignInSignOut signingIn={true}></SignInSignOut>
        </div>

    )
}