import { useRef } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  plugins: {
    legend: {
      textAlign: "right",
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: false,
      text: "Summary Report",
    },
  },
  // aspectRatio: 0.8,
  // cutoutPercentage: 80,
};

export const data = {
  labels: ["In Porgress", "Failed", "Passed"],
  datasets: [
    {
      label: "",
      data: [12, 19, 25],
      backgroundColor: ["#ffee58", "#F60400", "#50B364"],
      borderWidth: 1,
    },
  ],
};
export interface PieChartProps {}

function TotalChart(props: PieChartProps) {
  const chartRef = useRef<ChartJS>(null);

  return <Chart type="pie" ref={chartRef} data={data} options={options} />;
}

export default TotalChart;
