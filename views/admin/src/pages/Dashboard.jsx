import React from 'react';
import {
  FaBook,
  FaProjectDiagram,
  FaBell,
  FaIdBadge,
  FaSignOutAlt,
  FaPencilRuler
} from 'react-icons/fa';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
   } from 'recharts';


const dashboardItems = [
  {
    title: 'My Services',
    count: 1,
    icon: <FaBook size={24} color="#1a202c" />,
    bgColor: '#94bff2',
  },
  {
    title: 'Projects',
    count: 0,
    icon: <FaProjectDiagram size={24} color="#1a202c" />,
    bgColor: '#4299e1',
  },
  {
    title: 'Total Client',
    count: 1,
    icon: <FaPencilRuler size={24} color="#1a202c" />,
    bgColor: '#b17aa1',
  },
  {
    title: 'Total Employee',
    count: 0,
    icon: <FaBell size={24} color="#1a202c" />,
    bgColor: '#fcd9a1',
  },
  {
    title: 'Id Card',
    count: '',
    icon: <FaIdBadge size={24} color="#1a202c" />,
    bgColor: '#a8dadc',
  },
  {
    title: 'Log Out',
    count: '',
    icon: <FaSignOutAlt size={24} color="#1a202c" />,
    bgColor: '#cfcfcf',
  },
];

const pieData = [
  { name: 'Red', value: 600 },
  { name: 'Blue', value: 200 },
  { name: 'Yellow', value: 300 },
];

const barData = [
  { name: 'Inward', value: 20 },
  { name: 'Outward', value: 40 },
  { name: 'In Stock', value: 30 },
  { name: 'Ongoing Orders', value: 320 },
  { name: 'Pending Orders', value: 430 },
  { name: 'Completed Orders', value: 540 },
];

const COLORS = ['#ff6384', '#36a2eb', '#ffce56'];

export function DonutChart() {
  return (
    <div className="card p-3 mt-4">
      <h6 className="mb-3">Graphical Representation</h6>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend layout="horizontal" align="center" verticalAlign="top" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export function ProductionBarChart() {
  return (
    <div className="card p-3 mt-4">
      <h6 className="mb-3">Graphical Representation</h6>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
function Dashboard() {
  return (
    <div className="p-4">
      <h5 className="mb-4 fw-semibold text-dark">Dashboard</h5>

      {/* Cards */}
      <div className="row g-4">
        {dashboardItems.map((item, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <div
              className="dashboard-card d-flex align-items-center p-3 rounded shadow-sm"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="icon-circle me-3">{item.icon}</div>
              <div className="text-end w-100">
                <div className="count fw-bold fs-5">{item.count}</div>
                <div className="label fw-semibold">{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}

      <div className="row mt-4">
        <div className="col-md-6">
          <DonutChart />
        </div>
        <div className="col-md-6">
          <ProductionBarChart />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
