"use client";
import { useState } from "react";
import { useTranslation } from "../TranslationProvider";

export default function SignInModal({ onSubmit, onClose, data }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Nume și prenume trebuie să fie ambele prezente
  function hasNameAndSurname(str) {
    const parts = str.trim().split(" ");
    return parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0;
  }

  const handleDayToggle = (day) => {
    setSelectedDates((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (!hasNameAndSurname(name)) {
      setErrorMsg("Te rugăm să introduci numele complet (nume și prenume).");
      return;
    }

    if (selectedDates.length === 0) {
      setErrorMsg("Selectează cel puțin o zi pentru a te înscrie.");
      return;
    }

    // Trimitem datele către componenta părinte
    onSubmit(name.trim(), selectedDates);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{t.signup}</h2>

        <input
          type="text"
          placeholder={t.fullName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <div>
          {data
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((day) => (
              <label key={day.date} className="checkbox-label">
                <input
                  className="checkbox-input-modal"
                  type="checkbox"
                  value={day.date}
                  onChange={() => handleDayToggle(day.date)}
                />
                {new Date(day.date).toLocaleDateString("ro-RO", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </label>
            ))}
        </div>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            {t.cancel}
          </button>
          <button onClick={handleSubmit} className="submit-button">
            {t.ok}
          </button>
        </div>
      </div>
    </div>
  );
}
