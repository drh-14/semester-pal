'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
export default function Navbar(){
    const router = useRouter();
    const handleSignOut = () => {

    };
    return(
        <div className = "w-full h-20 flex bg-blue-200 text-3xl items-center pl-4">
            <div onClick = {() => router.push('./homePage')}>SemesterPal</div>
            <Button onClick = {handleSignOut} sx={{marginLeft: 'auto',marginRight:'20px'}} variant = 'contained'>Sign Out</Button>
        </div>
    )
}