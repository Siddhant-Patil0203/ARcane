import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
export default function StatisticsChart() {
  const option = {
    color: ["var(--orange)"],

    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(0, 0, 0, 0.59)",
      borderWidth: 1,
    },
    grid: {
      left: "0%",
      right: "4%",
      bottom: "0%",
      containLabel: true,
      show: false,
    },
    legend: {
      // Try 'horizontal'
      orient: "vertical",
      right: -30,
      top: 220,
      data: ["line", "bar"],
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          rotate: 30,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        position: "right",
        name: "Precipitation",
      },
    ],
    series: [
      {
        name: "line",
        type: "line",
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(38,226,179,0)",
            },
            {
              offset: 1,
              color: "rgba(37,192,127,100)",
            },
          ]),
          width: 4,
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            {
              offset: 0,
              color: "#0c5f3d",
            },
            {
              offset: 1,
              color: "#093a25",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        z: -10,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 15,
        data: [28000, 19000, 41000, 18000, 50000, 30000, 26000],
      },
      {
        name: "bar",
        type: "bar",
        barGap: "-100%",
        barWidth: 50,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(38,226,179,0)" },
            { offset: 1, color: "rgba(37,192,127,100)" },
          ]),
        },
        z: -12,
        data: [28000, 19000, 32000, 18000, 41000, 30000, 26000],
      },
    ],
  };

  return <ReactECharts option={option} />;
}
