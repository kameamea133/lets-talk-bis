import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, query, onSnapshot, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../db/firebaseConfig';
import useClientAuth from '../hooks/useClientAuth';
import { MdDelete } from 'react-icons/md';

interface Message {
    id: string;
    name: string;
    text: string;
    avatar: string;
    userId: string; // Assurez-vous d'inclure cette propriété
    imageUrl?: string;
    createdAt: Date;
}

export default function ChatContainer() {
    const [data, setData] = useState<Message[]>([]);
    const { user } = useClientAuth();
    console.log(user);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages: Message[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Message data:', data);
                messages.push({
                    id: doc.id,
                    name: data.name,
                    text: data.text,
                    avatar: data.avatar,
                    userId: data.userId, 
                    imageUrl: data.imageUrl,
                    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                });
            });
            setData(messages);
        }, (error) => {
            console.error('Error fetching messages:', error);
        });
        return () => unsubscribe();
    }, []);
    console.log(data);

    const handleDeleteMessage = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'messages', id));
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    return (
        <div className='max-w-[90vw] h-[80vh] m-auto rounded-md bg-[rgba(17,25,40,0.75)] bg-opacity-75'>
            <ul className='flex flex-col gap-3 p-10 pb-[150px] mt-5'>
                {data.map((msg, index) => (
                    <li key={index} className={`relative flex items-center p-5 max-w-xs rounded-lg ${msg.userId === user?.uid ? 'self-end rounded-br-none bg-blue-300 text-blue-900' : 'self-start rounded-bl-none bg-gray-300 text-gray-900'}`}>
                        <Image src={msg.avatar} alt="user icon" width={50} height={50} className='rounded-full mr-3' />
                        <div>
                            <p className='font-bold'>{msg.name}</p>
                            <p>{msg.text}</p>
                            {msg.imageUrl && <img src={msg.imageUrl} alt="uploaded" className='mt-2 rounded' style={{ maxWidth: '100px' }} />}
                            <span className='text-xs text-gray-600'>{msg.createdAt.toLocaleString()}</span>
                        </div>
                        {msg.userId === user?.uid && (
                            <button onClick={() => handleDeleteMessage(msg.id)} className='absolute top-1 right-1 text-white '>
                                <MdDelete size={20} />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
