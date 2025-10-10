import React from 'react';
import { Layout, Typography, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function Header() {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <AntHeader className="flex items-center justify-between px-6 bg-[#001529]">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">桥</span>
        </div>
        <Title level={3} className="text-white m-0" style={{ color: '#ffffff' }}>
          大跨桥梁涡振风险管控系统
        </Title>
      </div>
      
      <div className="flex items-center">
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space className="cursor-pointer text-white hover:text-blue-300 transition-colors">
            <Avatar size="small" icon={<UserOutlined />} />
            <span>管理员</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
}

export default Header;
