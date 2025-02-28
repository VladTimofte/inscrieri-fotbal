"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../TranslationProvider";

const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function PasswordProtection({ children }) {
  const { t } = useTranslation();
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("appPassword");
    // const hostURL = window.location.origin;
    if (storedPassword === userPassword) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = () => {
    if (inputPassword === userPassword) {
      sessionStorage.setItem("appPassword", userPassword);
      sessionStorage.setItem("userRole", "user");
      setAuthorized(true);
    } else if (inputPassword === adminPassword) {
      sessionStorage.setItem("appPassword", userPassword);
      sessionStorage.setItem("userRole", "admin");
      setAuthorized(true);
    } else {
      alert(t.wrongPassword);
    }
  };

  if (!authorized) {
    return (
      <div className="password-container">
        <input
          type="password"
          placeholder={t.passwordPlaceholder}
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>{t.login}</button>
      </div>
    );
  }

  return <>{children}</>;
}
