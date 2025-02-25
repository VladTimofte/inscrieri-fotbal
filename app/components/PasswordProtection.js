"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../TranslationProvider"; 

const correctPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

export default function PasswordProtection({ children }) {
    const { t } = useTranslation();
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("appPassword");
    const hostURL = window.location.origin;
    if ((storedPassword === correctPassword) || (hostURL === 'http://localhost:3000')) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = () => {
    if (inputPassword === correctPassword) {
        sessionStorage.setItem("appPassword", correctPassword);
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
