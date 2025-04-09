import { createClient } from '@supabase/supabase-js';
export async function POST(req: Request){
    type syllabusItem = {category: string, weight: number};
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
    const payload = await req.json();
    const newSyllabus = payload.body().syllabus;
    const courseID = payload.body().courseID;
    const {data, error} = await supabaseClient.from("syllabi").select().match({courseID: courseID});
    if(data){
        const currentCategories = newSyllabus.map((item: syllabusItem) => item.category);
        data.forEach(elem => {
            if(!currentCategories.includes(elem)){
                supabaseClient.from("syllabi").delete().eq("categoryName", elem.category);
            }
        });
        await supabaseClient.from("syllabi").upsert(newSyllabus);      
    }
    return new Response(null, {status: 204});
}