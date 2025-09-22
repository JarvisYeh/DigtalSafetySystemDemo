import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import RiskPointDivision from './pages/RiskPointDivision';
import HazardIdentification from './pages/HazardIdentification';
import RiskGradingList from './pages/RiskGradingList';
import RiskControlList from './pages/RiskControlList';
import PositionRiskCard from './pages/PositionRiskCard';
import PositionRiskInspection from './pages/PositionRiskInspection';
import EnterpriseRiskAnnouncement from './pages/EnterpriseRiskAnnouncement';
import EvaluationMethodSettings from './pages/EvaluationMethodSettings';
import MajorHazardRegistry from './pages/MajorHazardRegistry';
import IdentificationMethodSettings from './pages/IdentificationMethodSettings';
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
              <Route path="/risk-point-division" element={<RiskPointDivision />} />
              <Route path="/hazard-identification" element={<HazardIdentification />} />
              <Route path="/risk-grading-list" element={<RiskGradingList />} />
              <Route path="/risk-control-list" element={<RiskControlList />} />
              <Route path="/position-risk-card" element={<PositionRiskCard />} />
              <Route path="/position-risk-inspection" element={<PositionRiskInspection />} />
              <Route path="/enterprise-risk-announcement" element={<EnterpriseRiskAnnouncement />} />
              <Route path="/evaluation-method-settings" element={<EvaluationMethodSettings />} />
              <Route path="/major-hazard-registry" element={<MajorHazardRegistry />} />
              <Route path="/identification-method-settings" element={<IdentificationMethodSettings />} />
              <Route path="/bridge-vortex-vibration" element={<BridgeVortexVibration />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
