import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import NoImage from '/no-image-selected.jpg'


const EditBook = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [stars, setStars] = useState(0);
    const [thumbnail, setThumbnail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [image, setImage] = useState("");
    const [bookId, setBookId] = useState(null);


    const { slugURL } = useParams();
    const baseURL = `http://localhost:3000/api/books/${slugURL}`;

    const createBook = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bookId', bookId);
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stars', stars);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }


        try {
            const response = await fetch('http://localhost:3000/api/books', {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                setTitle("");
                setSlug("");
                setDescription("");
                setCategory("");
                setStars(0);
                // setThumbnail(null);
                setSubmitted(true);
                alert("Book created successfully");
                console.log("Book reated successfully");
            }
        } catch (err) {
            console.error(err);
        }
    }


    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    }

    const handleCategory = (e) => {
        setCategory(e.target.value.split(',').map(cat => cat.trim()));
    }


    const fetchDataToEdit = async () => {
        try {
            const response = await fetch(baseURL);
            if (!response) {
                throw new Error("Failed to fetch data");
            }
            const responseJsonData = await response.json();

            {
                responseJsonData.map(val => (
                    setTitle(val.title),
                    setSlug(val.slug),
                    setDescription(val.description),
                    setCategory(val.category),
                    setStars(val.stars),
                    setThumbnail(val.thumbnail),
                    setBookId(val._id)
                ))
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }

    useEffect(() => {
        fetchDataToEdit();
    }, []);


    const removeBook= async(e)=>{
        try {
            e.preventDefault();
            const book= await fetch(`http://localhost:3000/api/books/${bookId}`, {
                method:'DELETE'
            });
            if(book.ok){
                alert("Book deleted successfully");
                window.location.href="/books";
            }
        } catch (err) {
            console.error("Error deleting book:", err);
        }
    }


    return (
        <>
            <Link to={'/books'}>👈Back to Books</Link>

            <h1>Edit Book</h1>

            <button className='delete' onClick={removeBook}>
                Delete Book
            </button>

            <p>Here You can Edit book details</p>

            {submitted ? (
                <h2>Book updated successfully!</h2>
            ) : (
                <form action="" className="bookdetails" onSubmit={createBook}>
                    <div className='col-1'>
                        <label htmlFor="">Upload Thumbnail</label>
                        {/* <img src={image || NoImage} alt="Image preview" /> */}
                        {image ? (
                            <img src={`${image}`} alt="preview image" />
                        ) : (
                            <img
                                src={`http://localhost:3000/uploads/${thumbnail}`}
                                alt="preview image"
                            />
                        )}
                        <input
                            type="file"
                            accept='image/gif, image/jpg, image/jpeg, image/png'
                            name='thumbnail'
                            onChange={handleImage}
                        />


                    </div>


                    <div className='col-2'>
                        <div>
                            <label htmlFor="">Title</label>
                            <input type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Slug</label>
                            <input type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <input type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Category</label>
                            <input type="text"
                                value={category}
                                onChange={handleCategory} />
                        </div>
                        <div>
                            <label htmlFor="">Stars</label>
                            <input type="text"
                                value={stars}
                                onChange={(e) => setStars(e.target.value)} />
                        </div>

                        <div>
                            <input type="submit" value="Add Book" />
                        </div>


                    </div>
                </form>
            )}




        </>
    )
}

export default EditBook