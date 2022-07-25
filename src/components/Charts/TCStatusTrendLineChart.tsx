import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: true,
      text: "TC Status Trend",
    },
  },
  //   maintainAspectRatio: true,
  scales: {
    x: {
      beginAtZero: true,
      //   position: "center",
      grid: {
        borderDash: [8, 4],
      },
    },
    y: {
      min: -1.5,
      max: 1.5,
      beginAtZero: true,

      grid: {
        borderDash: [8, 4],
        color: (context: any) => {
          if (context.tick.value === 0) {
            return "black";
          }
          //  else {
          //   return "#E5E5E5";
          // }
        },
      },
      ticks: {
        stepSize: 0.5,
      },
    },
  },
};

const labels = [
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
  "2022-05-08 02:54:23",
];

export const data = {
  labels,
  datasets: [
    {
      //   label: "Dataset 1",
      data: [1, 1, 1, -1, -1, -1, -1, -1, 1, 1],
      backgroundColor: "#6454C0",
      pointBorderColor: "rgb(0, 0, 0)",
      borderColor: "#F60400",
      borderWidth: 2,
      pointRadius: 2,
    },
  ],
};

export default function TCExecutionLineChart() {
  return <Line options={options} data={data} />;
}
