"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import Tabs from "../app/components/Tabs";
import Modal from "../app/components/Modal";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPlayers = async () => {
    const q = query(collection(db, "players"));
    const querySnapshot = await getDocs(q);
    const playersData = querySnapshot.docs.map((doc) => doc.data());

    // Sortează jucătorii separat pentru fiecare zi, folosind timestamp-ul în format epoch
    const sortedPlayers = playersData.sort((a, b) => a.timestamp - b.timestamp);
    setPlayers(sortedPlayers);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSignup = async (name, days) => {
    const timestamp = Date.now(); // Epoch time

    for (const day of days) {
      await addDoc(collection(db, "players"), {
        name,
        day,
        timestamp,
      });
    }

    fetchPlayers();
    setIsOpen(false);
  };

  return (
    <main className="container">
      <h1 className="title">Înscriere Fotbal</h1>
      <button onClick={() => setIsOpen(true)} className="signup-button sticky-button">
        Înscrie-te
      </button>
      <Tabs players={players} />
      {isOpen && <Modal onSubmit={handleSignup} onClose={() => setIsOpen(false)} />}
    </main>
  );
}