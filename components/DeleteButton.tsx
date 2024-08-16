'use client';
import React, { useState } from 'react';
import Spin from './Spin';
import { toast } from 'react-toastify';

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
}

const DeleteButton = ({ id, onDelete }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete(id);
      toast.success('Form deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.log(`Error deleting form: ${error}`);
      toast.error('Error deleting form', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button onClick={handleDelete} className="items-center px-4 py-2 text-sm font-semibold rounded-lg border-l-2 border-t-2 border-r-4 border-b-4 border-black bg-red-600 text-white">
      {isLoading ? <Spin /> : 'Delete'}
    </button>
  );
};

export default DeleteButton;
