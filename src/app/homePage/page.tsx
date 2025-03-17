import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { Button, Modal } from '@mui/material';
export default function Homepage(){
    return(
        <div className = 'flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <Button variant = 'contained'>Add a Semester</Button>
            <SemesterBar semesters = {['fall', 'spring', 'summer']}></SemesterBar>
            <div className = 'flex gap-4'>
            <Button variant = "contained">Add a Class</Button>
            <Button variant = 'contained'>Remove a Class</Button>
            </div>
            <ClassGrid classes = {[{color: '', grade: 99, courseName: 'random'},{color: '', grade: 99, courseName: 'randomq'},{color: '', grade: 99, courseName: 'random2'},{color: '', grade: 99, courseName: 'random3'}]}></ClassGrid>
        </div>
    )
}