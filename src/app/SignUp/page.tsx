import SignInSignOut from '../../components/SignInSignOut'
export default function SignUp() {
    return (
        <div className = 'flex flex-col justify-center items-center h-screen'>
            <SignInSignOut signingIn = {false}></SignInSignOut>
        </div>
    )
}