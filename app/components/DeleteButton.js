"use client";
import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import ConfirmModal from "./ConfirmModal";
import Image from "next/image";

export default function DeleteButton({ player, day, onDelete, isDayDelete = false, dayLabel }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (isDayDelete) {
        await deleteDoc(doc(db, "data", day));
      } else {
        const dayRef = doc(db, "data", day);
        const snapshot = await getDoc(dayRef);
        if (!snapshot.exists()) throw new Error("Ziua nu există în Firebase");

        const dayData = snapshot.data();
        const updatedPlayers = (dayData.players || []).filter(
          (p) => p.id !== player.id
        );

        await updateDoc(dayRef, { players: updatedPlayers });
      }

      onDelete();
      setModalOpen(false);
    } catch (error) {
      console.error("Eroare la ștergere:", error);
      alert("Ceva n-a mers bine la ștergere...");
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
        playerName={isDayDelete ? null : player?.name}
        dayLabel={dayLabel}
      />
    </>
  );
}