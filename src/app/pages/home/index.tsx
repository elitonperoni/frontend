"use client";

import { useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

interface ObjetoJson {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: 'auto',
  right: '0',
  transform: 'translateY(-50%)',
  width: 400,
  maxHeight: '100vh', 
  overflowY: 'auto', 
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const GridContainer = styled('div')({
  display: 'grid',
  gap: '16px',
});

export default function Home() {
  const [posts, setPosts] = useState<ObjetoJson[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=1');
      setPosts(response.data); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleNotification = () => {
    setIsOpen(true);
    getPosts();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button onClick={handleNotification}>
        <FaBell color="green" size={30} />
        </button>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            X
          </IconButton>
          <Typography variant="h6" component="h2">Notificações</Typography>
          <GridContainer>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Box key={post.id} className="bg-white p-4 border rounded-lg shadow-md">                  
                  <Typography variant="h6" component="label" className="font-bold text-xl mb-2">{post.title}</Typography>                  
                  <Typography variant="body2" component="p" className="text-gray-700">{post.body}</Typography>
                </Box>
              ))
            ) : (
             <label htmlFor="">Carregando...</label>
            )}
          </GridContainer>
        </Box>
      </Modal>
    </div>
  );
}
