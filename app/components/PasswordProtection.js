"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../TranslationProvider";

const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function PasswordProtection({ children }) {
  const { t } = useTranslation();
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [quickAccessAvailable, setQuickAccessAvailable] = useState(false);

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("appPassword");
    if (storedPassword === userPassword || storedPassword === adminPassword) {
      setAuthorized(true);
    }

    checkQuickAccess();
  }, [selectedRole]);

  const checkQuickAccess = () => {
    const key = selectedRole === "user" ? "lastLoginUser" : "lastLoginAdmin";
    const lastLogin = localStorage.getItem(key);
    if (lastLogin) {
      const timeDiff = Date.now() - parseInt(lastLogin, 10);
      if (timeDiff <= THIRTY_DAYS_MS) {
        setQuickAccessAvailable(true);
        return;
      }
    }
    setQuickAccessAvailable(false);
  };

  const handleInput = (e) => {
    if (e?.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!inputPassword) {
      alert(t.passwordRequired);
      return;
    }

    if (selectedRole === "user" && inputPassword === userPassword) {
      sessionStorage.setItem("appPassword", userPassword);
      sessionStorage.setItem("userRole", "user");
      localStorage.setItem("lastLoginUser", Date.now().toString());
      setAuthorized(true);
    } else if (selectedRole === "admin" && inputPassword === adminPassword) {
      sessionStorage.setItem("appPassword", adminPassword);
      sessionStorage.setItem("userRole", "admin");
      localStorage.setItem("lastLoginAdmin", Date.now().toString());
      setAuthorized(true);
    } else {
      alert(t.wrongPassword);
    }
  };

  const handleQuickAccess = () => {
    if (selectedRole === "user") {
      sessionStorage.setItem("appPassword", userPassword);
      sessionStorage.setItem("userRole", "user");
    } else {
      sessionStorage.setItem("appPassword", adminPassword);
      sessionStorage.setItem("userRole", "admin");
    }
    setAuthorized(true);
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

        {!quickAccessAvailable ? (
          <>
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyDown={handleInput}
            />
            <button className="login-btn" onClick={handleSubmit}>
              {t.login}
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={handleQuickAccess}>
            {t.quickAccess}
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
