import ClassGrid from '@/components/homepage/ClassGrid';
import Navbar from '../../components/Navbar';
import { Button, Modal } from '@mui/material';
export default function Homepage(){
    return(
        <div className = 'flex flex-col justify-center items-center gap-16'>
            <Navbar></Navbar>
            <Button variant = 'contained'>Add a Semester</Button>
            <ClassGrid></ClassGrid>


        </div>
    )
}