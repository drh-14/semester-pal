'use client'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import DialogBox from '@/components/DialogBox';
import SyllabusItem from '@/components/SyllabusItem';
export default function SyllabusBox(props: {categories: {name: string, weight: number}[]}){
  const [courseID, setCourseID] = useState("");
  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
  const [syllabus, setSyllabus] = useState<{category:string, weight: number}[]>([]);
  const [username, setUsername] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [editSyllabusOpen, setEditSyllabusOpen] = useState(false);

  useEffect(() => {
    getSyllabus(username, semester, course);
  })

  const getSyllabus = async (username:string, semesterName:string, courseName:string) => {
    const { data, error } = await supabaseClient.from("courses").select('category, weight').match({user:username, semester: semesterName, course: courseName});
    if(data){
        setSyllabus(data);
    }
    if(error){
      console.log(error);
    }
}

  const modifyCategory = async () => {
    await fetch('/api/modifyDatabase/addAssignment')
  }

  const updateSyllabus = async () => {
    if(syllabus.map(elem => elem.weight).reduce((acc, curr) => acc + curr, 0) === 100){
      const res = await fetch('/api/modifyDatabase', {
        method: "POST",
        headers : {
          "Content-Type":  "application/json"
        },
        body: JSON.stringify({syllabus: syllabus, courseID: courseID})

      });
      if(res.ok){
        setEditSyllabusOpen(false);
      }
    }
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