import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { BASE_URL } from '../../../utils/constants';

const TopSellingProductsChart = () => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/order`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const products = data.data.flatMap(order => order.orderItems.map(orderItem => orderItem.product.name));
                const productCounts = {};
                products.forEach(product => {
                    if (productCounts[product]) {
                        productCounts[product]++;
                    } else {
                        productCounts[product] = 1;
                    }
                });
                const topSellingProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
                setTopSellingProducts(topSellingProducts);
            } catch (error) {
                console.error('Error fetching top selling products:', error);
            }
        };

        fetchTopSellingProducts();
    }, []);

    const getChartData = () => {
        const labels = topSellingProducts.map(([product]) => product);
        const data = topSellingProducts.map(([, count]) => count);
        return {
            labels,
            datasets: [
                {
                    label: 'Top Selling Products',
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                },
            ],
        };
    };

    return (
        <div >
            <h2></h2>
            {topSellingProducts.length > 0 ? (
                <div className="max-w-md max-h-md">
                    <Doughnut data={getChartData()} options={{ maintainAspectRatio: false }} />
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default TopSellingProductsChart;