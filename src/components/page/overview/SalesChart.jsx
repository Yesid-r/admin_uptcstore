import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { BASE_URL } from '../../../utils/constants';

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/order`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSalesData(data.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const getAggregatedSalesData = () => {
    const salesByDateAndProduct = salesData.flatMap(order =>
      order.orderItems.map(orderItem => ({
        date: new Date(order.createdAt).toLocaleDateString(),
        product: orderItem.product.name,
        quantity: orderItem.quantity,
      }))
    );

    const aggregatedSalesData = [];

    for (const item of salesByDateAndProduct) {
      const existingIndex = aggregatedSalesData.findIndex(
        sales => sales.date === item.date && sales.product === item.product
      );

      if (existingIndex === -1) {
        aggregatedSalesData.push({
          date: item.date,
          product: item.product,
          quantity: item.quantity,
        });
      } else {
        aggregatedSalesData[existingIndex].quantity += item.quantity;
      }
    }

    const labels = aggregatedSalesData.map(sale => sale.date);
    const data = aggregatedSalesData.map(sale => sale.quantity);
    const products = [...new Set(aggregatedSalesData.map(sale => sale.product))];

    return {
      labels,
      datasets: [
        {
          label: 'Ventas',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
          hoverBorderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1,
          borderColor: 'rgba(75, 192, 192, 1)',
          datalabels: {
            color: 'rgba(0, 0, 0, 1)',
            formatter: (value, context) => {
              const productIndex = context.dataIndex;
              const product = products[productIndex];
              return `${product} - ${value}`;
            },
          },
        },
      ],
    };
  };

  return (
    <div>
      <h2>Gráfico de Ventas</h2>
      {salesData.length > 0 ? <Bar data={getAggregatedSalesData()} /> : <p>Cargando datos...</p>}
    </div>
  );
};

export default SalesChart;