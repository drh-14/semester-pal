'use client'
import Navbar from '@/components/Navbar';
import AssignmentBox from '@/components/AssignmentBox';
import SyllabusBox from '@/components/SyllabusBox';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react'; 
import { createClient } from '@supabase/supabase-js';
import EditIcon from '@mui/icons-material/Edit';
import DialogBox from '@/components/DialogBox';
export default function ClassPage(){
    const [grade, setGrade] = useState();
    const [openGradeCalculation, setOpenGradeCalculation] = useState(false);
    const [assignments, setAssignments] = useState<{assignment:string, category:string, grade: number}[]>([]);
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
    const [username, setUsername] = useState('');
    const [gradeCalculation, setGradeCalculation] = useState<{grade: number, category: string}[]>([]);
    const [gradingBreakdown, setGradingBreakdown] = useState<{category:string, weight: number}[]>([]);

    useEffect(() => {
        getFinalGrade(username, semester, course);
        fetchAssignments(username, semester, course);
        getGradeCalculation(username, semester, course);
    }, []);
    
    const getFinalGrade = async (username:string, semesterName:string, courseName: string) => {
        const {data, error} = await supabaseClient.from("users").select('grade').match({user:username, semester: semesterName, course: courseName});
        if(data){
            setGrade(data[0].grade);
        }
        if(error){
            console.log(error);
        }
    };

    const fetchAssignments = async (username:string, semesterName:string, courseName: string) => {
        const {data, error} = await supabaseClient.from("assignments").select('assignment, grade, category').match({user: username, semester: semesterName, course: courseName})
        if(data){
            setAssignments(data);

        }
        if(error){
            console.log(error);
        }
    };

    const getGradeCalculation = async (username:string, semesterName:string, courseName:string) => {
        const {data, error} = await supabaseClient.from("courses").select('category, grade').match({user: username, semester: semesterName, course: courseName});
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
            <SyllabusBox categories = {[{name: 'Homework', weight: 35}, {name: 'Midterm', weight: 50}]}></SyllabusBox>
        </div>
    )   
}