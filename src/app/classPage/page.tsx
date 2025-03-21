'use client'
import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/AssignmentBox';
import SyllabusBox from '@/components/SyllabusBox';
import { Button } from '@mui/material';
import { useState } from 'react'; 
import { createClient } from '@supabase/supabase-js';
export default function ClassPage(){
    const [grade, setGrade] = useState();
    const [openGradeCalculation, setOpenGradeCalculation] = useState(false);
    const supabaseURL = '';
    const supabaseKey = process.env.SUPABASE_KEY || "";
    const supabase = createClient(supabaseURL, supabaseKey);
    const getFinalGrade = async (username:string, semesterName:string, courseName: string) => {
        const {data, error} = await supabase.from("users").select('grade').match({user:username, semester: semesterName, course: courseName});
        if(data){
            return data[0].grade;
        }
        if(error){
            console.log(error);
        }
    }

    const getGradeCalculation = async (username:string, semesterName:string, courseName:string) => {
        const {data, error} = await supabase.from("classes").select('category, grade').match({user: username, semester: semesterName, course: courseName});
        if(data){
            return data;
        }
        else{
            console.log(error);
        }
    }

    const addAssignment = async (username:string, semesterName:string, courseName:string, assignmentName:string, category: string, grade: number) => {
        const { error } = await supabase.from("assignments").insert({user: username, semester: semesterName, course: courseName, assignment: assignmentName, grade: grade, category: category});
        if(error){
            console.log(error);
        }
    };

    const modifyAssignment =  async (username:string, semesterName:string, courseName:string, assignmentName:string, newName:string, newCategory:string, newGrade: number) => {
        const { error } = await supabase.from('assignments').update({assignment: newName, category: newCategory, grade: newGrade}).match({user: username, semester: semesterName, course: courseName, assignment: assignmentName});
        if(error){
            console.log(error);
        }
    };

    const deleteAssignment = async (username: string, semesterName:string, courseName:string, assignmentName:string) => {
        const {error} = await supabase.from("assignments").delete().match({user: username, semester: semesterName, course: courseName, assignment: assignmentName});
        if(error){
            console.log(error);
        }
    };

    return(
        <div className = 'flex flex-col gap-8 items-center text-4xl'>
            <Navbar></Navbar>
            <h1>Your current grade:{grade}%</h1>
            <Button variant = 'contained' onClick = {() => setOpenGradeCalculation(true)}>View Grade Calculation</Button>
            <AssignmentBox assignments={[{name: 'HW1', grade: 95, category: 'Homework'}]}></AssignmentBox>
            <SyllabusBox categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>
        </div>
    )
    
}