'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Button } from '@mui/material';
import DialogBox from '@/components/DialogBox';
import { SupabaseClient } from '@supabase/supabase-js';
export default function ClassBanner(props: {supabaseClient: SupabaseClient, userID: string, color: string, grade: number, courseName: string}){
    const router = useRouter();
    const [openDeleteClass, setOpenDeleteClass] = useState(false);

    const deleteClass = async () => {
        // todo
    }

    return(
        <div>
        <Button sx={{border: '2px solid black', color: 'black', backgroundColor:'blueviolet', width: '18rem', height:'100%', padding: 4, paddingBottom: 1, display: 'flex', flexDirection: 'column', wordBreak:'break-all', alignItems: 'center', gap: 4, borderRadius:4}} onClick = {() => router.push('./classPage')}>
            <div className = 'text-7xl text-white'>{props.grade}%</div>
            <div className = 'text-4xl text-white'>{props.courseName}</div>
        </Button>
        <Button onClick = {() => setOpenDeleteClass(true)} sx={{position: 'relative',top: '-95%', right: '-75%'}}><DeleteSharpIcon fontSize="large" sx={{color:'white'}}></DeleteSharpIcon></Button>
        <DialogBox width = "60vh" height = "20vh" open = {openDeleteClass} closeFunction = {() => setOpenDeleteClass(false)}>
            <div className = 'flex flex-col gap-4 w-4/5 text-lg items-center'>
            <div>Are you sure you want to delete this class?</div>
            <Button onClick = {deleteClass} variant = 'contained'>Yes</Button>
            </div>
        </DialogBox>
        </div>
    )
}