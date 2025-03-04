import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopProductsByQuantity } from "../features/productSlice";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import {gettingallproducts} from '../features/productSlice'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Gettopproduct() {
  const dispatch = useDispatch();
  const { gettopproduct } = useSelector((state) => state.product);

    
  useEffect(() => {
    dispatch(gettingallproducts());
  
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTopProductsByQuantity());
  }, [dispatch]);


  const chartData = {
    labels: gettopproduct?.map((product) => product.name) || [],
    datasets: [
      {
        label: "Quantity",
        data: gettopproduct?.map((product) => product.quantity) || [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Products" } },
      y: { title: { display: true, text: "Quantity" }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Top Products by Quantity</h2>
      <div className="h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Gettopproduct;
