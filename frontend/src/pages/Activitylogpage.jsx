import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getAllActivityLogs } from "../features/activitySlice";
import TopNavbar from "../Components/TopNavbar";

function Activitylogpage() {
  const [logs, setLogs] = useState([]);
  const { activityLogs, isFetching } = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  const socket = io("http://localhost:3002", {
    withCredentials: true, 
  });
  useEffect(() => {
    dispatch(getAllActivityLogs());

  console.log(activityLogs)
    socket.on("newActivityLog", (newLog) => {
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    });

    return () => {
      socket.off("newActivityLog"); 
    };
  }, [dispatch]);

  useEffect(() => {
    setLogs(activityLogs); 
  }, [activityLogs]);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div>
      <TopNavbar />
      <div>
        <h1>Activity Logs</h1>
        {logs.length > 0 ? (
          <ul>
            {logs.map((log) => (
              <li key={log._id}>{log.description}</li>
            ))}
          </ul>
        ) : (
          <p>No activity logs available</p>
        )}
      </div>
    </div>
  );
}

export default Activitylogpage;
