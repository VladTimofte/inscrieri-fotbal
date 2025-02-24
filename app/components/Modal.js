import { useState } from "react";
import { useTranslation } from "../TranslationProvider"; 

export default function Modal({ onSubmit, onClose }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [days, setDays] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  function hasNameAndSurname(str) {
    return str.includes(" ");
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
            setErrorMsg(t.selectAtLeastOneDay)
        }
    } else {
        setErrorMsg(t.enterFullName)
    }
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
          {['Marti', 'Joi'].map((day) => (
            <label key={day} className="checkbox-label">
              <input
                className="checkbox-input-modal"
                type="checkbox"
                value={day}
                onChange={() => handleDayChange(day)}
              />
              {day === 'Marti' ? t.tuesday : t.thursday}
            </label>
          ))}
        </div>
        <p className="error-message">{errorMsg}</p>
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
