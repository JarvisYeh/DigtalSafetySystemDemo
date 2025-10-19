import React, { useState } from 'react';
import { 
  Card, 
  Steps, 
  Button, 
  Row, 
  Col, 
  Timeline, 
  Descriptions, 
  Alert, 
  Progress, 
  Divider,
  List,
  Tag,
  Space,
  Collapse,
  Typography,
  Badge,
  Tooltip
} from 'antd';
import {
  FileTextOutlined,
  SearchOutlined,
  ExperimentOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  MonitorOutlined,
  ToolOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

const { Step } = Steps;
const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

function VortexInspectionProcess() {
  const [currentStep, setCurrentStep] = useState(0);

  const processSteps = [
    {
      title: '资料收集',
      icon: <FileTextOutlined />,
      description: '收集桥梁基础资料和相关信息',
      status: 'finish'
    },
    {
      title: '现场排查',
      icon: <SearchOutlined />,
      description: '实地检查桥梁结构和环境条件',
      status: 'process'
    },
    {
      title: '涡振隐患辨识与报告编制',
      icon: <ExperimentOutlined />,
      description: '分析数据并编制详细报告',
      status: 'wait'
    },
    {
      title: '后续跟踪',
      icon: <MonitorOutlined />,
      description: '持续监测和改进措施',
      status: 'wait'
    }
  ];

  const dataCollectionItems = [
    {
      category: '桥梁基础资料',
      items: [
        '基础信息、建设基本情况、运营情况',
        '设计施工图、竣工图、专题研究报告、文（竣）工验收资料'
      ]
    },
    {
      category: '桥梁检查资料',
      items: [
        '桥梁基本状况卡片',
        '初始检查报告或通车后首次定期检查报告',
        '近三年日常巡查记录表、经常检查记录表',
        '近五年定期检查报告、特殊检查报告',
        '近五年桥梁技术状况等级汇总表',
        '近五年监测评估报告、长期观测报表'
      ]
    },
    {
      category: '桥梁养护维修资料',
      items: [
        '近五年大中修条件关设计、施工、交竣工验收资料'
      ]
    },
    {
      category: '桥梁风险防控资料',
      items: [
        '桥梁风险防控资料应包括风险辨识手册、隐患排查记录及治理清单、定期监测评估报告、长期观测报表、安全风险评估与防控报告等'
      ]
    },
    {
      category: '特殊情况资料',
      items: [
        '地质灾害、气象灾害、超限运输等特殊事件的具体情况、损害程度、处置方案等'
      ]
    },
    {
      category: '涡振相关资料',
      items: [
        '桥梁运营以来涡振发生记录、为抑制涡振采取的措施以及具体的设计施工方案、桥址风场资料等、风洞实验相关资料'
      ]
    },
    {
      category: '交通情况资料',
      items: [
        '近五年年平均日交通量及车辆组成'
      ]
    }
  ];

  const inspectionItems = [
    {
      title: '现场排查前应根据桥梁所在区域的气候条件、交通流量等因素',
      description: '制定排查计划并确定排查的重点区域和项目'
    },
    {
      title: '现场排查前应做好设备和人员的准备工作',
      description: '确保检查设备正常运行，人员具备相应资质'
    },
    {
      title: '现场排查应包括主要涡振隐患排查、拉（吊）索涡振隐患排查和桥梁外部涡振隐患排查',
      description: '全面覆盖各类涡振风险点'
    }
  ];

  const identificationItems = [
    {
      title: '应根据现场排查结果',
      description: '评估桥梁在不同涡振流量、风速和风向条件下的涡振隐患'
    },
    {
      title: '应结合评估结果',
      description: '提出针对性的优化建议，如改进桥梁气动外形、增加或调整抑振装置等，减少涡振隐患'
    },
    {
      title: '应整理排查过程中的所有数据和分析结果',
      description: '编制详细的排查报告，报告应包括检查内容、检测方法、评估结果及整改建议等'
    }
  ];

  const followUpItems = [
    {
      title: '应根据排查报告中的整改建议',
      description: '进行必要的桥梁结构调整或改进，并安排后续的定期监测'
    },
    {
      title: '对于已进行整改的桥梁',
      description: '可通过后续监测验证涡振隐患的消除效果，确保整改措施的有效性'
    }
  ];

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Card title="资料收集" className="mt-4">
            <Alert 
              message="涡振隐患排查前，应对桥梁对象的基本信息与涡振相关的关键性信息进行系统调查。" 
              type="info" 
              showIcon 
              className="mb-4"
            />
            <Paragraph>
              涡振隐患排查前，应对桥梁对象的基本信息与涡振相关的关键性信息进行系统调查。
            </Paragraph>
            <Paragraph>
              资料收集应包括但不限于桥梁基础资料、桥梁检查资料、桥梁养护维修资料、桥梁隐患防控资料、特殊情况资料、涡振相关信息和交通情况资料。
            </Paragraph>
            
            <Collapse defaultActiveKey={['0']} className="mt-4">
              {dataCollectionItems.map((category, index) => (
                <Panel 
                  header={
                    <Space>
                      <DatabaseOutlined />
                      <Text strong>{category.category}</Text>
                    </Space>
                  } 
                  key={index}
                >
                  <List
                    size="small"
                    dataSource={category.items}
                    renderItem={(item, itemIndex) => (
                      <List.Item>
                        <Space>
                          <Badge count={itemIndex + 1} size="small" />
                          <Text>{item}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Panel>
              ))}
            </Collapse>
          </Card>
        );
      
      case 1:
        return (
          <Card title="现场排查" className="mt-4">
            <Timeline className="mt-4">
              {inspectionItems.map((item, index) => (
                <Timeline.Item 
                  key={index}
                  dot={<SearchOutlined className="timeline-clock-icon" />}
                  color="blue"
                >
                  <div>
                    <Paragraph className="mt-2">
                      <Text strong>{item.title}</Text>
                    </Paragraph>
                    <Paragraph>
                      {item.description}
                    </Paragraph>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        );
      
      case 2:
        return (
          <Card title="涡振隐患辨识与报告编制" className="mt-4">
            <Timeline className="mt-4">
              {identificationItems.map((item, index) => (
                <Timeline.Item 
                  key={index}
                  dot={<ExperimentOutlined className="timeline-clock-icon" />}
                  color="green"
                >
                  <div>
                    <Paragraph className="mt-2">
                      <Text strong>{item.title}</Text>
                    </Paragraph>
                    <Paragraph>
                      {item.description}
                    </Paragraph>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        );
      
      case 3:
        return (
          <Card title="后续跟踪" className="mt-4">
            <Timeline className="mt-4">
              {followUpItems.map((item, index) => (
                <Timeline.Item 
                  key={index}
                  dot={<MonitorOutlined className="timeline-clock-icon" />}
                  color="purple"
                >
                  <div>
                    <Paragraph className="mt-2">
                      <Text strong>{item.title}</Text>
                    </Paragraph>
                    <Paragraph>
                      {item.description}
                    </Paragraph>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <Card>
        <div className="mb-6">
          <Title level={2}>
            <Space>
              <WarningOutlined className="text-orange-500" />
              涡振隐患排查流程
            </Space>
          </Title>
          <Paragraph className="text-gray-600">
            按照标准化流程进行桥梁涡振隐患排查，确保排查工作的系统性和完整性
          </Paragraph>
        </div>

        <Steps 
          current={currentStep} 
          onChange={setCurrentStep}
          className="mb-6"
        >
          {processSteps.map((step, index) => (
            <Step 
              key={index}
              title={step.title} 
              description={step.description}
              icon={step.icon}
            />
          ))}
        </Steps>

        <Divider />

        {renderStepContent(currentStep)}

        <div className="mt-6 text-center">
          <Space>
            <Button 
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              上一步
            </Button>
            <Button 
              type="primary"
              disabled={currentStep === processSteps.length - 1}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              下一步
            </Button>
          </Space>
        </div>
      </Card>

      <Card title="流程概览" className="mt-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="text-center">
              <FileTextOutlined className="text-2xl text-blue-500 mb-2" />
              <div className="font-semibold">资料收集</div>
              <div className="text-sm text-gray-500">7大类资料</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="text-center">
              <SearchOutlined className="text-2xl text-green-500 mb-2" />
              <div className="font-semibold">现场排查</div>
              <div className="text-sm text-gray-500">3个关键环节</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="text-center">
              <ExperimentOutlined className="text-2xl text-orange-500 mb-2" />
              <div className="font-semibold">隐患辨识</div>
              <div className="text-sm text-gray-500">报告编制</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="text-center">
              <MonitorOutlined className="text-2xl text-purple-500 mb-2" />
              <div className="font-semibold">后续跟踪</div>
              <div className="text-sm text-gray-500">持续监测</div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default VortexInspectionProcess;