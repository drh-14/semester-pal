'use client'
import { Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from '@/components/DialogBox';
import {FormControlLabel, Checkbox, FormGroup} from '@mui/material';
export default function SemesterBar(props: {semesters: string[], currSemester:string, setCurrSemester: (argv:string) => void}){
    const [openAddSemester, setOpenAddSemester] = useState(false);
    const [openRemoveSemester, setOpenRemoveSemester] = useState(false);
    const [removedSemesters, setRemovedSemesters] = useState<string[]>([]);
    const [newSemester, setNewSemester] = useState("");

    const removeSemesters = async () => {
        // todo
    }

    const addSemester = async () => {
        // todo
    }

    return(
        <div className = 'flex gap-4 max-w-1/4 overflow-auto text-4xl items-center border-2 border-solid border-black p-4 rounded-md'>
            <div className = 'flex gap-8'>
            {props.semesters.map((semester) => 
            <Button onClick = {() => props.setCurrSemester(semester)} size = "large" sx ={{fontSize:'1.8vh', color: 'black', backgroundColor: semester === props.currSemester ? 'orange': null}} key = {semester}>{semester}</Button>)}
            </div>
            <div>
            <Button onClick = {() => setOpenAddSemester(true)} sx={{padding: 0}}><AddIcon></AddIcon></Button>
            <DialogBox width = "60vh" height = "20vh" open = {openAddSemester} closeFunction = {() => setOpenAddSemester(false)}>
                <div className = 'w-4/5 flex flex-col items-center gap-8'>
                <input onChange = {(e) => setNewSemester(e.target.value)} className = 'w-full p-4 border-2 border-black border-solid rounded-md' placeholder = 'Enter semester name'></input>
                <Button variant = 'contained'>Create Semester</Button>
                </div>
            </DialogBox>
            <Button onClick = {() => setOpenRemoveSemester(true)}><DeleteIcon></DeleteIcon></Button>
            <DialogBox width = "60vh" height = "30vh" open = {openRemoveSemester} closeFunction = {() => setOpenRemoveSemester(false)}>
                <div className = 'w-4/5 flex flex-col gap-8'>
                <FormGroup>
                    {props.semesters.map(semester => 
                        <FormControlLabel onChange={(checked) => setRemovedSemesters(prevList => !removedSemesters.includes(semester) ? [...prevList, semester] : prevList.filter(element => element !== semester))} key = {semester} control={<Checkbox></Checkbox>} label = {semester}></FormControlLabel>
                    )}
                </FormGroup>   
                <Button variant = 'contained'>Remove semester(s)</Button>
                </div>
            </DialogBox>
            </div>
        </div>
    )
}