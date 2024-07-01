import React, { useState, ChangeEvent, FormEvent } from 'react';
import useClientAuth from '../hooks/useClientAuth';
import { db, storage } from '../db/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { IoSend } from 'react-icons/io5';
import { BsFileImage } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

export default function SendMessage() {

    // State to hold the message text
    const [value, setValue] = useState('');

    // State to hold the selected image file
    const [image, setImage] = useState<File | null>(null);

    // State to hold the image preview URL
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Get the authenticated user
    const { user } = useClientAuth();


    // Handle image file selection
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(file));
        }
    };


    // Handle message text change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
    };


   // Handle removing the selected image
    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
    };


    
     // Handle form submission to send the message
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (user) {
                const { uid, displayName, photoURL } = user;
                let imageUrl = '';


                // If an image is selected, upload it to Firebase Storage
                if (image) {
                    const imageRef = ref(storage, `images/${image.name}`);
                    const snapshot = await uploadBytes(imageRef, image);
                    imageUrl = await getDownloadURL(snapshot.ref);
                }

                 // Add the message to Firestore
                await addDoc(collection(db, 'messages'), {
                    text: value,
                    userId: uid,
                    name: displayName,
                    avatar: photoURL,
                    imageUrl: imageUrl,
                    createdAt: serverTimestamp()
                });
            }
        } catch (err) {
            console.log(err);
        }

        // Reset the form
        setValue('');
        setImage(null);
        setImagePreview(null);
    };

    return (
        <form onSubmit={handleSubmit} className='bg-[rgba(17,25,40,0.25)] bg-opacity-75 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[90vw] py-7 flex items-center justify-center px-3 rounded-md mb-5'>
            <div className='w-full flex items-center justify-center px-3'>
                <input type="file" onChange={handleImageChange} className='hidden' id='imageUpload' />
                <label htmlFor='imageUpload' className='cursor-pointer p-3 bg-gray-300 rounded-l-md'>
                    <BsFileImage size={24} />
                </label>
                <input value={value} onChange={handleChange} placeholder='Votre message...' type="text" className='p-3 w-full outline-none border-none text-black' />
                <button type="submit" className="bg-blue-300 text-white p-3 flex items-center gap-2 border-none rounded-r-md hover:bg-blue-400">
                    <IoSend />
                    <span>Envoyer</span>
                </button>
            </div>
            {imagePreview && (
                <div className='mt-2 flex items-center'>
                    <img src={imagePreview} alt="Prévisualisation" className='rounded' style={{ maxWidth: '200px' }} />
                    <button onClick={handleRemoveImage} className='ml-2 text-red-500'>
                        <MdCancel size={24} />
                    </button>
                </div>
            )}
        </form>
    );
}
