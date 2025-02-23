import { useState } from "react";

export default function Modal({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [days, setDays] = useState([]);

  const handleDayChange = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (name && days.length) {
      onSubmit(name, days);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Înscrie-te</h2>
        <input
          type="text"
          placeholder="Numele tău"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <div>
          {["Marti", "Joi"].map((day) => (
            <label key={day} className="checkbox-label">
              <input
                className="checkbox-input-modal"
                type="checkbox"
                value={day}
                onChange={() => handleDayChange(day)}
              />
              {day}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Anulează
          </button>
          <button onClick={handleSubmit} className="submit-button">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
