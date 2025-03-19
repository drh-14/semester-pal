'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'
export default function Navbar(){
    const router = useRouter();
    return(
        <div className = "w-full h-20 flex bg-blue-200 text-3xl items-center pl-4">
            <Button sx={{color: 'black', fontSize: '1.7vh'}} onClick = {() =>  router.push('/homePage')}>SemesterPal</Button>
            <Button onClick = {() => router.push('/')} sx={{marginLeft: 'auto',marginRight:'20px'}} variant = 'contained'>Sign Out</Button>
        </div>
    )
}