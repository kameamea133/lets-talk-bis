import React, { useState, ChangeEvent, FormEvent } from 'react';
import useClientAuth from '../hooks/useClientAuth';
import { db, storage } from '../db/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { IoSend } from 'react-icons/io5';
import { BsFileImage } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

export default function SendMessage() {
    const [value, setValue] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { user } = useClientAuth();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (user) {
                const { uid, displayName, photoURL } = user;
                let imageUrl = '';

                if (image) {
                    const imageRef = ref(storage, `images/${image.name}`);
                    const snapshot = await uploadBytes(imageRef, image);
                    imageUrl = await getDownloadURL(snapshot.ref);
                }

                await addDoc(collection(db, 'messages'), {
                    text: value,
                    userId: uid, // Enregistrer l'ID de l'utilisateur ici
                    name: displayName,
                    avatar: photoURL,
                    imageUrl: imageUrl,
                    createdAt: serverTimestamp()
                });
            }
        } catch (err) {
            console.log(err);
        }
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
                <input value={value} onChange={handleChange} placeholder='Votre message...' type="text" className='p-3 w-full outline-none border-none' />
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
