'use client'
import ClassGrid from '@/components/homepage/ClassGrid';
import SemesterBar from '@/components/homepage/SemesterBar';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import DialogBox from '@/components/DialogBox';
import { createClient } from '@supabase/supabase-js';

export default function Homepage() {
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);
    const [currSemester, setCurrSemester] = useState('');
    const [semesters, setSemesters] = useState<string[]>([]);
    const [courses, setCourses] = useState<{color: string, courseName: string, grade: number}[]>([]);
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
    const [userID, setUserID] = useState("");

    useEffect(() => {
        localStorage.clear();
        fetchSemesters();
        fetchCourses(currSemester);
        getUserID()
    }, []);

    const getUserID = async () => {
        const { data, error } = await supabaseClient.auth.getUser();
        if (data && data.user) {
            setUserID(data.user.id);
        }
    };

    const fetchSemesters = async () => {
        const { data, error } = await supabaseClient.from("semesters").select("semesterName").match({ userID: userID });
        if (data) {
            setSemesters(data.map(element => element.semesterName));
            setCurrSemester(semesters[0]);
        }
        if (error) {
            console.log(error);
        }
    }

    const fetchCourses = async (semester:string) => {
        const { data, error } = await supabaseClient.from("courses").select("color, courseName, grade").match({userID: userID, semester: semester});
        if(data){
            setCourses(data);
        }
        console.log(error);
    }

    return (
        <div className='flex flex-col justify-center items-center gap-8'>
            <Navbar></Navbar>
            <DialogBox open={semesterModalOpen} width="" height="" closeFunction={() => setSemesterModalOpen(false)}>testing</DialogBox>
            <SemesterBar setCurrSemester={setCurrSemester} currSemester={semesters[0]} semesters={['fall', 'spring', 'summer']}></SemesterBar>
            <ClassGrid supabaseClient = {supabaseClient} userID = {userID} currSemester={currSemester} classes={courses}></ClassGrid>
        </div>
    )
}