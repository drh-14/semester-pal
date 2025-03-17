'use client'
import { useRouter } from 'next/navigation';
export type course = {color: string, grade: number, courseName: string}
export default function ClassBanner(props: course){
    const router = useRouter();
    return(
        <div onClick = {() => router.push('./classPage')} className = {`max-w-sm break-normal border-2 bg-red-200 pt-8 pr-8 pl-8 text-center gap-8 border-solid border-black rounded-md flex flex-col items-center`}>
            <div className = 'text-7xl text-white'>{props.grade}%</div>
            <div className = 'text-5xl'>{props.courseName}</div>
        </div>
    )
}