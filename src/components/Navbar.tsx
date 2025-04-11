'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js';
export default function Navbar(){
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
const handleSignOut = async () => {
    const {error} = await supabaseClient.auth.signOut();
    console.log(error);
    await router.push('/');
}

    const router = useRouter();
    return(
        <div className = "w-full h-20 flex bg-blue-200 text-3xl items-center pl-4">
            <Button sx={{color: 'black', fontSize: '1.7vh'}} onClick = {() =>  router.push('/homePage')}>SemesterPal</Button>
            <Button onClick = {handleSignOut} sx={{marginLeft: 'auto',marginRight:'20px'}} variant = 'contained'>Sign Out</Button>
        </div>
    )
}