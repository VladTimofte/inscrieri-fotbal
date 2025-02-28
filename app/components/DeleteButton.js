"use client";
import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import ConfirmModal from "./ConfirmModal";
import Image from "next/image";

export default function DeleteButton({ player, onDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "players", player.firebaseDocID));
      onDelete(player.id); // Actualizează tabelul în frontend
      setModalOpen(false);
    } catch (error) {
      console.error("Eroare la ștergere:", error);
      alert('Something went wrong...')
    }
  };

  return (
    <>
      <button className="delete-button" onClick={() => setModalOpen(true)}>
        <Image width={32} height={32} src="/delete.png" alt="Delete" />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        playerName={player?.name}
      />
    </>
  );
}
