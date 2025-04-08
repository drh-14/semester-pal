'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SignInSignOut(props: {signingIn: boolean}){
    const router = useRouter();
    const handleClick = () => {       
    }

    return(
            <div className = 'flex items-center flex-col gap-8 w-1/4 bg-blue-500 p-8 rounded-md'>
            <div className = 'flex flex-col items-center gap-4 w-full'>
            <input className = 'p-4 rounded-md w-3/4' placeholder = 'Username'></input>
            <input className = 'p-4 rounded-md w-3/4'  placeholder = 'Password'></input>
            </div>
            <div className = 'flex flex-col items-center gap-4 w-full'>
            <Button sx = {{backgroundColor:'rgb(4, 118, 212)'}} className = 'w-1/3' variant = 'contained' onClick = {handleClick}>{props.signingIn ? "Sign In" : "Sign Up"}</Button>
            {props.signingIn ? <Button sx = {{backgroundColor:'rgb(4, 118, 212)'}} className = 'w-1/3' onClick = {handleClick} variant = 'contained'>Sign Up</Button>: null}
            </div>
     </div>
    )
}