import React from "react";
import "./ReportsLayout.css";

const reports = [
  {
    id: 1,
    doctor: "Dr. John Doe",
    speciality: "Cardiology",
  },
  {
    id: 2,
    doctor: "Dr. Jane Smith",
    speciality: "Dermatology",
  },
];

const ReportsLayout = () => {
  return (
    <div className="reports-container">
      <h1>Reports</h1>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>

              <td>{report.doctor}</td>

              <td>{report.speciality}</td>

              <td>
                <a
                  href="/patient_report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="report-btn">
                    View Report
                  </button>
                </a>
              </td>

              <td>
                <a
                  href="/patient_report.pdf"
                  download="patient_report.pdf"
                >
                  <button className="report-btn">
                    Download Report
                  </button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;