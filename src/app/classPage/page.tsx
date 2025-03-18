'use client'
import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/AssignmentBox';
import SyllabusBox from '@/components/SyllabusBox';
import { Button, Modal, Box } from '@mui/material';
import { useState } from 'react'; 
export default function ClassPage(){
    const [grade, setGrade] = useState(12);
    const [openBreakdownModal, setOpenBreakdownModal] = useState(false);
    const [breakdown, setBreakdown] = useState<{category: string, grade: number}[]>();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return(
        <div className = 'flex flex-col gap-8 items-center text-4xl'>
            <Navbar></Navbar>
            <h1>Your current grade:{grade}%</h1>
            <Button onClick = {() => setOpenBreakdownModal(true)} variant = 'contained'>View Grade Breakdown</Button>
            <Modal open = {openBreakdownModal} onClose = {() => setOpenBreakdownModal(false)}>
                <Box sx = {style}>
                    <div className = 'flex w-3/4 flex-col gap-4'>
                    {breakdown?.map(element => 
                        <div key = {element.category} className = 'flex gap-4'>
                            <div>{element.category}</div>
                            <div>{element.grade}%</div>
                        </div>
                    )}</div>
                </Box>

            </Modal>
            <AssignmentBox assignments={[{name: 'HW1', grade: 95, category: 'Homework'}]}></AssignmentBox>
            <SyllabusBox categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>

        </div>
    )
    
}