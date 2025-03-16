'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
type signInSignOutProps = {signingIn: boolean};
export default function SignInSignOut(props: signInSignOutProps){
    const router = useRouter();
    return(
        <div className = 'flex items-center justify-center h-screen'>
            <div className = 'p-4 flex flex-col items-center w-3/12 bg-blue-200 gap-10'>
            <div className = 'flex flex-col gap-4 w-3/4'>
            <input className = 'p-4' placeholder = 'Username'></input>
            <input className = 'p-4'  placeholder = 'Password'></input>
            </div>
            <Button onClick = {() => router.push('/homePage')} variant = "contained">{props.signingIn ? "Sign In": "Sign Up"}</Button>
            </div>      
            </div>
    )
}