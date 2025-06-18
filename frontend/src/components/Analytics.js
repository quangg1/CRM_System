import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [customerStats, setCustomerStats] = useState(null);
  const [interactionStats, setInteractionStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [customerResponse, interactionResponse] = await Promise.all([
        fetch('/api/customers/stats'),
        fetch('/api/interactions/stats')
      ]);

      const customerData = await customerResponse.json();
      const interactionData = await interactionResponse.json();

      setCustomerStats(customerData);
      setInteractionStats(interactionData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const customerChartData = {
    labels: ['Leads', 'Customers', 'Inactive'],
    datasets: [
      {
        label: 'Customer Distribution',
        data: customerStats ? [
          customerStats.leads,
          customerStats.customers,
          customerStats.inactive
        ] : [],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const interactionChartData = {
    labels: ['Scheduled', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Interaction Status',
        data: interactionStats ? [
          interactionStats.scheduled,
          interactionStats.completed,
          interactionStats.cancelled
        ] : [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="analytics-container" style={{ padding: '24px' }}>
      <h1>Analytics Dashboard</h1>
      
      {/* Customer Statistics */}
      <Card title="Customer Analytics" style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="Total Customers"
              value={customerStats?.total || 0}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Active Leads"
              value={customerStats?.leads || 0}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Active Customers"
              value={customerStats?.customers || 0}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Inactive Customers"
              value={customerStats?.inactive || 0}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
        <div style={{ height: '300px', marginTop: '24px' }}>
          <Pie data={customerChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Card>

      {/* Interaction Statistics */}
      <Card title="Interaction Analytics">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="Total Interactions"
              value={interactionStats?.total || 0}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Scheduled"
              value={interactionStats?.scheduled || 0}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Completed"
              value={interactionStats?.completed || 0}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Cancelled"
              value={interactionStats?.cancelled || 0}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
        <div style={{ height: '300px', marginTop: '24px' }}>
          <Pie data={interactionChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Card>
    </div>
  );
};

export default Analytics; 