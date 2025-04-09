'use client'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import {useState } from 'react';
import DialogBox from './DialogBox';
type syllabusItemProps = { category: string, weight: number };
export default function SyllabusItem(props: { syllabusItem: syllabusItemProps, syllabus: syllabusItemProps[], setSyllabus: React.Dispatch<React.SetStateAction<syllabusItemProps[]>> }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(props.syllabusItem.category);
    const [weight, setWeight] = useState(props.syllabusItem.weight);

   const editSyllabusItem = () => {
    if(!props.syllabus.some(elem => elem.category === categoryName)){
        props.setSyllabus(props.syllabus.map(elem => elem.category !== props.syllabusItem.category ? elem : {category: categoryName, weight: weight}));
        setEditOpen(false);
    }
   }

   const deleteSyllabusItem = () => {
    props.setSyllabus(props.syllabus.filter(elem => elem.category !== categoryName));
    setDeleteOpen(false);
   }

    return (
        <div>
            <div>{props.syllabusItem.category}</div>
            <div>{props.syllabusItem.weight}</div>
            <Button onClick={() => setEditOpen(true)}><EditIcon></EditIcon></Button>
            <DialogBox width="60vh" height="40vh" open={editOpen} closeFunction={() => setEditOpen(false)}>
                <div className='flex flex-col gap-4 w-4/5 items-center'>
                    <input value = {categoryName} onChange={(e) => setCategoryName(e.target.value)} className='border-2 border-solid border-black rounded-md p-4 w-full' placeholder="Enter Category Name"></input>
                    <input value = {weight} onChange={(e) => setWeight((e.target.value as unknown) as number)} className='border-2 border-solid border-black rounded-md p-4 w-full' placeholder="Enter Grade Weight"></input>
                    <Button onClick = {editSyllabusItem} variant='contained'>Edit Syllabus Item</Button>
                </div>
            </DialogBox>
            <Button onClick={() => setDeleteOpen(true)}><DeleteIcon></DeleteIcon></Button>
            <DialogBox width="60vh" height="40vh" open={deleteOpen} closeFunction={() => setDeleteOpen(false)}>
                <div className='flex flex-col gap-4 w-4/5 items-center'>
                    <div>Are you sure that you want to delete this category?</div>
                    <Button onClick = {deleteSyllabusItem} variant = 'contained'>Yes</Button>
                </div>
            </DialogBox>
        </div>
    )
}