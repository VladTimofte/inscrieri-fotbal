"use client";
import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import ConfirmModal from "./ConfirmModal";

export default function DeleteButton({ playerId, playerName, onDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    debugger
    console.log(playerId)
    try {
      await deleteDoc(doc(db, "players", playerId));
      onDelete(playerId); // Actualizează tabelul în frontend
      setModalOpen(false);
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  return (
    <>
      <button className="delete-button" onClick={() => setModalOpen(true)}>🗑️</button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        playerName={playerName}
      />
    </>
  );
}
