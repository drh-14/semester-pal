import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/AssignmentBox';
import SyllabusBox from '@/components/SyllabusBox';
import { Button } from '@mui/material';
export default function ClassPage(){
    return(
        <div className = 'flex flex-col gap-8 items-center text-4xl'>
            <Navbar></Navbar>
            <h1>Your current grade:</h1>
            <Button variant = 'contained'>View Grade Breakdown</Button>
            <AssignmentBox assignments={[{name: 'HW1', grade: 95, category: 'Homework'}]}></AssignmentBox>
            <SyllabusBox categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>

        </div>
    )
    
}