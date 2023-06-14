import React, { useState } from "react";
import "./style.css";
import Table from "react-bootstrap/Table";

const ComplitionRate = ({ complitionRate }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="container">
        <h3 className="pt-5 pb-2 text-white">Completion Rate Per Day</h3>
        <div className="all-task">
          {loading ? (
            <div>Loading</div>
          ) : (
            <div>
              <Table striped>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Complition Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {complitionRate &&
                    complitionRate.map((t, i) => (
                      <tr key={i}>
                        <td>{t._id}</td>
                        <td>{(t.completionRate * 100).toFixed(2)}%</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplitionRate;
