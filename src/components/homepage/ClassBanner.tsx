'use client'
import { useRouter } from 'next/navigation';

type classBannerProps = {color:string, grade: number, courseName: string}
export default function ClassBanner(props: classBannerProps){
    const router = useRouter();
    return(
        <div onClick = {() => router.push('/classPage')} className = 'border-2 rounded-md bg-white flex items-center'>
            <div className = {`bg-${props.color}`}>{props.grade}</div>
            <div>{props.courseName}</div>
        </div>
    )
}