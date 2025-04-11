'use client'
import ClassBanner from './ClassBanner'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '@/components/DialogBox';
import { createClient } from '@supabase/supabase-js';
export default function ClassGrid(props: {classes: {color:string, grade: number, courseName:string}[], currSemester:string}){
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
    const [openNewClass, setOpenNewClass] = useState(false);
    const [courses, setCourses] = useState<{color:string, grade: number, courseName: string}[]>([]);
    const [courseName, setCourseName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
    }, []);

    const fetchCourses = async (username:string, semesterName:string) => {
        const {data, error} = await supabaseClient.from("users").select('color, grade, course').match({user: username, semester: semesterName});
        if(data){
            setCourses(data.map((element) => element.course));
        }
        if(error){
            console.log(error);
        }
    }

    const createClass = async () => {
        const response = await fetch('/api/addClass', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({username: username, courseName: courseName})
        });
        setOpenNewClass(false);
    }

    return(
        <div className = 'grid grid-cols-2 gap-8 w-4/12 mb-8'>
            {props.classes.map((course) => <ClassBanner key = {course.courseName} color = {course.color} courseName = {course.courseName} grade = {course.grade}></ClassBanner>)}
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