'use client'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
type assignment = {name: string, category: string, grade: number}
export default function AssignmentBox(props: {assignments: assignment[]}){
    const [openAddAssignmentModal, setOpenAddAssignmentModal] = useState(false);
    return(
        <div>
            <div className = 'w-full flex flex-col max-h-96 overflow-auto gap-4 items-center border-2 border-black border-solid p-4'>
            <Button onClick = {() => setOpenAddAssignmentModal(true)} variant = 'contained'>Add An Assignment</Button>
            <div className = 'flex gap-2'>
            <div className = 'flex gap-4'></div>
            {props.assignments.map((assignment) => 
            <div key = {assignment.name} className = 'flex gap-8 items-center'>
                <div>{assignment.name}</div>
                <div>{assignment.grade}%</div>
                <div>{assignment.category}</div>
                <div className = 'flex gap-2'>
                <Button sx ={{color:'black'}}><EditIcon fontSize = "medium"></EditIcon></Button>
                <Button sx={{color:'black'}}><DeleteIcon fontSize="medium"></DeleteIcon></Button>
                </div>
            </div>)}      
            </div>
            </div>
            </div>
    )
}