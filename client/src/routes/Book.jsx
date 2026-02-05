import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Book = () => {

    //!Fetch Data from backend and display list of books
    const baseURL = "http://localhost:3000/api/books";

    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory]= useState("");

    useEffect(() => {
        const fetchBooks = async () => {

            try {
                let url= baseURL;
                if(category){
                    url+=`?category=${category}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const responseJsonData = await response.json();
                setBookData(responseJsonData);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Fetching data failed. Please try again later.");
                setIsLoading(false);
            }
        }

        fetchBooks();
    }, [category]);




    return (
        <>
            <h1>Books</h1>

            <div className='filters'>
                <label> Categories </label>
                <select onChange={(e)=>setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="romance">Romance</option>
                <option value="food">Food</option>
                <option value="thriller">Thriller</option>
                <option value="fiction">Fiction</option>
                <option value="crime">Crime</option>
                <option value="adventure">Adventure</option>
                <option value="science">Science</option>
                <option value="other">Other</option>
            </select>
            </div>

            {isLoading ? (
                <h2>Loading.....</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <ul className='books'>
                    {bookData.map((book) => {
                        return (
                            <li key={book._id}>

                                <Link to={`/books/${book.slug}`}>
                                    <img src={`http://localhost:3000/uploads/${book.thumbnail}`} alt={`book.title`} />
                                </Link>
                                <h2>{book.title}</h2>

                            </li>
                        )
                    })}

                </ul>
            )}

        </>
    )
}

export default Book