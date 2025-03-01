import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axiosInstance from "./axios";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StockTransactionGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/stocktransaction/getallStockTransaction");
        const transactions = response.data.transactions;

        transactions.sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate));

        const labels = transactions.map(tx => new Date(tx.transactionDate).toLocaleDateString());
        const stockInQuantities = transactions.map(tx => (tx.type === "Stock-in" ? tx.quantity : 0));
        const stockOutQuantities = transactions.map(tx => (tx.type === "Stock-out" ? tx.quantity : 0));

        setChartData({
          labels,
          datasets: [
            {
              label: "Stock In",
              data: stockInQuantities,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              pointBackgroundColor: "#4CAF50",
              fill: true,
            },
            {
              label: "Stock Out",
              data: stockOutQuantities,
              borderColor: "#F44336",
              backgroundColor: "rgba(244, 67, 54, 0.2)",
              pointBackgroundColor: "#F44336",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", width: "80vw" }}>
      <div style={{ width: "90%", maxWidth: "800px", height: "70%", maxHeight: "600px" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Stock Transactions Overview</h2>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                tooltip: { enabled: true },
              },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { color: "rgba(200, 200, 200, 0.3)" }, ticks: { beginAtZero: true } },
              },
            }}
          />
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StockTransactionGraph;