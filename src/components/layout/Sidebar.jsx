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
      key: 'hazard-inspection-group',
      icon: <SearchOutlined />,
      label: '隐患排查',
      children: [
        {
          key: '/vortex-inspection-process',
          label: '涡振隐患排查流程',
        },
        {
          key: '/hazard-inspection',
          label: '桥梁涡振隐患排查',
        },
      ],
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
      key: '/knowledge-base',
      icon: <BookOutlined />,
      label: '桥梁资料库',
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
