import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const Book = () => {

    //!Fetch Data from backend and display list of books
    const baseURL= "http://localhost:3000/api/books";
    
    const[bookData, setBookData]= useState([]);

    useEffect(()=>{
        const fetchBooks= async ()=>{

            try{
               const response= await fetch(baseURL);
               if(!response.ok){
                throw new Error("Failed to fetch data");
               }
               const responseJsonData= await response.json();
               setBookData(responseJsonData);
            }catch(err){
                console.error("Error fetching data:", err);

            }
        }

        fetchBooks();
    }, []);




  return (
    <>
    <h1>Books</h1>
    <ul className='books'>
        {bookData.map((book)=>{
            return(
                <li key={book._id}>

                    <Link to={`/books/${book.slug}`}>
                        <img src={`http://localhost:3000/uploads/${book.thumbnail}`} alt={`book.title`} />
                    </Link>
                    <h2>{book.title}</h2>
                    
                </li>
            )
        })}
             
    </ul>
    </>
  )
}

export default Book