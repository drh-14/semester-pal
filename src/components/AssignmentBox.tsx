'use client'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import DialogBox from '@/components/DialogBox';
type assignment = {name: string, category: string, grade: number}
export default function AssignmentBox(props: {assignments: assignment[]}){
    const [openGradeCalculation, setOpenGradeCalculation] = useState(false);
    const [openAddAssignment, setOpenAddAssignment] = useState(false);
    const [openEditAssignment, setOpenEditAssignment] = useState(false);
    const [openDeleteAssignment, setOpenDeleteAssignment] = useState(false);
    const [openGradingBreakdown, setOpenGradingBreakdown] = useState(false);

    return(
        <div>
            <div className = 'w-full flex flex-col max-h-96 overflow-auto gap-4 items-center border-2 border-black border-solid p-4'>
            <Button onClick = {() => setOpenAddAssignment(true)} variant = 'contained'>Add An Assignment</Button>
            <DialogBox width = "60vh" height = "40vh" open={openAddAssignment} closeFunction={() => setOpenAddAssignment(false)}>
                <div className = 'flex flex-col gap-8 items-center w-4/5'>
                <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Assignment Name"></input>
                <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Grade"></input>
                <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Category"></input>
                <Button variant = 'contained'>Create Assignment</Button>
                </div>
            </DialogBox>
            <div className = 'flex gap-2'>
            <div className = 'flex gap-4'></div>
            {props.assignments.map((assignment) => 
            <div key = {assignment.name} className = 'flex gap-8 items-center'>
                <div>{assignment.name}</div>
                <div>{assignment.grade}%</div>
                <div>{assignment.category}</div>
                <div className = 'flex gap-2'>
                <Button onClick = {() => setOpenEditAssignment(true)} sx ={{color:'black'}}><EditIcon fontSize = "medium"></EditIcon></Button>
                <DialogBox width = "60vh" height = "40vh" open={openEditAssignment} closeFunction = {() => setOpenEditAssignment(false)}>
                    <div className = 'flex flex-col gap-4 w-4/5 items-center'>
                <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Assignment Name"></input>
                <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Grade"></input>
                <input className = 'border-2 border-solid border-black rounded-md p-4 w-full' placeholder = "Enter Category"></input>
                <Button variant = 'contained'>Edit Assignment</Button>
                    </div>
                </DialogBox>
                <Button onClick = {() => setOpenDeleteAssignment(true)} sx={{color:'black'}}><DeleteIcon fontSize="medium"></DeleteIcon></Button>
                <DialogBox width = "60vh" height = "20vh" open={openDeleteAssignment} closeFunction = {() => setOpenDeleteAssignment(false)}>
                    <div className = 'flex flex-col w-4/5 items-center gap-8 text-xl'>
                    <div>Are you sure you want to delete this assignment?</div>
                    <Button variant = 'contained'>Yes</Button>
                    </div>
                </DialogBox>
                </div>
            </div>)}      
            </div>
            </div>
            </div>
    )
}