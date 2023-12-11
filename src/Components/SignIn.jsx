import front from '../Images/obi-pixel8propix-qXfD_nG4j-U-unsplash.jpg'
import logo from '../Images/logo.png'
import { signInWithPopup } from 'firebase/auth'
import { googleProvider, auth } from '../Firebase/Setup'
import { useNavigate } from 'react-router-dom'



function SignIn() {

    const navigate = useNavigate()

    const googleSignin = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            auth.currentUser && navigate("/")
        } catch (err) {
            console.error(err)
        }
    }
    // console.log(auth)
    return (
        <div className="grid grid-cols-2 bg-black h-screen">
            <div className='text-center' >
                <img src={logo} alt="" className=' h-14 ml-56 mt-32' />
                <h1 className='text-white text-3xl font-semibold mt-7'>Sign in</h1>

                <button onClick={googleSignin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14 w-96 mt-14">
                    Sign in now
                </button>
                <h2 className='text-blue-500 underline mt-7 '>Sign in now</h2>

            </div>
            <div>
                <img src={front} alt="" />
            </div>

        </div>
    )
}

export default SignIn
