"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUserRole } from "../context/role";

export default function Logout() {
  const [isUserLoggedIN, setIsUserLoggedIN] = useState();

  useEffect(() => {
    setIsUserLoggedIN(getUserRole()?.length || false);
  }, []);

  function logout() {
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("appPassword");
    window.location.reload();
  }

  return (
    <>
      {isUserLoggedIN ? (
        <div className="exit-icon-wrapper" onClick={logout}>
          <Image width={32} height={32} src="/exit.png" alt="Exit" />
        </div>
      ) : null}
    </>
  );
}
