'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
export default function Home() {
  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASEURL!, process.env.NEXT_PUBLIC_APIKEY!);
  const router = useRouter();

  const handleSignIn = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'random'
      }
    })
  };

  return (
    <div className = 'flex flex-col gap-40'>
    <div className = 'flex gap-4 mt-4 justify-end mr-4'>
        <Button onClick = {handleSignIn}>Login</Button>
        <Button onClick = {handleSignIn}>Sign Up</Button>
      </div>
    <div className = 'flex flex-col gap-8 items-center'>
      <div className = 'flex flex-col gap-16 items-center justify-center'>
        <h3 className = 'text-4xl'>Introducing SemesterPal</h3>
        <h3 className = 'text-3xl'>The ultimate tool to manage your semester.</h3>
        <h3 className = 'text-3xl'>Track final grades in all of your classes at the click of a  button.</h3>
        <Button variant = 'contained' size = 'large' onClick = {handleSignIn}>Get Started</Button>
      </div>
    </div>
    </div>
  );
}
