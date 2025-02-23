import { useState } from "react";

export default function Modal({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [days, setDays] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  function hasNameAndSurname(str) {
    return /^[A-Za-zĂÂÎȘȚăâîșț]+ [A-Za-zĂÂÎȘȚăâîșț]+$/.test(str);
  }

  const handleDayChange = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if(hasNameAndSurname(name)) {
        if(days?.length){
            onSubmit(name, days);
        } else {
            setErrorMsg('Te rog să selectezi măcar o zi.')
        }
    } else {
        setErrorMsg('Te rog să introduci numele tău, urmat de un spațiu și prenumele tău. Nu folosi emoji, cifre sau alte simboluri :)')
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Înscrie-te</h2>
        <input
          type="text"
          placeholder="Nume si Prenume"
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
        <p className="error-message">{errorMsg}</p>
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
