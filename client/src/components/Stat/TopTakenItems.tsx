import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAllProducts } from "../../services/queries/productQueries";
import { ApexOptions } from "apexcharts";

interface Product {
  key: string;
  productID: string;
  name: string;
  model: string;
  brand: string;
  category?: string;
  description?: string;
  expirationDate?: string;
  manufactureDate?: string;
  price?: number;
  purchaseDate?: string;
  quantity?: number;
  returnable?: boolean;
  suppliername?: string;
  unit?: string;
}

const TopTakenItems: React.FC = () => {
  const { data: productData, isLoading, error } = useAllProducts();
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (productData) {
      const transformData = () => {
        const categoryCounts: { [key: string]: number } = {};
        productData.forEach((item: Product) => {
          const category = item.category || "Uncategorized";
          const quantity = item.quantity ?? 1; // Use default quantity of 1 if undefined
          if (!categoryCounts[category]) {
            categoryCounts[category] = 0;
          }
          categoryCounts[category] += quantity;
        });

        const sortedCategories = Object.entries(categoryCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 4); // Get the top 4 categories

        setLabels(sortedCategories.map(([category]) => category));
        setSeries(sortedCategories.map(([, count]) => count));
        setTotal(sortedCategories.reduce((acc, [, count]) => acc + count, 0));
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

  const options:ApexOptions = {
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
            formatter: function () {
              return total.toString();
            },
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
      text: "Top Taken Items",
    },
    labels,
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
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
