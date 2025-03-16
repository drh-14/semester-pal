type SemesterBarProps = {semesters: string[]}
export default function SemesterBar(props: SemesterBarProps){
    return(
        <div className = 'flex gap-4'>
            {props.semesters.map((semester) => 
            <div onClick = {() => null}>{semester}</div>)}
        </div>
    )
}