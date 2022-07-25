import { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";
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
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  "Test_id_1",
  "Test_id_2",
  "Test_id_3",
  "Test_id_4",
  "Test_id_5",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Passed",
      barPercentage: 0.4,
      data: [20, 50, 30, 10, 60],
      backgroundColor: "#50B364",
      borderColor: "#50B364",
      borderWidth: 1,
      pointRadius: 5,
      pointBorderColor: "rgb(0, 0, 0)",
      pointStyle: "rectRot",

      //   stack: 'Stack 0',
    },
    {
      label: "Failed",
      barPercentage: 0.4,
      data: [30, 10, 60, 40, 20],
      backgroundColor: "#F60400",
      borderColor: "#F60400",
      borderWidth: 1,
      pointRadius: 5,
      pointBorderColor: "rgb(0, 0, 0)",
      pointStyle: "rectRot",
      // //   stack: 'Stack 0',
    },
  ],
};

export interface StackedBarProps {
  setOpen: (value: boolean) => void;
  setData?: any;
}

export function ApplicationRegressionChart(props: StackedBarProps) {
  const { setOpen, setData } = props;

  //chat option --------

  const options: any = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        textAlign: "right",
        labels: {
          //   usePointStyle: true,
        },
      },
      title: {
        display: false,
        text: "QA Testing Report",
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

  //---------------

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const { datasetIndex } = dataset[0];

    // console.log("printDatasetAtEvent", data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    // setData({
    //   feature: data.labels[index],
    //   metricNames: data.datasets.map((m) => m.label),
    //   featureData: data.datasets.map((d) => d.data[index]),
    // });
    const win = window.open(
      `/scoreCard/executionReport?testRunId=${data.labels[index] || ""}`,
      "_blank",
    );
    if (win != null) {
      win.focus();
    }
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
      type="line"
      options={options}
      ref={chartRef}
      onClick={onClick}
      data={data}
    />
  );
}

// as keyof typeof buttonStyle
