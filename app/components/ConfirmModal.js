"use client";
import { useEffect } from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, playerName }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>Sigur dorești să ștergi: <strong>{playerName}</strong>?</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Nu</button>
          <button className="confirm-button" onClick={onConfirm}>Da</button>
        </div>
      </div>
    </div>
  );
}
