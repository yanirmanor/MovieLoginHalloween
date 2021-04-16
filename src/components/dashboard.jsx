import React, { useEffect, useState } from "react";
import { useDashboardQuery } from "../hooks/useDashboardQuery";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ChartViz = ({ data }) => {
  const [isWeekMode, setWeekMode] = useState(true);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    setChartData(
      isWeekMode ? data.sales_over_time_week : data.sales_over_time_year
    );
  }, [isWeekMode]);

  function CustomChartTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="bg-black text-white shadow-lg rounded p-3 text-center">
          <h4>
            Orders {label} by total {payload[0].value}
          </h4>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mx-4">
      <div
        className="flex items-center my-3"
        onClick={() => setWeekMode(!isWeekMode)}
      >
        <h2 className="mr-5 font-bold text-lg">
          {isWeekMode ? `sales over week` : `sales over year`}
        </h2>
        <div
          className={`w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
            isWeekMode ? `bg-green-400` : ""
          }`}
        >
          <div
            className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ${
              isWeekMode ? `translate-x-6` : ""
            }`}
          ></div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="total"
            stroke="#2451B7"
            fill="url(#color)"
          />
          <CartesianGrid opacity={0.3} stroke="#ccc" />
          <XAxis axisLine={false} tickLine={false} dataKey="orders" />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={8}
            dataKey="total"
          />
          <Tooltip content={<CustomChartTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const sum = (items) => {
  return items.reduce((sum, item) => {
    return sum + item["total"];
  }, 0);
};
const Summary = ({ data }) => {
  const weekTotal = sum(data.sales_over_time_week);
  const yearTotal = sum(data.sales_over_time_year);
  return (
    <div className="mx-4">
      <div className="font-bold text-2xl">Totals</div>
      <div className="flex">
        <div className="flex flex-col m-2 ml-0 p-4 bg-black text-white rounded">
          <span className="font-bold text-center">week</span>
          <span>{weekTotal.toLocaleString()}</span>
        </div>
        <div className="flex flex-col m-2 p-4 bg-black text-white rounded">
          <span className="font-bold text-center">year</span>
          <span>{yearTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = ({ accessToken }) => {
  const { isLoading, isError, data } = useDashboardQuery(accessToken);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Opps somthing get wrong</div>;
  }
  return (
    <>
      <Summary data={data} />
      <ChartViz data={data} />
    </>
  );
};
