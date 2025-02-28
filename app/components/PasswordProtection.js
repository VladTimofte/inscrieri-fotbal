"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../TranslationProvider";

const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function PasswordProtection({ children }) {
  const { t } = useTranslation();
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user"); // 🔥 Default: Jucător

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("appPassword");
    if (storedPassword === userPassword || storedPassword === adminPassword) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = () => {
    if (!inputPassword) {
      alert(t.passwordRequired);
      return;
    }

    if (selectedRole === "user" && inputPassword === userPassword) {
      sessionStorage.setItem("appPassword", userPassword);
      sessionStorage.setItem("userRole", "user");
      setAuthorized(true);
    } else if (selectedRole === "admin" && inputPassword === adminPassword) {
      sessionStorage.setItem("appPassword", adminPassword);
      sessionStorage.setItem("userRole", "admin");
      setAuthorized(true);
    } else {
      alert(t.wrongPassword);
    }
  };

  if (!authorized) {
    return (
      <div className="password-container">
        <div className="role-buttons">
          <button
            className={selectedRole === "user" ? "active" : ""}
            onClick={() => setSelectedRole("user")}
          >
            {t.userRolePlayer}
          </button>
          <button
            className={selectedRole === "admin" ? "active" : ""}
            onClick={() => setSelectedRole("admin")}
          >
            {t.userRoleAdmin}
          </button>
        </div>

        <input
          type="password"
          placeholder={t.passwordPlaceholder}
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleSubmit}>
          {t.login}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
