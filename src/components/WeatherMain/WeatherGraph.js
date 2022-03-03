import { Line } from "react-chartjs-2";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useEffect } from "react";

const isSomeValueNegative = (element) => element < 0;

function WeatherGraph({ dataDegrees, labels }) {
  useEffect(() => {
    console.log("labels", labels);
    console.log("dataDegrees", dataDegrees);
  }, [dataDegrees, labels]);

  Chart.plugins.register(ChartDataLabels);
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    let gradient = ctx.createLinearGradient(25, 20, 17, 180);
    dataDegrees.some(isSomeValueNegative)
      ? gradient.addColorStop(0, "rgba(91, 140, 255, 0.6)")
      : gradient.addColorStop(0, "rgba(255, 113, 91, 0.6)");
    gradient.addColorStop(1, "rgba(255, 244, 244, 0.4)");
    return {
      labels: labels,
      datasets: [
        {
          data: dataDegrees,
          spanGaps: true,
          fill: true,
          pointRadius: 0,
          borderColor: "#FFF4F4",
          backgroundColor: gradient,
          borderWidth: 2,
          titleFontStyle: "normal",
          pointStyle: "circle",
          pointHitRadius: 10,
          pointBorderWidth: 1,
          pointBorderColor: "#5a81ea",
          pointBackgroundColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 1,
          pointHoverRadius: 4,
        },
      ],
    };
  };
  //лул
  const options = {
    layout: {
      padding: {
        top: 25,
        right: 10,
        left: 10,
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: Math.round,
        color: "#9ba6b2",
      },
    },
    events: false,
    elements: {
      line: {
        tension: 0.45,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    hover: {
      animationDuration: 0,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      enabled: false,
      backgroundColor: "#002237",
      borderWidth: 0,
      titleFontSize: 12,
      titleFontColor: "#fff",
      bodyFontSize: 16,
      bodyFontColor: "rgba(255,255,255,0.8)",
      displayColors: false,
      bodyAlign: "center",
      titleAlign: "center",
      mode: "index",
      intersect: false,
      xPadding: 16,
      yPadding: 8,
      callbacks: {},
    },
    scales: {
      xAxes: [
        {
          ticks: {
            maxTicksLimit: 10,
            callback: function (value) {
              return value;
            },
            fontColor: "#9ba6b2",
            fontSize: 8,
            maxRotation: 0,
            padding: 12,
          },
          gridLines: {
            color: "#edeff1",
            drawBorder: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawTicks: false,
            zeroLineColor: "transparent",
            color: "rgba(0, 0, 0, 0)",
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };
  return (
    <div style={{ width: 320, height: 106 }} className="GraphicsElement">
      <Line width={590} height={225} data={data} options={options} />
    </div>
  );
}

export default WeatherGraph;
