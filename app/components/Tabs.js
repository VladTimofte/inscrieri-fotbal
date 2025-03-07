import { useTranslation } from "../TranslationProvider";
import { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import { getUserRole } from "../context/role";

export default function Tabs({ players, fetchPlayers }) {
  const { t, language } = useTranslation();
  const [isAdmin, setIsAdmin] = useState();
  const days = ["Marti", "Joi"];

  useEffect(() => {
    setIsAdmin(getUserRole() === "admin");
  }, []);

  return (
    <div>
      {days.map((day) => (
        <div key={day} className="tab-container">
          {day === "Marti" ? (
            <>
              <h2 className="tab-title">{t.tuesday}</h2>
              <h3>{t.tuesdayDetails}</h3>
            </>
          ) : (
            <>
              <h2 className="tab-title">{t.thursday}</h2>
              <h3>{t.thursdayDetails}</h3>
            </>
          )}
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
                    <tr
                    className={`${index + 1 > 12 ? "substitute-playet-row" : ""}`}
                      key={index}
                    >
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
                          <DeleteButton player={p} onDelete={fetchPlayers} />
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
