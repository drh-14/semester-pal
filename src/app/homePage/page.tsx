'use client'
import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import DialogBox from '@/components/DialogBox';
export default function Homepage(){
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);
    return(
        <div className = 'flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <DialogBox open = {semesterModalOpen} width = "" height = "" closeFunction = {() => setSemesterModalOpen(false)}>testing</DialogBox>
            <SemesterBar semesters = {['fall', 'spring', 'summer']}></SemesterBar>
            <ClassGrid classes = {[{color: '', grade: 99, courseName: 'random'},{color: '', grade: 99, courseName: 'Algebra'},{color: '', grade: 99, courseName: 'random2'},{color: '', grade: 99, courseName: 'random3'}]}></ClassGrid>
        </div>
    )
}