"use client";
import { useEffect } from "react";
import { useTranslation } from "../TranslationProvider";

export default function ConfirmModal({ isOpen, onClose, onConfirm, playerName, dayLabel }) {
  const { t } = useTranslation();

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
        <p>
          {playerName
            ? <>{t.confirmPlayerDelete} <strong>{playerName}</strong>?</>
            : <>Sigur vrei să ștergi ziua <strong>{dayLabel}</strong>?</>
          }
        </p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Nu</button>
          <button className="confirm-button" onClick={onConfirm}>Da</button>
        </div>
      </div>
    </div>
  );
}