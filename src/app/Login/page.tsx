'use client'
import {AppProvider, SignInPage} from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
export default function Login(){
    const theme = useTheme();
    const providers = [
        {id: 'google', name: 'Google'},
        {id: 'credentials', name: 'Email and Password'}
    ];
    return(
        <AppProvider theme = {theme}>
            <SignInPage providers = {providers}></SignInPage>
        </AppProvider>
    )
}