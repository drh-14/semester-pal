'use client'
import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import DialogBox from '@/components/DialogBox';
import { createClient } from '@supabase/supabase-js';

export default function Homepage(){
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [currSemester, setCurrSemester] = useState('');
    const [semesters, setSemesters] = useState<string[]>([]);
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabaseClient.auth.getUser();
            if(data && data.user){
                console.log(data.user.id);
            }
     
    };
fetchData();
}, [])

    const fetchSemesters = async (username:string) => {
        const {data, error} = await supabaseClient.from("users").select("semester").match({user:username});
        if(data){
            setSemesters(data.map(element => element.semester));
            setCurrSemester(semesters[0]);
        }
        if(error){
            console.log(error);
        }
}
   
    return(
        <div className = 'flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <DialogBox open = {semesterModalOpen} width = "" height = "" closeFunction = {() => setSemesterModalOpen(false)}>testing</DialogBox>
            <SemesterBar setCurrSemester = {setCurrSemester} currSemester= {semesters[0]} semesters = {['fall', 'spring', 'summer']}></SemesterBar>
            <ClassGrid currSemester= {currSemester} classes = {[{color: '', grade: 99, courseName: 'random'},{color: '', grade: 99, courseName: 'Algebra'},{color: '', grade: 99, courseName: 'random2'},{color: '', grade: 99, courseName: 'random3'}]}></ClassGrid>
        </div>
    )
}