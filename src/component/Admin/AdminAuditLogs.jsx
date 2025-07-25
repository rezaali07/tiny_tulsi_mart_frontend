// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminAuditLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 20; // logs per page

//   useEffect(() => {
//     let isMounted = true;

//     const fetchLogs = async (pageNumber = 1) => {
//       try {
//         const { data } = await axios.get(
//           `/api/v2/admin/audit-logs?page=${pageNumber}&limit=${limit}`,
//           {
//             withCredentials: true,
//           }
//         );
//         if (isMounted && data.success) {
//           setLogs(data.logs);
//           setPage(data.page);
//           setTotalPages(data.totalPages);
//         }
//       } catch (error) {
//         if (isMounted) {
//           console.error("Error fetching logs", error);
//         }
//       }
//     };

//     fetchLogs(page);

//     return () => {
//       isMounted = false; // Cleanup to avoid state updates on unmounted component
//     };
//   }, [page]);

//   return (
//     <div>
//       <h2>Audit Logs</h2>
//       <table border="1" cellPadding="10" cellSpacing="0" width="100%">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Email</th>
//             <th>Action</th>
//             <th>Details</th>
//             <th>IP</th>
//             <th>User Agent</th>
//             <th>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.length === 0 && (
//             <tr>
//               <td colSpan="7">No logs found</td>
//             </tr>
//           )}
//           {logs.map((log, i) => (
//             <tr key={i}>
//               <td>{log.user?.name || "Unknown"}</td>
//               <td>{log.user?.email || "Unknown"}</td>
//               <td>{log.action || "N/A"}</td>
//               <td>{log.details || ""}</td>
//               <td>{log.ip || "N/A"}</td>
//               <td>{log.userAgent || "N/A"}</td>
//               <td>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>


//       <div style={{ marginTop: "10px" }}>
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           disabled={page === 1}
//         >
//           Prev
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//           disabled={page === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminAuditLogs;




import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./Sidebar";
import "./AdminAuditLogs.css";

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    let isMounted = true;

    const fetchLogs = async (pageNumber = 1) => {
      try {
        const { data } = await axios.get(
          `/api/v2/admin/audit-logs?page=${pageNumber}&limit=${limit}`,
          { withCredentials: true }
        );
        if (isMounted && data.success) {
          setLogs(data.logs);
          setPage(data.page);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching logs", error);
        }
      }
    };

    fetchLogs(page);

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="audit-logs-page">
      <SideBar />
      <div className="audit-logs-content">
        <h2>Audit Logs</h2>
        <div className="table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Action</th>
                <th>Details</th>
                <th>IP</th>
                <th>User Agent</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="7">No logs found</td>
                </tr>
              ) : (
                logs.map((log, i) => (
                  <tr key={i}>
                    <td>{log.user?.name || "Unknown"}</td>
                    <td>{log.user?.email || "Unknown"}</td>
                    <td>{log.action || "N/A"}</td>
                    <td>{log.details || ""}</td>
                    <td>{log.ip || "N/A"}</td>
                    <td>{log.userAgent || "N/A"}</td>
                    <td>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogs;
