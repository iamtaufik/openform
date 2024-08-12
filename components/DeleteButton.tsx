'use client';
import React from 'react';

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
}

const DeleteButton = ({ id, onDelete }: DeleteButtonProps) => {
  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.log(`Error deleting form: ${error}`);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="items-center px-4 py-2 text-sm font-semibold rounded-lg border-l-2 border-t-2 border-r-4 border-b-4 border-black bg-red-600 text-white"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
