import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OneBook = () => {
    const [bookData, setBookData] = useState([]);

    const { slug } = useParams();
    const baseURL = `http://localhost:3000/api/books/${slug}`;


    useEffect(() => {
        const fetchBooks = async () => {

            try {

                const response = await fetch(baseURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const responseJsonData = await response.json();
                setBookData(responseJsonData);

            } catch (err) {
                console.error("Error fetching data:", err);

            }
        }

        fetchBooks();

    }, []);

     

   
    return (
        <>
            <Link to={'/books'}>👈Back to Books</Link>
            {bookData.map(val => (
                <div className='bookdetails'>
                    <div className="col-1">
                        <img src={`http://localhost:3000/uploads/${val.thumbnail}`} alt={val.title} />
                    </div> 
                     <br /> 
                    <div className="col-2">
                        <h1>{val.title}</h1>
                        <p>{val.description}</p>
                        {/* {Stars} */}
                        <p>Category</p>
                        <ul>
                            {val.category.map((ele, ind) => (
                                <li key={ind} >{ele}</li> 
                            ))}
                        </ul>
                    </div>
                </div> 
            ))} 
             
        </>
    )
}

export default OneBook