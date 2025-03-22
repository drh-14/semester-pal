'use client'
import ClassBanner from './ClassBanner'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '@/components/DialogBox';
export default function ClassGrid(props: {classes: {color:string, grade: number, courseName:string}[]}){
    const [openNewClass, setOpenNewClass] = useState(false);

    useEffect(() => {
        fetchCourses(username, currSemester);
    }, [currSemester]);

    const removeClass = async (username:string, courseName:string) => {
        const {error} = await supabase.from("users").delete().match({user: username, course: courseName});
        supabase.from("assignments").delete().match({user: username, course: courseName});
        supabase.from("courses").delete().match({user: username, course: courseName});
        if(error){
            console.log(error);
        }
        else{
            setCourses(courses.filter(element => element.courseName !== courseName));
        }
    };

    return(
        <div className = 'grid grid-cols-2 gap-8 w-4/12 mb-8'>
            {props.classes.map((course) => <ClassBanner key = {course.courseName} color = {course.color} courseName = {course.courseName} grade = {course.grade}></ClassBanner>)}
            <Button onClick = {() => setOpenNewClass(true)} sx={{border: '2px solid black'}} className = 'flex flex-col items-center justify-center p-4 h-48 rounded-md'><AddIcon fontSize = "large"></AddIcon></Button>
            <DialogBox width = "60vh" height = "20vh" open = {openNewClass} closeFunction = {() => setOpenNewClass(false)}>
                <div className = 'flex flex-col w-4/5 gap-8 items-center'>
                <input className = 'w-full p-4 rounded-md border-2 border-solid border-black' placeholder = 'Enter Class Name'></input>
                <Button variant = 'contained'>Create Class</Button>                
                </div>
            </DialogBox>
        </div>
    )
}