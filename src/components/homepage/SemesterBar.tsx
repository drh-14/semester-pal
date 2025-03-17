type SemesterBarProps = {semesters: string[]}
export default function SemesterBar(props: SemesterBarProps){
    return(
        <div className = 'flex gap-12 max-w-1/4 overflow-auto text-4xl border-2 border-solid border-black p-2'>
            {props.semesters.map((semester) => 
            <div key = {semester}>{semester}</div>)}
        </div>
    )
}