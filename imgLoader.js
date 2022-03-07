import React, { useState } from "react"
import Axios from "axios"
import './img-uploader.css'
import axios from "axios"
function ImgUploader() {

    const [imageSelected, setImageSelected] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const uploadImage = (files) => {

        console.log('result', files[0])
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD)
        // on upload l'image
        Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER}/image/upload`, formData).then(result => {
            console.log(result.data.secure_url)
            // on recupere l'url de l'image uploader
            setImgUrl(result.data.secure_url)
            //TODO: store {imgUrl} in db here
            axios.post('/rando/id',)
        })
    }
    return (
        <div className="img__uploader">
            <div>
                <input type="file" onChange={(e) => setImageSelected(e.target.files[0])} />
                <button type='submit' onClick={uploadImage}>Envoyer</button>
            </div>
            <div className="img__container">
                <img src={imgUrl} />
                <div>URL de l'image = {imgUrl}</div>
            </div>
        </div>
    );
}

export default ImgUploader;