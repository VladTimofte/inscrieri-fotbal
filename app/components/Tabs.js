import { useTranslation } from "../TranslationProvider"; 

export default function Tabs({ players }) {
  const { t, language } = useTranslation();
  const days = ["Marti", "Joi"];



  return (
    <div>
      {days.map((day) => (
        <div key={day} className="tab-container">
          <h2 className="tab-title">{day === 'Marti' ? t.tuesday : t.thursday}</h2>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t.name}</th>
                  <th>{t.registerDate}</th>
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
                        {new Date(p.timestamp).toLocaleDateString(`${language}-${language.toUpperCase()}`, {
                          day: "numeric", // Ziua (ex: 2)
                          month: "long", // Luna complet (ex: Februarie)
                        })}{" "}
                        |{" "}
                        {new Date(p.timestamp).toLocaleTimeString(`${language}-${language.toUpperCase()}`, {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false, // Format 24H
                        })}
                      </td>
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
