// import React from 'react'

import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../Firebase/Setup";

function Home(props) {

    const [news, setNews] = useState([]);
    console.log(news)

    const addNews = async (data) => {
        const newDoc = doc(database, "News", `${data.url.substr(-10, 10)}`)
        try {
            await setDoc(newDoc, {
                title: data.title,
                description: data.description
            })
        } catch (err) {
            console.log(err)
        }

    }

    const getNews = () => {
        fetch(`https://newsapi.org/v2/everything?q=${props.menu ? props.menu : 'All'}&sortBy=popularity&apiKey=0c47a099f3f44d77b65e0aa890a7fdcf`)
            .then(res => res.json())
            // .then(json => setNews(json.article))
            .then(json => setNews(json.articles))
            .catch(error => console.log(error));
        // .then(json => console.log(json))
    }

    useEffect(() => {
        getNews();
    }, [props.menu]);

    console.log(news)



    return (
        <div className="mt-12 p-5 grid grid-cols-4">
            {news?.filter(data => data.title.includes(props.search)).map((data, index) => {
                return (
                    <Link onClick={() => addNews(data)} to="/details" state={{ data: data }}> <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={data.urlToImage} alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{data.title}</div>
                            <p className="text-gray-700 text-base">
                                {data.content}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <a href={data.url}>click here to read more</a>
                        </div>
                    </div>
                    </Link>
                )
            })}
        </div>
    )
}


Home.propTypes = {
    menu: PropTypes.string,
    search: PropTypes.string,
};

// Navbar.propTypes = {
//     setMenu: PropTypes.func.isRequired,
// };

export default Home
