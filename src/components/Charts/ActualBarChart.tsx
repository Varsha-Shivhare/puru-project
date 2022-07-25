import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
  maintainAspectRatio: true,
  scales: {
    x: {
      stacked: true,
      ticks: {
        // color: "",
      },
      grid: {
        borderDash: [8, 4],
      },
    },
    y: {
      stacked: true,
      grid: {
        borderDash: [8, 4],
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const defaultData = {
  labels,
  datasets: [
    {
      //   label: "Dataset 1",
      data: [60, 40, 20, 50, 85, 30, 20, 80, 24, 28, 80, 59],
      backgroundColor: "#6454C0",
      barPercentage: 0.6,
      borderRadius: 6,
    },
  ],
};

export function ActualBarChart({ data }: any) {
  return <Bar options={options} data={data} />;
}
