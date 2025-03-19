import { Dialog, Box } from '@mui/material';

export default function DialogBox(props:{open: boolean, width:string, height: string, children: React.ReactNode, closeFunction: (open:boolean) => void}){
    return(
        <Dialog open = {props.open} onClose={props.closeFunction}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: props.width, height: props.height}}>
               {props.children}
            </Box>
        </Dialog>
    )
}