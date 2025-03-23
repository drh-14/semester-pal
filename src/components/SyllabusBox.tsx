'use client'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import EditIcon from '@mui/icons-material/Edit';
import DialogBox from '@/components/DialogBox';
export default function SyllabusBox(props: {categories: {name: string, weight: number}[]}){
  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
  const [openGradingBreakdown, setOpenGradingBreakdown] = useState(false);
  const [openModifyCategory, setOpenModifyCategory] = useState(false);
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

  const modifyCategory = async () => {
    await fetch('/api/modifyDatabase/addAssignment')
  }

    return(
      <div className = 'flex max-h-96 overflow-auto items-center flex-col gap-4 border-solid border-2 border-black rounded-md p-4 max-w-md w-md'>
        {props.categories.map((category) => <div className = 'flex gap-8' key = {category.name}>
          <div>{category.name}</div>
          <div className = 'justify-self-end'>{category.weight}%</div>
          <Button onClick = {() => setOpenModifyCategory(true)} sx ={{color: 'black'}}><EditIcon></EditIcon></Button>
          <DialogBox width = '60vh' height = '40vh' open={openModifyCategory} closeFunction={() => setOpenModifyCategory(false)}>
          <div className = 'flex flex-col items-center w-4/5 gap-8'>
          <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Category Name"></input>
          <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Weight"></input>
            <Button variant = 'contained'>Edit Category</Button>
          </div>
        </DialogBox>
        </div> )}
      </div>
    )
}