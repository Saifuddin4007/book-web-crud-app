import React, { useState } from 'react'
import NoImage from '/no-image-selected.jpg'
import { Link } from 'react-router-dom'

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [stars, setStars] = useState(0);
    const [thumbnail, setThumbnail]= useState(null);
    const [submitted, setSubmitted]= useState(false);
    const [image, setImage]= useState(null);


    const createBook= async (e)=>{
        e.preventDefault();

        const formData= new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stars', stars);
        formData.append('thumbnail', thumbnail);


        try{
            const response= await fetch('http://localhost:3000/api/books', {
                method:'POST',
                body: formData
            });

            if(response.ok){
                setTitle("");
                setSlug("");
                setDescription("");
                setCategory("");
                setStars(0);
                setThumbnail(null);
                setSubmitted(true);
                alert("Book created successfully");
                console.log("Book reated successfully");
            }
        }catch(err){
            console.error(err);
        }
    }


    const handleImage=(e)=>{
        if(e.target.files && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    }

    const handleCategory= (e)=>{
        setCategory(e.target.value.split(',').map(cat => cat.trim()));
    }
   


    return (
        <>
            <Link to={'/books'}>👈Back to Books</Link>

            <h1>Create Book</h1>

            <p>Here You can donate books for your readers for free</p>

            {submitted?(
                <h2>Book created successfully!</h2>
            ):(
                <form action="" className="bookdetails" onSubmit={createBook}>
                <div className='col-1'>
                    <label htmlFor="">Upload Thumbnail</label>
                    <img src={image || NoImage} alt="Image preview" />
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
                        onChange={() => setCategory(handleCategory)} />
                    </div>
                    <div>
                        <label htmlFor="">Stars</label>
                        <input type="text" 
                        value={stars} 
                        onChange={(e) => setStars(e.target.value)} />
                    </div>
                    
                    <div>
                        <input type="submit" value="Create Book" />
                    </div>


                </div>
            </form>
            )}

            


        </>
    )
}

export default CreateBook