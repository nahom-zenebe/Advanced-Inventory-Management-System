import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { useDispatch, useSelector } from "react-redux";
import image from "../images/user.png";
import {
  staffUser,
  managerUser,
  adminUser
} from "../features/authSlice";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserRoleChart = () => {
  const [userData, setUserData] = useState({ staff: 0, manager: 0, admin: 0 });
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(staffUser());
    dispatch(managerUser());
    dispatch(adminUser());
  }, [dispatch]);

  useEffect(() => {


        setUserData({
          staff: staffuser?.length || 0,
          manager: manageruser?.length || 0,
          admin: adminuser?.length || 0,
        });
     
  }, []);

  const data = {
    labels: ["Staff", "Manager", "Admin"],
    datasets: [
      {
        label: "Number of Users",
        data: [userData.staff, userData.manager, userData.admin],
        backgroundColor: ["#3498db", "#e67e22", "#e74c3c"],
        borderColor: ["#2980b9", "#d35400", "#c0392b"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "User Roles Distribution" },
    },
  };

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>User Role Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserRoleChart;
