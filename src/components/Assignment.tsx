'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DialogBox from '@/components/DialogBox';
import { useState } from 'react';
type assignmentProps = {name:string, category:string, grade: number};
export default function Assignment(props: {assignment: assignmentProps, editAssignment: (assignment: assignmentProps) => void, deleteAssignment: (assignment: assignmentProps) => void}){
    const [openEditAssignment, setOpenEditAssignment] = useState(false);
    const [openDeleteAssignment, setOpenDeleteAssignment] = useState(false);
    const [assignmentName, setAssignmentName] = useState(props.assignment.name);
    const [category, setCategory] = useState(props.assignment.category);
    const [grade, setGrade] = useState(props.assignment.grade);

    return(
        <div className = 'text-3xl'>
            <div className = 'flex gap-4'>
                <div>{props.assignment.name}</div>
                <div>{props.assignment.category}</div>
                <div>{props.assignment.grade}%</div>
                <Button><EditIcon></EditIcon></Button>
                <Button><DeleteIcon></DeleteIcon></Button>
            </div>
        <DialogBox width = "60vh" height = "40vh" open={openEditAssignment} closeFunction = {() => setOpenEditAssignment(false)}>
             <div className = 'flex flex-col gap-4 w-4/5 items-center'>
                <input value = {assignmentName} onChange = {(e) => setAssignmentName(e.target.value)} className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Assignment Name"></input>
                <input onChange = {(e) => setGrade((e.target.value as unknown) as number)} className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Category"></input>
                <input onChange = {(e) => setCategory(e.target.value)} className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Grade"></input>
                <Button onClick = {() => props.editAssignment(props.assignment)} variant = 'contained'>Edit Assignment</Button>
            </div>
        </DialogBox>
        <DialogBox width = "60vh" height = "20vh" open={openDeleteAssignment} closeFunction = {() => setOpenDeleteAssignment(false)}>
            <div className = 'flex flex-col w-4/5 items-center gap-8 text-xl'>
            <div>Are you sure you want to delete this assignment?</div>
            <Button onClick = {() => props.deleteAssignment(props.assignment)} variant = 'contained'>Yes</Button>
            </div>
        </DialogBox>
        </div>
    )
}