import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ActiveSessions.css";
import { useHistory } from "react-router-dom";
import Header from "../Home/Header";
import BottomTab from "../../more/BottomTab";
import Footer from "../../more/Footer";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";

const ActiveSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchSessions = async () => {
    try {
      const sessionRes = await axios.get("/api/v2/me/sessions", {
        withCredentials: true,
      });
      setSessions(sessionRes.data.sessions);

      const tokenRes = await axios.get("/api/v2/me/current-token", {
        withCredentials: true,
      });
      setCurrentToken(tokenRes.data.token);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const logoutFromSession = async (token) => {
    try {
      await axios.delete(`/api/v2/sessions/${token}`, {
        withCredentials: true,
      });
      fetchSessions();
    } catch (err) {
      console.error("Error logging out from session:", err);
    }
  };

  const logoutFromAll = async () => {
    try {
      await axios.post("/api/v2/logout-all", {}, { withCredentials: true });
      history.push("/login"); // redirect to login page after logout all
    } catch (err) {
      console.error("Error logging out from all sessions:", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <>
      <MetaData title="Active Sessions | NextLearn" />
      <Header />

      {loading ? (
        <Loading />
      ) : (
        <div className="active-sessions-container">
          <h2>Active Sessions</h2>

          {sessions.length === 0 ? (
            <p>No active sessions</p>
          ) : (
            <ul className="session-list">
              {sessions.map((session, index) => {
                const isCurrent = session.token === currentToken;
                return (
                  <li
                    key={index}
                    className={`session-item ${isCurrent ? "current-session" : ""}`}
                  >
                    <div className="session-info">
                      <p>
                        <strong>IP:</strong> {session.ip || "Unknown"}
                      </p>
                      <p>
                        <strong>Device:</strong> {session.device || "Unknown"}
                      </p>
                      <p>
                        <strong>Last Active:</strong>{" "}
                        {new Date(session.lastActive).toLocaleString()}
                      </p>
                      {isCurrent && <p className="current-tag">🟢 Current Session</p>}
                    </div>
                    {!isCurrent && (
                      <button
                        className="logout-btn"
                        onClick={() => logoutFromSession(session.token)}
                      >
                        Logout
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {sessions.length > 1 && (
            <button className="logout-all-btn" onClick={logoutFromAll}>
              Logout From All Devices
            </button>
          )}
        </div>
      )}

      <BottomTab />
      <Footer />
    </>
  );
};

export default ActiveSessions;
