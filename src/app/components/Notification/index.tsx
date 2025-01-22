"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaBell, FaBellSlash } from 'react-icons/fa'; 

const Notification = () => {
    const [notificado, setNotificado] = useState(false);

    const handleNotificar = () => {
        setNotificado(!notificado);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '10px', 
            }}
        >
            <Button
                onClick={handleNotificar}
                style={{
                    cursor: 'pointer',
                    padding: '10px',
                }}
            >
                {notificado ? (
                    <FaBell color="green" size={30} />
                ) : (
                    <FaBellSlash color="gray" size={30} />
                )}
            </Button>
        </div>
        

    );
};

export default Notification;