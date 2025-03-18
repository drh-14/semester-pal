'use client'
import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
export default function Homepage(){
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);
    const [classModalOpen, setClassModalOpen] = useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 200,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return(
        <div className = 'flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <Button onClick = {() => setSemesterModalOpen(true)} variant = 'contained'>Add a Semester</Button>
            <Modal open = {semesterModalOpen} onClose = {() => setSemesterModalOpen(false)} aria-labelledby="modal-modal-title"  aria-describedby="modal-modal-description">
                <Box sx = {style}>
                    <div className = 'flex flex-col items-center gap-8'>
                        <input className = 'w-4/5 p-4 border-solid border-2 border-black' placeholder = 'Enter semester name'></input>
                        <Button variant = 'contained'>Create semester</Button>
                    </div>
                </Box>
            </Modal>
            <SemesterBar semesters = {['fall', 'spring', 'summer']}></SemesterBar>
            <div className = 'flex gap-4'>
            <Button onClick = {() => setClassModalOpen(true)} variant = "contained">Add a Class</Button>
            <Modal open={classModalOpen} onClose = {() => setClassModalOpen(false)}>
                <Box sx = {style}>
                    <div className = 'flex flex-col items-center gap-8'>
                        <input className = 'w-4/5 p-4 border-solid border-2 border-black' placeholder = "Enter Class Name"></input>
                        <Button variant = 'contained'>Create Class</Button>
                    </div>
                </Box>
            </Modal>
            <Button variant = 'contained'>Remove a Class</Button>
            </div>
            <ClassGrid classes = {[{color: '', grade: 99, courseName: 'random'},{color: '', grade: 99, courseName: 'randomq'},{color: '', grade: 99, courseName: 'random2'},{color: '', grade: 99, courseName: 'random3'}]}></ClassGrid>
        </div>
    )
}