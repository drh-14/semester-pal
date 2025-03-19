'use client'
import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/AssignmentBox';
import SyllabusBox from '@/components/SyllabusBox';
import { Button } from '@mui/material';
import { useState } from 'react'; 
export default function ClassPage(){
    const [grade, setGrade] = useState(12);
    const [openBreakdownModal, setOpenBreakdownModal] = useState(false);
    const [breakdown, setBreakdown] = useState<{category: string, grade: number}[]>();
    return(
        <div className = 'flex flex-col gap-8 items-center text-4xl'>
            <Navbar></Navbar>
            <h1>Your current grade:{grade}%</h1>
            <Button onClick = {() => setOpenBreakdownModal(true)} variant = 'contained'>View Grade Calculation</Button>
            <AssignmentBox assignments={[{name: 'HW1', grade: 95, category: 'Homework'}]}></AssignmentBox>
            <SyllabusBox categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>

        </div>
    )
    
}