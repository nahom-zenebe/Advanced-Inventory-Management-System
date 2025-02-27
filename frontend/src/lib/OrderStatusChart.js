import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getstatusgraphOrder } from "../features/orderSlice"; // Make sure this action is correctly defined
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

function OrderStatusChart() {
  const dispatch = useDispatch();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  
  const { statusgraph } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getstatusgraphOrder());  // Dispatch action to fetch order status data
  }, [dispatch]);

  // Safeguard to ensure statusgraph is not null or undefined
  if (!statusgraph || statusgraph.length === 0) {
    return <div>Loading...</div>; // Show loading indicator if data is not available yet
  }

  // Preparing the data for Chart.js
  const data = {
    labels: statusgraph.map(stat => stat._id), // Order statuses (Shipped, Pending, etc.)
    datasets: [
      {
        label: "Order Count", // Label for the dataset
        data: statusgraph.map(stat => stat.count), // Count of orders per status
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color for the bars
        borderWidth: 1, // Border width
      }
    ]
  };

  // Chart.js options for customization
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Orders by Status', // Title of the chart
      },
    },
  };

  return (
    <div>
      <h2>Order Status Chart</h2>
      <Bar data={data} options={options} />  {/* Rendering the Bar chart */}
    </div>
  );
}

export default OrderStatusChart;
