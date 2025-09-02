import React from 'react';
import { Card, Row, Col, Statistic, Progress, Alert } from 'antd';
import { 
  SafetyOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined,
  WarningOutlined 
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

function Dashboard() {
  const riskDistributionOption = {
    title: {
      text: '风险等级分布',
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
        name: '风险等级',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 15, name: '重大风险', itemStyle: { color: '#ff4d4f' } },
          { value: 35, name: '较大风险', itemStyle: { color: '#faad14' } },
          { value: 120, name: '一般风险', itemStyle: { color: '#52c41a' } },
          { value: 80, name: '低风险', itemStyle: { color: '#1890ff' } }
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

  const trendOption = {
    title: {
      text: '风险管控趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['新增风险点', '已管控风险点', '待处理风险点']
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
        name: '新增风险点',
        type: 'line',
        data: [12, 19, 15, 25, 22, 18],
        itemStyle: { color: '#ff4d4f' }
      },
      {
        name: '已管控风险点',
        type: 'line',
        data: [8, 15, 12, 20, 18, 16],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '待处理风险点',
        type: 'line',
        data: [4, 4, 3, 5, 4, 2],
        itemStyle: { color: '#faad14' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Alert
        message="系统提醒"
        description="当前有 3 个重大风险点需要立即处理，15 个较大风险点需要重点关注。"
        type="warning"
        showIcon
        className="mb-6"
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总风险点数"
              value={250}
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="重大风险"
              value={15}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已管控风险"
              value={200}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="待处理风险"
              value={50}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="风险管控完成率" className="h-80">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>重大风险管控</span>
                  <span>80%</span>
                </div>
                <Progress percent={80} status="active" strokeColor="#ff4d4f" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>较大风险管控</span>
                  <span>90%</span>
                </div>
                <Progress percent={90} status="active" strokeColor="#faad14" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>一般风险管控</span>
                  <span>95%</span>
                </div>
                <Progress percent={95} status="active" strokeColor="#52c41a" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>低风险管控</span>
                  <span>98%</span>
                </div>
                <Progress percent={98} status="active" strokeColor="#1890ff" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="h-80">
            <ReactECharts option={riskDistributionOption} style={{ height: '240px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card className="h-96">
            <ReactECharts option={trendOption} style={{ height: '320px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
