'use client'
import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/AssignmentBox';
import SyllabusBox from '@/components/SyllabusBox';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react'; 
import { createClient } from '@supabase/supabase-js';
import DialogBox from '@/components/DialogBox';
export default function ClassPage(){
    const [grade, setGrade] = useState();
    const [openGradeCalculation, setOpenGradeCalculation] = useState(false);
    const [assignments, setAssignments] = useState<{assignmentName:string, category:string, grade: number}[]>([]);
    const supabaseURL = 'https://wvvnzyorhpzgqrmffsyk.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || "53w5";
    const supabase = createClient(supabaseURL, supabaseKey);

    useEffect(() => {
        fetchAssignments();
        getGradeBreakdown();
        getGradeCalculation();
    }, []);
    
    const getFinalGrade = async (username:string, semesterName:string, courseName: string) => {
        const {data, error} = await supabase.from("users").select('grade').match({user:username, semester: semesterName, course: courseName});
        if(data){
            return data[0].grade;
        }
        if(error){
            console.log(error);
        }
    };

    const fetchAssignments = () => {
        
    };


    const getGradeCalculation = async (username:string, semesterName:string, courseName:string) => {
        const {data, error} = await supabase.from("courses").select('category, grade').match({user: username, semester: semesterName, course: courseName});
        if(data){
            return data;
        }
        else{
            console.log(error);
        }
    }

    const getGradeBreakdown = async (username:string, semesterName:string, courseName:string) => {
        const { data, error } = await supabase.from("courses").select('category, weight').match({user:username, semester: semesterName, course: courseName});
        if(data){
            return data;
        }
        console.log(error);
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
            <DialogBox width = "60vh" height = "20vh" open={openGradeCalculation} closeFunction = {() => setOpenGradeCalculation(false)}>
                <div className = 'w-4/5 flex flex-col items-center gap-8'>
                <h1>test</h1></div>
            </DialogBox>
            <AssignmentBox assignments={[{name: 'HW1', grade: 95, category: 'Homework'}]}></AssignmentBox>
            <SyllabusBox categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>
        </div>
    )   
}