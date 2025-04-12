'use client'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import DialogBox from '@/components/DialogBox';
import SyllabusItem from '@/components/classPage/SyllabusItem';
export default function SyllabusBox(props: {courseName: string, categories: {name: string, weight: number}[]}){
  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
  const [syllabus, setSyllabus] = useState<{category:string, weight: number}[]>([]);
  const [editSyllabusOpen, setEditSyllabusOpen] = useState(false);

  useEffect(() => {
    fetchSyllabus();
  })

  const fetchSyllabus = async () => {
    /* 
    get fields from syllabi table 
    */
   
    
}

  const modifyCategory = async () => {
    // todo
  }

  const updateSyllabus = async () => {
    // todo
  }

    return(
      <div className = 'flex max-h-96 overflow-auto items-center flex-col gap-4 border-solid border-2 border-black rounded-md p-4 max-w-md w-md'>
        {props.categories.map((category) => <div className = 'flex gap-8' key = {category.name}>
          <div>{category.name}</div>
          <div className = 'justify-self-end'>{category.weight ? `${category.weight}%` : null}</div>
        </div> )}
        <Button onClick = {() => setEditSyllabusOpen(true)} variant = 'contained'>Edit Syllabus</Button>
        <DialogBox width = "50vh" height = "50vh" open = {editSyllabusOpen} closeFunction = {() => setEditSyllabusOpen(false)}>
          <div className = 'flex flex-col items-center gap-8'>
            {syllabus.map(item => <SyllabusItem syllabus = {syllabus} setSyllabus = {setSyllabus} syllabusItem = {item} key = {item.category}></SyllabusItem>)}
          </div>
          <Button onClick = {updateSyllabus} variant = 'contained'>Update Syllabus</Button>
        </DialogBox>
      </div>
    )
}