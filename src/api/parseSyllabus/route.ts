import OpenAI from 'openai';

export async function POST(req: Request){
    const openai = new OpenAI({
        apiKey: ''
    });
    const response = await openai.responses.create({
        model: 'gpt-4o',
        instructions: `Your task is to parse a syllabus to identify key information. More specifically, you must get the course name, the categories, and the associated weights
        of each category. Please output a JSON string in the following format:
        {
        courseName: string,
        categories: {categoryName: string, weight: number}[]
        }
        . The weights should be between 0 and 100 inclusive. Do not respond with anything else.`, 
        input: ''
    })
}