import { Button } from '@mui/material';
export default function Navbar(){
    return(
        <div className = "w-full h-20 flex bg-blue-200 text-3xl items-center pl-4">
            <div>SemesterPal</div>
            <Button sx={{marginLeft: 'auto',marginRight:'20px'}} variant = 'contained'>Sign Out</Button>
        </div>
    )
}