import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { gettingallSales } from "../features/salesSlice";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const dispatch = useDispatch();
  const { getallsales } = useSelector((state) => state.sales);
  const [messages, setMessages] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Fetch sales data on component mount
  useEffect(() => {
    dispatch(gettingallSales());
  }, [dispatch]);

  // Update chart data and messages when sales data changes
  useEffect(() => {
    if (getallsales && getallsales.length > 0) {
      // Extract labels (dates) and datasets from sales data
      const labels = getallsales.map((sale) => new Date(sale.createdAt).toLocaleDateString());
      const totalSales = getallsales.map((sale) => sale.totalAmount);
      const paymentStatuses = getallsales.map((sale) => (sale.paymentStatus === "Paid" ? 1 : 0));

      // Prepare customer messages for display
      const customerMessages = getallsales.map((sale) => ({
        customerName: sale.customerName,
        paymentMethod: sale.paymentMethod,
        paymentStatus: sale.paymentStatus,
        status: sale.status,
        totalAmount: sale.totalAmount,
      }));

      setMessages(customerMessages);

      // Update chart data
      setChartData({
        labels,
        datasets: [
          {
            label: "Total Sales Amount",
            data: totalSales,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
          },
          {
            label: "Payment Status (Paid = 1, Unpaid = 0)",
            data: paymentStatuses,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [getallsales]);

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Overview",
        font: {
          size: 16,
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount / Status",
        },
      },
    },
  };

  return (
    <div className="bg-base-100 min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Sales Overview</h1>

      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Line data={chartData} options={chartOptions} />
      </div>

      
    </div>
  );
};

export default SalesChart;