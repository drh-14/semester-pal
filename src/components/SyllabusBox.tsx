'use client'
import { Button } from '@mui/material';
import { useState } from 'react';
export default function SyllabusBox(props: {categories: {name: string, weight: number}[]}){
    return(
      <div className = 'flex max-h-96 overflow-auto items-center flex-col gap-4 border-solid border-2 border-black rounded-md p-4 max-w-md w-md'>
        <Button variant = 'contained'>Modify Grading Breakdown</Button>
        {props.categories.map((category) => <div className = 'flex gap-8' key = {category.name}>
          <div>{category.name}</div>
          <div className = 'justify-self-end'>{category.weight}%</div>
        </div> )}
      </div>
    )
}