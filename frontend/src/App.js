import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import InteractionList from './components/InteractionList';
import InteractionForm from './components/InteractionForm';
import Analytics from './components/Analytics';
// ... existing imports ...

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">CRM System</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/customers">Customers</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/interactions">Interactions</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/analytics">Analytics</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/new" element={<CustomerForm />} />
                <Route path="/customers/edit/:id" element={<CustomerForm />} />
                <Route path="/interactions" element={<InteractionList />} />
                <Route path="/interactions/new" element={<InteractionForm />} />
                <Route path="/interactions/edit/:id" element={<InteractionForm />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/" element={<CustomerList />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App; 