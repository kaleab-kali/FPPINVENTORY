import React from "react";
import ReactApexChart from "react-apexcharts";

const TopTakenItems: React.FC = () => {
  const series = [44, 55, 67, 83];
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w: any) {
              return 249;
            },
          },
        },
      },
    },
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={{
            chart: {
              height: 350,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: "22px",
                  },
                  value: {
                    fontSize: "16px",
                  },
                  total: {
                    show: true,
                    label: "Total",
                  },
                },
              },
            },
            legend: {
              show: true,
              offsetX: 3, // Adjust the offset to move legend sideward
              fontSize: "16px",
              offsetY: 10, // Adjust the offset to move legend downward
            },
            title: {
              text: " Top Taken Items",
            },
            labels: ["Apples", "Oranges", "Bananas", "Berries"],
          }}
          series={series}
          type="radialBar"
          height={350}
          width={400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default TopTakenItems;
