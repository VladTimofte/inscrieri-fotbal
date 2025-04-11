"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { useTranslation } from "./TranslationProvider";
import {
  collection,
  getDoc,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Tabs from "../app/components/Tabs";
import { generateRandomId } from "./utility/strings";
import Logout from "./components/Logout";
import OrganizeFootballModal from "./components/OrganizeFootballModal";
import { getUserRole } from "./context/role";
import SignInModal from "./components/SignInModal";

export default function Home() {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isOrganizeListModalOpen, setIsOrganizeListModalOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(getUserRole() === "admin");
    console.log("getUserRole()", getUserRole());
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "data"));
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        firebaseDocID: doc.id,
        ...doc.data(),
      }));

      // Sortează datele cronologic după "date"
      const sorted = fetchedData.sort((a, b) => a.date.localeCompare(b.date));

      setData(sorted);
    } catch (error) {
      console.error("Eroare la fetchData:", error);
    }
  };

  const handleSignup = async (name, days) => {
    const timestamp = Date.now();

    for (const day of days) {
      const dayRef = doc(db, "data", day);
      const snapshot = await getDoc(dayRef);

      if (!snapshot.exists()) {
        console.error(`Ziua ${day} nu există în Firestore.`);
        continue;
      }

      const existingData = snapshot.data();
      const updatedPlayers = [
        ...(existingData.players || []),
        {
          id: generateRandomId(),
          name,
          timestamp,
        },
      ];

      await updateDoc(dayRef, { players: updatedPlayers });
    }

    fetchData();
    setIsSignInModalOpen(false);
  };

  const handleResetAndCreateList = async (data) => {
    debugger
    try {

      for (const item of data) {
        await setDoc(doc(db, "data", item.date), item);
      }

      console.log("Salvat cu succes.");
      fetchData();
      setIsOrganizeListModalOpen(false);
    } catch (error) {
      console.error("Eroare la salvare:", error);
      alert("A apărut o eroare la salvare. Încearcă din nou.");
    }
  };

  return (
    <main className="container">
      <div>
        {data?.length ? (
          <>
            <h1 className="title">{t.title}</h1>
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="sticky-button"
            >
              {t.signup}
            </button>
          </>
        ) : (
          <h3>{t.noEvents}</h3>
        )}
        <Tabs isAdmin={isAdmin} data={data} fetchData={fetchData} />
        {isSignInModalOpen && (
          <SignInModal
            data={data}
            onSubmit={handleSignup}
            onClose={() => setIsSignInModalOpen(false)}
          />
        )}
      </div>
      <OrganizeFootballModal
        isAdmin={isAdmin}
        onSave={handleResetAndCreateList}
        isOrganizeListModalOpen={isOrganizeListModalOpen}
        setIsOrganizeListModalOpen={setIsOrganizeListModalOpen}
      />
      <Logout />
    </main>
  );
}
