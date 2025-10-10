import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  SearchOutlined,
  LineChartOutlined,
  AlertOutlined,
  MonitorOutlined,
  CalendarOutlined,
  BookOutlined,
  SettingOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '系统概览',
    },
    {
      key: '/hazard-inspection',
      icon: <SearchOutlined />,
      label: '隐患排查',
    },
    {
      key: '/risk-assessment',
      icon: <LineChartOutlined />,
      label: '风险评估',
    },
    {
      key: '/emergency-response',
      icon: <AlertOutlined />,
      label: '应急处置',
    },
    {
      key: '/monitoring-equipment',
      icon: <MonitorOutlined />,
      label: '监测设备',
    },
    {
      key: '/inspection-plan',
      icon: <CalendarOutlined />,
      label: '排查计划',
    },
    {
      key: '/knowledge-base',
      icon: <BookOutlined />,
      label: '专家知识库',
    },
    {
      key: '/system-settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider width={280} className="bg-[#001529]">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="h-full border-r-0"
        theme="dark"
      />
    </Sider>
  );
}

export default Sidebar;
