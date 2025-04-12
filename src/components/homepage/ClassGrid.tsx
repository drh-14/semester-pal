'use client'
import ClassBanner from './ClassBanner'
import { Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '@/components/DialogBox';
import { SupabaseClient } from '@supabase/supabase-js';
export default function ClassGrid(props: {supabaseClient: SupabaseClient, userID:string, classes: {color:string, grade: number, courseName:string}[], currSemester:string}){
    const [openNewClass, setOpenNewClass] = useState(false);

    const createClass = async () => {
        // todo
    }

    return(
        <div className = 'grid grid-cols-2 gap-8 w-4/12 mb-8'>
            {props.classes.map((course) => <ClassBanner supabaseClient = {props.supabaseClient} userID = {props.userID} key = {course.courseName} color = {course.color} courseName = {course.courseName} grade = {course.grade}></ClassBanner>)}
            <Button onClick = {() => setOpenNewClass(true)} sx={{border: '2px solid black'}} className = 'flex flex-col items-center justify-center p-4 h-48 rounded-md'><AddIcon fontSize = "large"></AddIcon></Button>
            <DialogBox width = "45vh" height = "35vh" open = {openNewClass} closeFunction = {() => setOpenNewClass(false)}>
                <div className = 'flex flex-col w-4/5 gap-8 items-center'>
                <Button component = "label" variant = 'contained'><div>Upload Syllabus</div><input className = 'hidden' type = 'file'></input></Button>
                <Button onClick = {createClass} variant = 'contained'>Create Class</Button>                
                </div>
            </DialogBox>
        </div>
    )
}