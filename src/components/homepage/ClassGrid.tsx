import { course } from './ClassBanner';
import ClassBanner from './ClassBanner'
type classGridProps = {classes: course[]};
export default function ClassGrid(props: classGridProps){
    return(
        <div className = 'grid grid-cols-2 gap-8 w-4/12'>
            {props.classes.map((course) => <ClassBanner key = {course.courseName} color = {course.color} courseName = {course.courseName} grade = {course.grade}></ClassBanner>)}
        </div>
    )
}