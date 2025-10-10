import React from 'react';
import { Card, Row, Col, Statistic, Progress, Alert } from 'antd';
import { 
  SafetyOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  MonitorOutlined,
  AlertOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

function Dashboard() {
  const bridgeTypeDistributionOption = {
    title: {
      text: '桥梁类型分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '桥梁类型',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 8, name: '悬索桥', itemStyle: { color: '#ff4d4f' } },
          { value: 12, name: '斜拉桥', itemStyle: { color: '#faad14' } },
          { value: 15, name: '钢结构梁桥', itemStyle: { color: '#52c41a' } },
          { value: 10, name: '其他桥型', itemStyle: { color: '#1890ff' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const vibrationTrendOption = {
    title: {
      text: '涡振监测趋势',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['隐患排查', '风险评估', '应急事件'],
      top: 40
    },
    grid: {
      top: 80,
      left: 60,
      right: 40,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '隐患排查',
        type: 'line',
        data: [8, 12, 15, 18, 23, 25],
        itemStyle: { color: '#1890ff' }
      },
      {
        name: '风险评估',
        type: 'line',
        data: [6, 10, 12, 15, 18, 20],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '应急事件',
        type: 'line',
        data: [1, 0, 2, 1, 0, 2],
        itemStyle: { color: '#ff4d4f' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Alert
        message="涡振监测提醒"
        description="当前有 3 座桥梁存在重大涡振隐患，2 起应急事件正在处置中，建议加强监测和管控措施。"
        type="warning"
        showIcon
        className="mb-6"
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="管辖桥梁总数"
              value={45}
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="高风险桥梁"
              value={3}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="在线监测桥梁"
              value={32}
              prefix={<MonitorOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="应急事件"
              value={2}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="抑振装置数量"
              value={156}
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已完成排查"
              value={38}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="待执行排查"
              value={7}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="专家报告"
              value={25}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="涡振风险管控完成率" className="h-80">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>主梁涡振管控</span>
                  <span>85%</span>
                </div>
                <Progress percent={85} status="active" strokeColor="#1890ff" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>拉索涡振管控</span>
                  <span>78%</span>
                </div>
                <Progress percent={78} status="active" strokeColor="#faad14" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>抑振装置维护</span>
                  <span>92%</span>
                </div>
                <Progress percent={92} status="active" strokeColor="#52c41a" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>监测设备运行</span>
                  <span>96%</span>
                </div>
                <Progress percent={96} status="active" strokeColor="#722ed1" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="h-80">
            <ReactECharts option={bridgeTypeDistributionOption} style={{ height: '240px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card className="h-96">
            <ReactECharts option={vibrationTrendOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
