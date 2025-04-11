import { useTranslation } from "../TranslationProvider";
import DeleteButton from "./DeleteButton";

export default function Tabs({ isAdmin, data, fetchData }) {
  const { t, language } = useTranslation();
  const sortedDays = [...data].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      {sortedDays.map((dayData) => {
        const players = [...(dayData.players || [])].sort(
          (a, b) => a.timestamp - b.timestamp
        );

        const dayLabel =
          new Date(dayData.date).toLocaleDateString(
            `${language}-${language.toUpperCase()}`,
            {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          ) +
          " | " +
          dayData.time;

        return (
          <div key={dayData.date} className="tab-container">
            <div className="tabs-title-wrapper">
              {isAdmin && (
                <DeleteButton
                  isDayDelete
                  day={dayData.date}
                  onDelete={fetchData}
                  dayLabel={dayLabel}
                />
              )}
              <h2 className="tab-title">{dayLabel}</h2>
            </div>

            <h3>{dayData.location}</h3>
            <h4 className="max-players">Max jucători: {dayData.maxPlayers}</h4>

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
                  {players.map((p, index) => (
                    <tr
                      key={index}
                      className={`${
                        index + 1 > dayData.maxPlayers
                          ? "substitute-playet-row"
                          : ""
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>{p.name}</td>
                      <td>
                        {new Date(p.timestamp).toLocaleDateString(
                          `${language}-${language.toUpperCase()}`,
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}{" "}
                        |{" "}
                        {new Date(p.timestamp).toLocaleTimeString(
                          `${language}-${language.toUpperCase()}`,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          }
                        )}
                      </td>
                      {isAdmin ? (
                        <td>
                          <DeleteButton
                            player={p}
                            day={dayData.date}
                            onDelete={fetchData}
                          />
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}
