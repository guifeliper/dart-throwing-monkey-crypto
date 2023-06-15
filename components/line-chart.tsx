"use client"
import React from "react"
import { AccumulativeInvestmentProps } from "@/utils/calculateInvestment"
import dynamic from "next/dynamic"
// import Chart from "react-apexcharts"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })
interface LineChartProps {
  data: AccumulativeInvestmentProps[]
}
export const LineChart = ({ data }: LineChartProps) => {
  return (
    <div id="chart">
      <Chart options={OPTIONS as any} series={data} />
    </div>
  )
}

export const OPTIONS = {
  chart: {
    animations: {
      enabled: false,
      easing: "swing",
    },
    background: "#1F2937",
    dropShadow: {
      enabled: false,
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
    show: false,
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
}
