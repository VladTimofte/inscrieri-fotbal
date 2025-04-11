"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ro from "date-fns/locale/ro";
import enUS from "date-fns/locale/en-US";
import "react-datepicker/dist/react-datepicker.css";
import { generateRandomId } from "../utility/strings";
import { useTranslation } from "../TranslationProvider";

export default function OrganizeFootballModal({
  isAdmin,
  onSave,
  isOrganizeListModalOpen,
  setIsOrganizeListModalOpen,
}) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [daysData, setDaysData] = useState({});
  const [errors, setErrors] = useState([]);
  const { t, language } = useTranslation();

  useEffect(() => {
    if (language === "ro") {
      registerLocale("ro", ro);
    }
    if (language === "en") {
      registerLocale("en", enUS);
    }
  }, [language]);

  const handleDateChange = (date) => {
    if (!date) return;
    const formatted = new Intl.DateTimeFormat(
      `${language}-${language.toUpperCase()}`,
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    ).format(new Date());
    const alreadyExists = selectedDates.find(
      (d) => d.toDateString() === formatted
    );
    if (!alreadyExists) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleRemoveDate = (index) => {
    const newDates = [...selectedDates];
    const removed = newDates.splice(index, 1)[0];
    setSelectedDates(newDates);
    const updatedData = { ...daysData };
    delete updatedData[removed.toDateString()];
    setDaysData(updatedData);
  };

  const handleFieldChange = (dateKey, field, value) => {
    setDaysData((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [field]: value,
      },
    }));
  };

  const validate = () => {
    const newErrors = [];
    setErrors(newErrors);
    if (selectedDates.length === 0) newErrors.push(t.selectAtLeastOneDay);
    selectedDates.forEach((date) => {
      const key = date.toDateString();
      const data = daysData[key] || {};
      const label = date.toLocaleDateString(
        `${language}-${language.toUpperCase()}`,
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );

      if (!data.time) newErrors.push(`${t.timeRequired} ${label}.`);
      if (!data.maxPlayers) newErrors.push(`${t.maxPlayersRequired} ${label}.`);
      if (!data.location) newErrors.push(`${t.locationRequired} ${label}.`);
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const saveData = selectedDates.map((date) => ({
      id: generateRandomId(),
      players: [],
      date: date.toLocaleDateString('en-CA'), // Do Not Change. It's the data format, no need translation!
      ...daysData[date.toDateString()],
    }));
    onSave(saveData);
  };

  return (
    <>
      {isAdmin && (
        <div
          className="reset-renew-icon-wrapper"
          onClick={() => {
            setErrors([]);
            setIsOrganizeListModalOpen(true);
          }}
        >
          <Image width={32} height={32} src="/add.png" alt="Add" />
        </div>
      )}
      {isOrganizeListModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2>{t.createNewLists}</h2>

            <label>{t.addDays}</label>
            <div className="react-date-picker-wrapper">
              <DatePicker
                locale={language}
                selected={null}
                onChange={handleDateChange}
                inline
                minDate={new Date()}
                calendarStartDay={1}
              />
            </div>

            <ul>
              {selectedDates.map((date, index) => (
                <div key={index}>
                  <br />
                  <br />
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>
                      {date.toLocaleDateString(
                        `${language}-${language.toUpperCase()}`,
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </strong>
                    <hr />
                    <br />
                    <label>{t.time}:</label>
                    <br />
                    <DatePicker
                      locale={language}
                      selected={
                        daysData[date.toDateString()]?.time
                          ? new Date(
                              `1970-01-01T${daysData[date.toDateString()].time}`
                            )
                          : null
                      }
                      onChange={(val) => {
                        const formattedTime = val.toLocaleTimeString(
                          `${language}-${language.toUpperCase()}`,
                          {
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        );
                        handleFieldChange(
                          date.toDateString(),
                          "time",
                          formattedTime
                        );
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption={t.time}
                      dateFormat="HH:mm"
                      timeFormat="HH:mm"
                    />
                    <br />
                    {t.maxPlayers}:{" "}
                    <input
                      type="number"
                      lang={`${language}-${language.toUpperCase()}`}
                      min={1}
                      value={daysData[date.toDateString()]?.maxPlayers || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          date.toDateString(),
                          "maxPlayers",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <br />
                    {t.location}:{" "}
                    <input
                      type="text"
                      value={daysData[date.toDateString()]?.location || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          date.toDateString(),
                          "location",
                          e.target.value
                        )
                      }
                    />
                    <br />
                    <button
                      onClick={() => handleRemoveDate(index)}
                      style={{ marginTop: "5px" }}
                    >
                      {t.deleteDay}
                    </button>
                  </li>
                  <br />
                  <br />
                </div>
              ))}
            </ul>

            {errors.length > 0 && (
              <div className="error-message">
                {errors.map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setIsOrganizeListModalOpen(false)}
              >
                {t.cancel}
              </button>
              <button className="confirm-button" onClick={handleSave}>
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
