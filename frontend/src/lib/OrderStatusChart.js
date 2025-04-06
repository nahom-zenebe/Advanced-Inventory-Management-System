import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getstatusgraphOrder } from "../features/orderSlice";  
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
    dispatch(getstatusgraphOrder());  
  }, [dispatch]);

  if (!statusgraph || statusgraph.length === 0) {
    return <div>Loading...</div>; // Show loading indicator if data is not available yet
  }

  const data = {
    labels: statusgraph.map(stat => stat._id), // Order statuses
    datasets: [
      {
        label: 'Order Count',
        data: statusgraph.map(stat => stat.count), // Order count for each status
        backgroundColor: [
          'rgb(255, 255, 0)', 
          'rgb(0, 255, 0)', 
          'rgba(255,0,0)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
        borderRadius: 10,
        hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)', // Hover effect
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents expanding to fit container
    plugins: {
      title: {
        display: true,
        text: 'Orders by Status',
        font: {
          size: 24,
          weight: 'bold',
          family: 'Arial, sans-serif',
        },
        color: '#333',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        Order Status Chart
      </h2>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />  {/* Rendering the Bar chart */}
      </div>
    </div>
  );
}

export default OrderStatusChart;
