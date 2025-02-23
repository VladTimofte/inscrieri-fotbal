export default function Tabs({ players }) {
  const days = ["Marti", "Joi"];

  function test() {
    console.log(players);
  }

  test();

  return (
    <div>
      {days.map((day) => (
        <div key={day} className="tab-container">
          <h2 className="tab-title">{day}</h2>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nume</th>
                  <th>Data când te-ai înscris</th>
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
                        {new Date(p.timestamp).toLocaleDateString("ro-RO", {
                          day: "numeric", // Ziua (ex: 2)
                          month: "long", // Luna complet (ex: Februarie)
                        })}{" "}
                        |{" "}
                        {new Date(p.timestamp).toLocaleTimeString("ro-RO", {
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
