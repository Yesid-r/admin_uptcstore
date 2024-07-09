import React from 'react';
import SalesChart from './SalesChart';
import TopSellingProductsChart from './TopSellingProductsChart';

const Dashboard = () => {
    return (
        <div className="h-screen flex flex-col">
            <nav className="bg-gray-800 py-4">
                <div className="container mx-auto p-4 flex justify-between">
                    <h1 className="text-2xl text-white">Dashboard</h1>
                    <ul className="flex items-center">
                        <li className="mr-4">
                            <a href="#sales" className="text-gray-300 hover:text-white">
                                Ventas
                            </a>
                        </li>
                        <li className="mr-4">
                            <a href="#products" className="text-gray-300 hover:text-white">
                                Productos
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto p-4">
                <div className="container mx-auto p-4">
                <div id='products' className='mx-auto'> 
                        <h2 className="text-3xl mb-4">Top producots vendidos</h2>
                        <TopSellingProductsChart />
                    </div>
                    <div id='sales'>
                        <h2 className="text-3xl mb-4">Vista de ventas</h2>
                        <SalesChart />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;