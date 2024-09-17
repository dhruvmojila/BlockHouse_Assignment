"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function convertCandlestickData(originalData) {
  return [
    {
      data: originalData.data.map((item) => ({
        x: new Date(item.x),
        y: [item.open, item.high, item.low, item.close],
      })),
    },
  ];
}

export default function Dashboard() {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineData, setLineData] = useState({ labels: [], data: [] });
  const [barData, setBarData] = useState({ labels: [], data: [] });
  const [pieData, setPieData] = useState({ labels: [], data: [] });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isDataFetchedFailed, setIsDataFetchedFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candlestick, line, bar, pie] = await Promise.all([
          axios.get("http://localhost:8000/api/candlestick-data/"),
          axios.get("http://localhost:8000/api/line-chart-data/"),
          axios.get("http://localhost:8000/api/bar-chart-data/"),
          axios.get("http://localhost:8000/api/pie-chart-data/"),
        ]);

        setCandlestickData(convertCandlestickData(candlestick.data));
        setLineData(line.data);
        setBarData(bar.data);
        setPieData(pie.data);
        setIsDataFetched(true);
        setIsDataFetchedFailed(false);
      } catch (error) {
        setIsDataFetched(false);
        setIsDataFetchedFailed(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!isDataFetched ? (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
          {isDataFetchedFailed ? (
            <div className="text-black text-4xl">
              Error in fetching the data
            </div>
          ) : (
            <div className="text-black text-4xl">Loding ...</div>
          )}
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-5xl font-bold mb-4 text-center">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg content-center">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Candlestick Chart
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <Chart
                  options={{
                    chart: { type: "candlestick", height: 300 },
                    xaxis: {
                      type: "datetime",
                      labels: { show: true, format: "dd-MM-yyyy" },
                    },
                    yaxis: { tooltip: { enabled: true } },
                  }}
                  series={candlestickData}
                  type="candlestick"
                />
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full content-center justify-center">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Line Chart
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  data={lineData.labels.map((label, index) => ({
                    name: label,
                    value: lineData.data[index],
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <XAxis dataKey="name" />
                  <YAxis dataKey="value" />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name="Months"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg ">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Bar Chart
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={barData.labels.map((label, index) => ({
                    name: label,
                    value: barData.data[index],
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis dataKey="value" />
                  <Tooltip />
                  <Legend verticalAlign="top" align="right" height={36} />
                  <Bar dataKey="value" fill="#8884d8" name="Products" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Pie Chart
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={pieData.labels.map((label, index) => ({
                      name: label,
                      value: pieData.data[index],
                    }))}
                    labelLine={false}
                    outerRadius={180}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.labels.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="veritical" align="left" verticalAlign="top" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
