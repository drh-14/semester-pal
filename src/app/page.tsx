import { Box, Button } from '@mui/material';
export default function Home() {
  return (
    <div className = 'flex flex-col gap-8 items-center'>
      <div className = 'flex flex-col gap-16 mt-48 items-center justify-center'>
        <h1 className = 'text-center text-5xl font-mono'>Introducing SemesterPal</h1>
        <h2 className = 'text-center text-4xl'>The ultimate tool to manage your semester.</h2>
        <h3 className = 'text-center text-3xl'>Track final grades in all of your classes at the click of a  button.</h3>
        <Button size = "large" variant = 'contained'>Get Started</Button>
      </div>

    </div>
  );
}
