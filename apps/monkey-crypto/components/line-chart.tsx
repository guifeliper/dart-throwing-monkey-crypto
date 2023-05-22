"use client";
import ReactApexChart from "react-apexcharts";
import React from "react";

export const LineChart = () => {
  return (
    <div id="chart">
      <ReactApexChart
        options={CHART}
        series={CHART.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export const CHART = {
  chart: {
    animations: {
      enabled: false,
      easing: "swing",
    },
    background: "#1F2937",
    dropShadow: {
      enabled: true,
    },
    foreColor: "#fff",
    fontFamily: "Roboto",
    height: 250,
    id: "583Kl",
    toolbar: {
      show: false,
      tools: {
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    width: 480,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
    radialBar: {
      hollow: {
        background: "#fff",
      },
      dataLabels: {
        name: {},
        value: {},
        total: {},
      },
    },
    pie: {
      donut: {
        labels: {
          name: {},
          value: {},
          total: {},
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      fontWeight: 700,
    },
  },
  fill: {
    gradient: {
      type: "diagonal2",
    },
  },
  grid: {
    borderColor: "#6e7eaa",
    padding: {
      right: 25,
      left: 15,
    },
  },
  legend: {
    fontSize: 14,
    offsetY: 0,
    itemMargin: {
      vertical: 0,
    },
  },
  markers: {
    hover: {
      size: 0,
      sizeOffset: 6,
    },
  },
  series: [
    {
      name: "Bitcoin",
      data: [
        {
          x: "Item 1",
          y: 31,
        },
        {
          x: "Item 2",
          y: 40,
        },
        {
          x: "Item 3",
          y: 28,
        },
        {
          x: "Item 4",
          y: 51,
        },
        {
          x: "Item 5",
          y: 42,
        },
      ],
    },
    {
      name: "Crypto-100",
      data: [
        {
          x: "Item 1",
          y: "10",
        },
        {
          x: "Item 2",
          y: "25",
        },
        {
          x: "Item 3",
          y: "32",
        },
        {
          x: "Item 4",
          y: "29",
        },
        {
          x: "Item 5",
          y: "45",
        },
      ],
    },
  ],
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    width: 4,
  },
  tooltip: {},
  xaxis: {
    labels: {
      trim: true,
      style: {},
    },
    tickAmount: "dataPoints",
    title: {
      style: {
        fontWeight: 700,
      },
    },
  },
  yaxis: {
    tickAmount: 5,
    labels: {
      style: {
        colors: [null, null, null, null, null, null],
      },
    },
    title: {
      style: {},
    },
  },
  theme: {
    mode: "dark",
    palette: "palette2",
  },
};
