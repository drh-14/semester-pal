import { Button } from '@mui/material';
type assignment = {name: string, category: string, grade: number}
export default function AssignmentBox(props: {assignments: assignment[]}){
    return(
        <div>
            <div className = 'w-full flex flex-col max-h-96 overflow-auto gap-4 items-center border-2 border-black border-solid p-4'>
            <Button variant = 'contained'>Add An Assignment</Button>
            {props.assignments.map((assignment) => 
            <div key = {assignment.name} className = 'flex gap-8'>
                <div>{assignment.name}</div>
                <div>{assignment.grade}%</div>
                <div>{assignment.category}</div>
            </div>)}      
            </div>
            </div>
    )
}