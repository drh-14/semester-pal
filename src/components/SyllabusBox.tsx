'use client'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import DialogBox from '@/components/DialogBox';
export default function SyllabusBox(props: {categories: {name: string, weight: number}[]}){
  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
  const [openGradingBreakdown, setOpenGradingBreakdown] = useState(false);
  const [gradeBreakdown, setGradeBreakdown] = useState<{category:string, weight: number}[]>([]);
  const [username, setUsername] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    getGradeBreakdown(username, semester, course);
  })

  const getGradeBreakdown = async (username:string, semesterName:string, courseName:string) => {
    const { data, error } = await supabaseClient.from("courses").select('category, weight').match({user:username, semester: semesterName, course: courseName});
    if(data){
        setGradeBreakdown(data);
    }
    if(error){
      console.log(error);
    }
}

    return(
      <div className = 'flex max-h-96 overflow-auto items-center flex-col gap-4 border-solid border-2 border-black rounded-md p-4 max-w-md w-md'>
        <Button onClick = {() => setOpenGradingBreakdown(true)} variant = 'contained'>Modify Grading Breakdown</Button>
        <DialogBox width = '30vh' height = '20vh' open={openGradingBreakdown} closeFunction={() => setOpenGradingBreakdown(false)}>
          <div className = 'flex flex-col items-center w-4/5'>
          <Button component="label" variant = 'contained'>Upload Syllabus
            <input className = 'hidden' type = 'file'></input>
          </Button>
          </div>
        </DialogBox>
        {props.categories.map((category) => <div className = 'flex gap-8' key = {category.name}>
          <div>{category.name}</div>
          <div className = 'justify-self-end'>{category.weight}%</div>
        </div> )}
      </div>
    )
}