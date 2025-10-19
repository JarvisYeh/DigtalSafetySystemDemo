import React, { useEffect } from 'react';
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
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useDataContext } from '../context/DataContext';

function Dashboard() {
  const { getStatistics } = useDataContext();
  const statistics = getStatistics();
  
  useEffect(() => {
    console.log('Dashboard mounted, statistics:', statistics);
  }, [statistics]);

  const getChartOption = () => {
    return {
      title: {
        text: '桥梁类型分布',
        left: 'center',
        top: 20,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}座 ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: 20,
        left: 'center',
        textStyle: {
          fontSize: 12
        }
      },
      series: [
        {
          name: '桥梁类型',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\\n{c}座',
            fontSize: 11,
            color: '#333'
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 10
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            { value: 8, name: '悬索桥', itemStyle: { color: '#ff7875' } },
            { value: 12, name: '斜拉桥', itemStyle: { color: '#ffc069' } },
            { value: 15, name: '钢结构梁桥', itemStyle: { color: '#95de64' } },
            { value: 10, name: '其他桥型', itemStyle: { color: '#69c0ff' } }
          ]
        }
      ]
    };
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
        <Col xs={24} sm={12} lg={6} xl={4}>
          <Card>
            <Statistic
              title="管辖桥梁总数"
              value={statistics.totalBridges}
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} xl={5}>
          <Card>
            <Statistic
              title="隐患排查添加桥梁数量"
              value={statistics.hazardInspectionCount}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} xl={5}>
          <Card>
            <Statistic
              title="风险评估添加桥梁数量"
              value={statistics.riskAssessmentCount}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} xl={5}>
          <Card>
            <Statistic
              title="应急处置添加桥梁数量"
              value={statistics.emergencyResponseCount}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6} xl={5}>
          <Card>
            <Statistic
              title="桥梁资料库添加桥梁数量"
              value={statistics.knowledgeBaseCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="桥梁类型分布统计">
            <div style={{ width: '100%', height: '400px', minHeight: '400px' }}>
              <ReactECharts 
                option={getChartOption()} 
                style={{ width: '100%', height: '400px' }}
                opts={{ renderer: 'canvas', width: 'auto', height: 'auto' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
