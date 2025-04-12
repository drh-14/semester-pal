'use client'
import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/classPage/AssignmentBox';
import SyllabusBox from '@/components/classPage/SyllabusBox';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react'; 
import { createClient } from '@supabase/supabase-js';
import EditIcon from '@mui/icons-material/Edit';
import DialogBox from '@/components/DialogBox';
import { useSearchParams } from "next/navigation";
export default function ClassPage(){
    const [grade, setGrade] = useState(0);
    const [courseName, setCourseName] = useState("");
    const [semesterName, setSemesterName] = useState("");
    const [openGradeCalculation, setOpenGradeCalculation] = useState(false);
    const [assignments, setAssignments] = useState<{assignmentName:string, category:string, grade: number}[]>([]);
    const [gradeCalculation, setGradeCalculation] = useState<{category: string, weight: number, grade: number}[]>([]);
    const searchParams = useSearchParams();
    const userID = searchParams.get("userID");
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

    useEffect(() => {
        getGrade();
        getAssignments();
        getGradeCalculation();
    }, []);
    
    const getGrade = async () => {
        const {data, error} = await supabaseClient.from("courses").select('grade').match({userID: userID, semesterName: semesterName, courseName: courseName});
        if(data && data[0]){
            setGrade(data[0].grade);
        }
        if(error){
            console.log(error);
        }
    };

    const getAssignments = async () => {
        const {data, error} = await supabaseClient.from("assignments").select('assignmentName, grade, category').match({userID: userID, semesterName: semesterName, courseName: courseName})
        if(data){
            setAssignments(data);
        }
        if(error){
            console.log(error);
        }
    };

    const getGradeCalculation = async () => {
        const {data, error} = await supabaseClient.from("syllabi").select('category, weight, grade').match({userID: userID, semesterName: semesterName, courseName: courseName});
        if(data){
            setGradeCalculation(data);
        }
        else{
            console.log(error);
        }
    }

    return(
        <div className = 'flex flex-col gap-8 items-center text-4xl'>
            <Navbar></Navbar>
            <h1>Your current grade:{grade}%</h1>
            <Button variant = 'contained' onClick = {() => setOpenGradeCalculation(true)}>View Grade Calculation</Button>
            <DialogBox width = "60vh" height = "20vh" open={openGradeCalculation} closeFunction = {() => setOpenGradeCalculation(false)}>
                <div className = 'w-4/5 flex flex-col items-center gap-8'>
                {gradeCalculation.map(element => <div key = {element.category} className = 'flex gap-4'>
                    <h1>{element.category}</h1>
                    <h1>{`${element.grade}%`}</h1>
                    <Button variant = 'contained'><EditIcon></EditIcon></Button>
                </div>)}
                </div>
            </DialogBox>
            <AssignmentBox assignments={[{name: 'HW1', grade: 95, category: 'Homework'}]}></AssignmentBox>
            <SyllabusBox courseName = "" categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>
        </div>
    )   
}