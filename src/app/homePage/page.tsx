'use client'
import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import DialogBox from '@/components/DialogBox';
import { createClient } from '@supabase/supabase-js';
export default function Homepage(){
    const [classes, setClasses] = useState<{color:string, grade: number, courseName: string}[]>([]);
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);
    const supabaseURL = 'https://wvvnzyorhpzgqrmffsyk.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY || "";
    const supabase = createClient(supabaseURL, supabaseKey);
    const fetchClasses = async (username:string, semesterName:string) => {
        try{
            return (await supabase.from("users").select('color, grade, courseName').match({user: username, semester: semesterName})).data;
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchSemesters = async (username:string) => {
        try{
            return (await supabase.from("users").select("semester").match({user:username}));
        }
        catch(error){
            console.log(error);
        }
    }

    const addSemester = async (username:string, semesterName:string) => {
        const {error} = await supabase.from("users").insert({user: username, semester: semesterName});
        if(error){
            console.log(error);
        }
    };

    const removeSemesters = async (username:string, semesters:string[]) => {
        const {error} = await supabase.from("users").delete().eq("user", username).in('semester', semesters);
        if(error){
            console.log(error);
        }
    };

    const addClass = async (username:string, semesterName:string, courseName:string) => {
        const {error} = await supabase.from("users").insert({user: username, semester: semesterName, course: courseName});
        if(error){
            console.log(error);
        }
    };

    const removeClass = async (username:string, courseName:string) => {
        const {error} = await supabase.from("users").delete().match({user: username, course: courseName});
        if(error){
            console.log(error);
        }
    };

    return(
        <div className = 'flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <DialogBox open = {semesterModalOpen} width = "" height = "" closeFunction = {() => setSemesterModalOpen(false)}>testing</DialogBox>
            <SemesterBar semesters = {['fall', 'spring', 'summer']}></SemesterBar>
            <ClassGrid classes = {[{color: '', grade: 99, courseName: 'random'},{color: '', grade: 99, courseName: 'Algebra'},{color: '', grade: 99, courseName: 'random2'},{color: '', grade: 99, courseName: 'random3'}]}></ClassGrid>
        </div>
    )
}