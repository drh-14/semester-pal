import { supabase } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request){
    const parsedRequest = await req.json();
    const body = parsedRequest.body();
    const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
    const {error} = await supabaseClient.from('assignments').delete().match({username: body.username, assignment: body.assignmentName});
    return new Response(error ? error.message : null);
    
}