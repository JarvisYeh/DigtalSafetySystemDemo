import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  SafetyOutlined,
  ExclamationCircleOutlined,
  UnorderedListOutlined,
  ControlOutlined,
  IdcardOutlined,
  AuditOutlined,
  NotificationOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ToolOutlined
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
      key: 'risk-management',
      icon: <SafetyOutlined />,
      label: '风险管控',
      children: [
        {
          key: '/risk-point-division',
          icon: <SafetyOutlined />,
          label: '风险点划分',
        },
        {
          key: '/hazard-identification',
          icon: <ExclamationCircleOutlined />,
          label: '危险源辨识',
        },
        {
          key: '/risk-grading-list',
          icon: <UnorderedListOutlined />,
          label: '安全风险分级清单',
        },
        {
          key: '/risk-control-list',
          icon: <ControlOutlined />,
          label: '安全风险分级管控清单',
        },
        {
          key: '/position-risk-card',
          icon: <IdcardOutlined />,
          label: '岗位风险告知卡',
        },
        {
          key: '/position-risk-inspection',
          icon: <AuditOutlined />,
          label: '岗位风险管控排查表',
        },
        {
          key: '/enterprise-risk-announcement',
          icon: <NotificationOutlined />,
          label: '企业风险公告',
        },
        {
          key: '/evaluation-method-settings',
          icon: <SettingOutlined />,
          label: '评价方法设置',
        },
        {
          key: '/major-hazard-registry',
          icon: <DatabaseOutlined />,
          label: '较大或重大危险源台账',
        },
        {
          key: '/identification-method-settings',
          icon: <ToolOutlined />,
          label: '辨识方法设置',
        },
      ],
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
        defaultOpenKeys={['risk-management']}
        items={menuItems}
        onClick={handleMenuClick}
        className="h-full border-r-0"
        theme="dark"
      />
    </Sider>
  );
}

export default Sidebar;
