import { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  "Feature 1",
  "Feature 2",
  "Feature 3",
  "Feature 4",
  "Feature 5",
  "Feature 6",
  "Feature 7",
  "Feature 8",
  "Feature 9",
  "Feature 10",
  "Feature 11",
  "Feature 12",
  "Feature 13",
  "Feature 14",
  "Feature 15",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Passed",
      barPercentage: 0.4,
      data: [20, 50, 30, 10, 60, 40, 90, 20, 50, 30, 10, 60, 40, 90, 20],
      backgroundColor: "#50B364",
      borderRadius: 6,

      //   stack: 'Stack 0',
    },
    {
      label: "Failed",
      barPercentage: 0.4,
      data: [30, 10, 60, 40, 20, 50, 90, 30, 10, 60, 40, 20, 50, 90, 20],
      backgroundColor: "#F60400",
      borderRadius: 6,
      // //   stack: 'Stack 0',
    },
    {
      label: "Skipped",
      barPercentage: 0.4,
      data: [60, 40, 20, 50, 90, 30, 20, 60, 40, 20, 50, 90, 30, 20, 20],
      backgroundColor: "#9e9e9e",
      borderRadius: 6,
      //   stack: 'Stack 1',
    },
  ],
};

export interface StackedBarProps {
  setOpen: (value: boolean) => void;
  setData?: any;
}

export function GroupStackedBar(props: StackedBarProps) {
  const { setOpen, setData } = props;

  //chat option --------

  const options = {
    plugins: {
      legend: {
        textAlign: "right",
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: false,
        text: "QA Testing Report",
      },
    },
    // responsive: true,
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

  //---------------

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const { datasetIndex } = dataset[0];

    // console.log("printDatasetAtEvent", data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    setData({
      feature: data.labels[index],
      metricNames: data.datasets.map((m) => m.label),
      featureData: data.datasets.map((d) => d.data[index]),
    });
    // console.log(
    //   "printElementAtEvent",
    //   data.labels[index],
    //   data.datasets[datasetIndex].data[index],
    // );
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;
    setOpen(true);
    // console.log("printElementsAtEvent", elements.length);
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Chart
      type="bar"
      options={options}
      ref={chartRef}
      onClick={onClick}
      data={data}
    />
  );
}
