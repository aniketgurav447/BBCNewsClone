// import React from 'react'
import { useLocation } from 'react-router-dom';
import Comments from "./Coments"

function Newsdetails() {

    const location = useLocation();

    // console.log(location);
    return (
        <div className='grid grid-cols-2'>
            <div className='p-5'>
                <h1 className='font-extrabold text-2xl'>{location.state.data.title}</h1>
                <h4>{location.state.data.description}</h4>
                <img src={location.state.data.urlToImage} alt="" />
            </div>
            <Comments url={location.state.data.url} />
        </div>
    )
}

export default Newsdetails
