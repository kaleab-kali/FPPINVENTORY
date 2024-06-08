import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAllProducts } from "../../services/queries/productQueries";
import { ApexOptions } from "apexcharts";

// interface Product {
//   key: string;
//   productID: string;
//   name: string;
//   model: string;
//   brand: string;
//   category?: string;
//   description?: string;
//   expirationDate?: string;
//   manufactureDate?: string;
//   price?: number;
//   purchaseDate?: string;
//   quantity?: number;
//   returnable?: boolean;
//   suppliername?: string;
//   unit?: string;
// }

interface ChartData {
  series: { name: string; data: number[] }[];
  options: ApexOptions;
}

const StockChart: React.FC = () => {
  const { data: productData, isLoading, error } = useAllProducts();
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: { show: true },
        zoom: { enabled: true },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "category",
        categories: [],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: "Stock Info",
      },
    },
  });

  useEffect(() => {
    if (productData) {
      const transformData = () => {
        const categoryBrandCounts: {
          [category: string]: { [brand: string]: number };
        } = {};
        productData.forEach((item) => {
          const category = item.category || "Uncategorized";
          const brand = item.brand || "Unknown";
          const quantity = item.quantity ?? 1;

          if (!categoryBrandCounts[category]) {
            categoryBrandCounts[category] = {};
          }
          if (!categoryBrandCounts[category][brand]) {
            categoryBrandCounts[category][brand] = 0;
          }
          categoryBrandCounts[category][brand] += quantity;
        });

        const categories = Object.keys(categoryBrandCounts);
        const brands = Array.from(
          new Set(productData.map((item) => item.brand || "Unknown"))
        );

        const series = brands.map((brand:any) => ({
          name: brand,
          data: categories.map(
            (category) => categoryBrandCounts[category][brand] || 0
          ),
        }));

        setChartData((prevState) => ({
          ...prevState,
          series: series as { name: string; data: number[] }[],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
          },
        }));
      };

      transformData();
    }
  }, [productData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default StockChart;
