"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { useTranslation } from "./TranslationProvider"; 
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import Tabs from "../app/components/Tabs";
import Modal from "../app/components/Modal";
import { generateRandomId } from "./utility/strings";
import Logout from "./components/Logout";

export default function Home() {
  const { t } = useTranslation();
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPlayers = async () => {
    const q = query(collection(db, "players"));
    const querySnapshot = await getDocs(q);
    const playersData = querySnapshot.docs.map((doc) => ({
      firebaseDocID: doc.id, // 🔥 Adaugă ID-ul real al documentului din Firestore
      ...doc.data(), // Adaugă restul datelor jucătorului
    }));

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
        id: generateRandomId(),
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
      <h1 className="title">{t.title}</h1>
      <button onClick={() => setIsOpen(true)} className="sticky-button">
        {t.signup}
      </button>
      <Tabs players={players} fetchPlayers={fetchPlayers} />
      {isOpen && <Modal onSubmit={handleSignup} onClose={() => setIsOpen(false)} />}
      <Logout />
    </main>
  );
}