import { useTranslation } from "../TranslationProvider";
import { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import { getUserRole } from "../context/role";

export default function Tabs({ players }) {
  const { t, language } = useTranslation();
  const [isAdmin, setIsAdmin] = useState();
  const days = ["Marti", "Joi"];

  useEffect(() => {
    setIsAdmin(getUserRole() === "admin");
  }, []);

  function handleDelete() {
    console.log("deleted");
  }

  return (
    <div>
      {days.map((day) => (
        <div key={day} className="tab-container">
          <h2 className="tab-title">
            {day === "Marti" ? t.tuesday : t.thursday}
          </h2>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t.name}</th>
                  <th>{t.registerDate}</th>
                  {isAdmin ? <th></th> : null}
                </tr>
              </thead>
              <tbody>
                {players
                  .filter((p) => p.day === day)
                  .map((p, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{p.name}</td>
                      <td>
                        {new Date(p.timestamp).toLocaleDateString(
                          `${language}-${language.toUpperCase()}`,
                          {
                            day: "numeric", // Ziua (ex: 2)
                            month: "long", // Luna complet (ex: Februarie)
                          }
                        )}{" "}
                        |{" "}
                        {new Date(p.timestamp).toLocaleTimeString(
                          `${language}-${language.toUpperCase()}`,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false, // Format 24H
                          }
                        )}
                      </td>
                      {isAdmin ? (
                        <td>
                          <DeleteButton
                            playerId={p.id}
                            playerName={p.name}
                            onDelete={handleDelete}
                          />
                        </td>
                      ) : null}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
}
