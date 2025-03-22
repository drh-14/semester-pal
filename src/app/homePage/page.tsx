'use client'
import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import DialogBox from '@/components/DialogBox';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; 
export default function Homepage(){
    dotenv.config();
    const [courses, setCourses] = useState<{color:string, grade: number, courseName: string}[]>([]);
    const [semesters, setSemesters] = useState<string[]>([]);
    const [currSemester, setCurrSemester] = useState("");
    const [username, setUsername] = useState(""); // temporary
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);
    const supabaseURL = 'https://wvvnzyorhpzgqrmffsyk.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || "";
    const supabase = createClient(supabaseURL, supabaseKey);

    const fetchCourses = async (username:string, semesterName:string) => {
        const {data, error} = await supabase.from("users").select('color, grade, course').match({user: username, semester: semesterName});
        if(data){
            setCourses(data.map((element) => element.course));
        }
        console.log(error);
    }

    return(
        <div className = 'flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <DialogBox open = {semesterModalOpen} width = "" height = "" closeFunction = {() => setSemesterModalOpen(false)}>testing</DialogBox>
            <SemesterBar semesters = {['fall', 'spring', 'summer']}></SemesterBar>
            <ClassGrid classes = {[{color: '', grade: 99, courseName: 'random'},{color: '', grade: 99, courseName: 'Algebra'},{color: '', grade: 99, courseName: 'random2'},{color: '', grade: 99, courseName: 'random3'}]}></ClassGrid>
        </div>
    )
}