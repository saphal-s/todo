import React, { useState } from "react";
import "./style.css";
import Table from "react-bootstrap/Table";
import moment from "moment";

const CompletedTask = ({ completedTask }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="container">
        <h3 className="pt-5 pb-2 text-white">All Completed Tasks</h3>
        <div className="all-task">
          {loading ? (
            <div>Loading</div>
          ) : (
            <div>
              <Table striped>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Day</th>
                    <th>Title</th>
                    <th>Complition Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTask &&
                    completedTask.map((t, i) => (
                      <tr key={t._id}>
                        <td>{i + 1}</td>
                        <td>{moment(t.completionDate).format("YYYY-MM-DD")}</td>
                        <td>{t.title}</td>
                        <td>{t.completed === true ? <>True</> : <>False</>}</td>
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

export default CompletedTask;
