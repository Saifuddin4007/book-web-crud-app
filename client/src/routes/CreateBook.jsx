import React, { useState } from 'react'
import NoImage from '/no-image-selected.jpg'

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stars, setStars] = useState(0);
   


    return (
        <>
            <h1>Create Book</h1>

            <p>Here You can donate books for your readers for free</p>

            <form action="" className="bookdetails">
                <div className='col-1'>
                    <label htmlFor="">Upload Thumbnail</label>
                    <img src={NoImage} alt="No-Image-Selected" />
                    <input type="file" accept='image/gif, image/jpg, image/jpeg, image/png' />


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
                        onChange={(e) => setCategory(e.target.value)} />
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


        </>
    )
}

export default CreateBook