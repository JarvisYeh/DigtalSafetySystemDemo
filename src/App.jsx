import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import BridgeVortexVibration from './pages/BridgeVortexVibration';

const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout>
        <Sidebar />
        <Layout>
          <Content className="p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/hazard-inspection" element={<BridgeVortexVibration />} />
              <Route path="/risk-assessment" element={<BridgeVortexVibration />} />
              <Route path="/emergency-response" element={<BridgeVortexVibration />} />
              <Route path="/monitoring-equipment" element={<BridgeVortexVibration />} />
              <Route path="/inspection-plan" element={<BridgeVortexVibration />} />
              <Route path="/knowledge-base" element={<BridgeVortexVibration />} />
              <Route path="/system-settings" element={<BridgeVortexVibration />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
