import logo from '../Images/logo.png';
import user from '../Images/User2.png';
import lens from '../Images/whitesearch.png'
import { Link, useNavigate, } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';

function Navbar(props) {
    const auth = getAuth();
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    };

    const handleMenuClick = (menu) => {
        props.setMenu(menu); // Call the setMenu function from props
    };


    // console.log(auth);

    return (
        <div className="grid grid-cols-3 bg-black text-white fixed mt-0 ">
            <div className='flex  mt-3 p-2'>
                <img src={logo} className='h-10' />
                {auth.currentUser ?
                    <button onClick={logout} className='text-white flex hover:border border-blue-600 p-2 '>
                        LogOut
                    </button>

                    : <Link to="/signin">
                        <button className='text-white flex hover:border border-blue-600 p-2 w-48'>
                            <img src={user} alt="" className='h-7 ' />
                            Sign in</button>
                    </Link>}

            </div>
            <div className='flex '>
                <button onClick={() => handleMenuClick("All")} className=' font-semibold text-sm'>Home</button>
                <button onClick={() => handleMenuClick("science")} className='ml-7 font-semibold text-sm'>Science</button>
                <button onClick={() => handleMenuClick("News")} className='ml-7 font-semibold text-sm'>Movies</button>
                <button onClick={() => handleMenuClick("Movies")} className='ml-7 font-semibold text-sm'>Food</button>
                <button onClick={() => handleMenuClick("Worklife")} className='ml-7 font-semibold text-sm'>Worklife</button>
                <button onClick={() => handleMenuClick("travel")} className='ml-7 font-semibold text-sm'>Travel</button>
                <button onClick={() => handleMenuClick("Future")} className='ml-7 font-semibold text-sm'>Future</button>
                <button onClick={() => handleMenuClick("Culture")} className='ml-7 font-semibold text-sm'>Culture</button>
            </div>
            <div className='ml-40 flex p-4'>
                <img src={lens} alt="" className='h-6' />
                <input onChange={(e) => props.setSearch(e.target.value)} className=' flex bg-black' placeholder='Search BBC' />


            </div >

        </div >

    )
}


Navbar.propTypes = {
    setMenu: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
};

export default Navbar;
