// import React from 'react'
import { addDoc, doc, collection, getDocs } from "firebase/firestore";
import { database } from "../Firebase/Setup";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Setup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Comments(props) {

    const [comments, Setcomments] = useState('');
    const [newsComments, setNewsComments] = useState([]);

    const addComments = async () => {

        const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`);
        const commentsRef = collection(newsDoc, "Comments")
        auth.currentUser == !null && toast.warning("please login")
        try {
            auth.currentUser &&
                await addDoc(commentsRef, {
                    comments: comments,
                    name: auth.currentUser.displayName,
                    profileImage: auth.currentUser.photoURL,
                })
            auth.currentUser && toast.success("comment added succesfully")
        } catch (err) {
            console.error(err)
        }

    }

    const showComments = async () => {

        const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`);
        const commentsRef = collection(newsDoc, "Comments")

        try {
            const data = await getDocs(commentsRef);
            // console.log(data);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id

            }))
            setNewsComments(filteredData)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        showComments()
    }, [newsComments])
    return (
        <div className="grid grid-rows-2">
            <div>
                <div className="p-5">
                    <label className="block mb-2 text-2xl font-medium text-gray-900 ">Add comments</label>
                    <div className="flex gap-2">
                        <input onChange={(e) => Setcomments(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="comments" required />
                        <button onClick={addComments} className=" ml-2 bg-gray-50  hover:bg-slate-300 text-gray-900  text-sm py-2 px-4 rounded">
                            Add
                        </button>
                    </div>

                </div>
            </div>
            <div className="p-5 h-2 ">


                {newsComments.map((data, index) => {
                    // console.log(newsComments)
                    return (
                        <>
                            <div key={index} className="flex gap-4">
                                <img src={data.profileImage} className="rounded-full w-7 h-7" alt="" />
                                <h3 className="ml-2 text-sm text-slate-500">{data.name} :</h3>



                            </div>
                            <h6 className="ml-7 font-semibold">{data.comments}</h6>
                        </>
                    );
                })}
            </div>
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default Comments
