import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import BridgeVortexVibration from './pages/BridgeVortexVibration';
import VortexInspectionProcess from './pages/VortexInspectionProcess';
import { DataProvider } from './context/DataContext';

const { Content } = Layout;

function App() {
  return (
    <DataProvider>
      <Layout className="min-h-screen">
        <Header />
        <Layout>
          <Sidebar />
          <Layout>
            <Content className="p-6 bg-gray-50">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vortex-inspection-process" element={<VortexInspectionProcess />} />
                <Route path="/hazard-inspection" element={<BridgeVortexVibration pageType="hazard-inspection" />} />
                <Route path="/risk-assessment" element={<BridgeVortexVibration pageType="risk-assessment" />} />
                <Route path="/emergency-response" element={<BridgeVortexVibration pageType="emergency-response" />} />
                <Route path="/knowledge-base" element={<BridgeVortexVibration pageType="knowledge-base" />} />
                <Route path="/system-settings" element={<BridgeVortexVibration pageType="system-settings" />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </DataProvider>
  );
}

export default App;
