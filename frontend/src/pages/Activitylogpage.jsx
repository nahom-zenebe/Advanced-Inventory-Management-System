import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getAllActivityLogs, getsingleUserActivityLogs } from "../features/activitySlice";
import TopNavbar from "../Components/TopNavbar";
import FormattedTime from "../lib/FormattedTime ";
function Activitylogpage() {
  const [logs, setLogs] = useState([]);
  const { activityLogs, isFetching,userdata } = useSelector((state) => state.activity);
  const { Authuser,  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 
  const socket = io("http://localhost:3002", {
    withCredentials: true, 
  });
  useEffect(() => {
    if(Authuser?.id){
    dispatch(getAllActivityLogs());
  dispatch( getsingleUserActivityLogs(Authuser.id))
}


    socket.on("newActivityLog", (newLog) => {
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    });
 
    return () => {
      socket.off("newActivityLog"); 
    };
  }, [dispatch,Authuser.id]);


  useEffect(() => {
    setLogs(activityLogs); 
  }, [activityLogs]);


 

  console.log(userdata)

  return (
    <div>
      <TopNavbar />
      <div className="mt-10 ml-5">
      <h1 className="text-xl font-semibold mb-4">Activity Logs</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                <th className="px-3 py-2 border w-5">#</th>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Email</th>
                  <th className="px-3 py-2 border">action</th>
                  <th className="px-3 py-2 border">affected part</th>
                  <th className="px-3 py-2 border">Description</th>
                  <th className="px-3 py-2 border">Time</th>
                  <th className="px-3 py-2 border">Ip Address</th>
            
             
                </tr>
              </thead>
              <tbody>
                {Array.isArray(logs) &&
                logs.length > 0 ? (
                  logs.map((log,index) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                       <td className="px-3 py-2 border">{index+1}</td>
                       <td className="px-3 py-2 border">{log.userId.name}</td>
                       <td className="px-3 py-2 border">{log.userId.email}</td>
                      <td className="px-3 py-2 border">{log.action}</td>
                      <td className="px-3 py-2 border">
                        {log.entity}
                      </td>
                      <td className="px-3 py-2 border">
                        {log.description}
                      </td>
                  
                      <td className="px-4  py-2 border">
                 
                     <FormattedTime timestamp={log.createdAt} />
                      </td>
                      <td className="px-4  py-2 border">{log.ipAddress }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                    <p>No activity logs available</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      
       
      </div>
    </div>
  );
}

export default Activitylogpage;
