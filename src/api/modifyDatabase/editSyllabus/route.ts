import { createClient } from '@supabase/supabase-js';
export async function POST(req: Request){
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
    const payload = await req.json();
    const body = payload.body();
    const {error} = await supabaseClient.from("courses").update({category: body.categoryName, weight: body.categoryWeight});

}