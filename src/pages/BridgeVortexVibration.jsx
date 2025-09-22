import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  message,
  Tag,
  Row,
  Col,
  Statistic,
  Alert,
  Progress,
  Descriptions,
  Upload,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox,
  Timeline,
  Steps,
  Divider,
  Badge
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExportOutlined,
  EyeOutlined,
  WarningOutlined,
  SafetyOutlined,
  AlertOutlined,
  FileTextOutlined,
  UploadOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Step } = Steps;

function BridgeVortexVibration() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 隐患排查数据
  const [hazardData, setHazardData] = useState([
    {
      key: '1',
      id: 'BVH001',
      bridgeName: '某大跨径悬索桥',
      bridgeType: '悬索桥',
      mainSpan: 1200,
      location: '某市某区',
      inspectionDate: '2024-01-15',
      inspectionType: '定期排查',
      riskLevel: '较大',
      status: '已完成',
      inspector: '张工程师',
      issues: ['主梁气动外形轻微缺陷', '部分抑振装置松动', '桥面附属物位置不当'],
      recommendations: ['加强监测', '维修抑振装置', '调整附属物位置'],
      mainBeamCheck: {
        aerodynamicShape: '良好',
        sectionDeviation: '符合标准',
        surfaceDefects: '轻微缺陷',
        attachments: '位置需调整'
      },
      cableCheck: {
        appearance: '良好',
        connections: '正常',
        surface: '无异常',
        frequency: '2.35Hz'
      },
      vibrationSuppression: {
        devices: '部分松动',
        effectiveness: '需改进',
        maintenance: '需加强'
      }
    },
    {
      key: '2',
      id: 'BVH002',
      bridgeName: '某斜拉桥',
      bridgeType: '斜拉桥',
      mainSpan: 800,
      location: '某市某区',
      inspectionDate: '2024-01-20',
      inspectionType: '专项排查',
      riskLevel: '重大',
      status: '待处理',
      inspector: '李工程师',
      issues: ['拉索频率异常', '风场环境恶劣', '阻尼比偏低'],
      recommendations: ['立即安装抑振装置', '加强监测', '优化阻尼系统'],
      mainBeamCheck: {
        aerodynamicShape: '需改进',
        sectionDeviation: '超出标准',
        surfaceDefects: '明显缺陷',
        attachments: '位置合理'
      },
      cableCheck: {
        appearance: '需检修',
        connections: '松动',
        surface: '有损伤',
        frequency: '异常'
      },
      vibrationSuppression: {
        devices: '缺失',
        effectiveness: '差',
        maintenance: '急需'
      }
    }
  ]);

  const [riskAssessmentData, setRiskAssessmentData] = useState([
    {
      key: '1',
      id: 'BVR001',
      bridgeName: '某大跨径悬索桥',
      assessmentDate: '2024-01-16',
      windSpeed: 25.5,
      turbulenceIntensity: 0.12,
      attackAngle: 3.2,
      mainBeamFreq: 0.18,
      torsionalFreq: 0.25,
      cableFreq: 2.35,
      dampingRatio: 0.008,
      vibrationAmplitude: 0.15,
      verticalAmplitude: 0.12,
      torsionalAmplitude: 0.08,
      riskCategory: '3类',
      overallRisk: '较大',
      assessor: '王工程师',
      windFieldEvaluation: {
        windSpeed: '3级',
        turbulence: '2级',
        attackAngle: '1级'
      },
      bridgeEvaluation: {
        aerodynamics: '2级',
        vibrationChar: '3级',
        suppression: '2级'
      }
    },
    {
      key: '2',
      id: 'BVR002',
      bridgeName: '某斜拉桥',
      assessmentDate: '2024-01-21',
      windSpeed: 32.8,
      turbulenceIntensity: 0.18,
      attackAngle: 5.1,
      mainBeamFreq: 0.22,
      torsionalFreq: 0.31,
      cableFreq: 1.85,
      dampingRatio: 0.006,
      vibrationAmplitude: 0.28,
      verticalAmplitude: 0.25,
      torsionalAmplitude: 0.15,
      riskCategory: '4类',
      overallRisk: '重大',
      assessor: '赵工程师',
      windFieldEvaluation: {
        windSpeed: '4级',
        turbulence: '3级',
        attackAngle: '2级'
      },
      bridgeEvaluation: {
        aerodynamics: '4级',
        vibrationChar: '4级',
        suppression: '3级'
      }
    }
  ]);

  const [emergencyData, setEmergencyData] = useState([
    {
      key: '1',
      id: 'BVE001',
      bridgeName: '某斜拉桥',
      eventTime: '2024-01-21 14:30',
      eventType: '拉索涡振',
      vibrationLevel: '中等',
      windSpeed: 18.2,
      responseTime: '15分钟',
      measures: ['安装临时阻尼器', '限制交通', '加强监测'],
      status: '已处置',
      responsible: '应急小组A',
      triggerCondition: '振动频率持续5分钟超过阈值',
      processingSteps: [
        { step: '快速研判', time: '5分钟', status: '完成' },
        { step: '应急响应', time: '10分钟', status: '完成' },
        { step: '现场处置', time: '30分钟', status: '完成' },
        { step: '效果评估', time: '15分钟', status: '完成' },
        { step: '恢复运行', time: '10分钟', status: '完成' }
      ],
      suppressionTech: {
        type: '柔性连接装置法',
        materials: '钢丝绳、橡胶垫',
        effectiveness: '良好'
      },
      postAssessment: {
        structuralHealth: '正常',
        vibrationChar: '恢复正常',
        tempMeasureEffect: '有效'
      }
    },
    {
      key: '2',
      id: 'BVE002',
      bridgeName: '某悬索桥',
      eventTime: '2024-01-25 09:15',
      eventType: '主梁涡振',
      vibrationLevel: '严重',
      windSpeed: 28.5,
      responseTime: '8分钟',
      measures: ['启动应急预案', '交通管制', '安装临时抑振装置'],
      status: '处置中',
      responsible: '应急小组B',
      triggerCondition: '主梁振幅超过L/1000且持续3分钟',
      processingSteps: [
        { step: '快速研判', time: '3分钟', status: '完成' },
        { step: '应急响应', time: '5分钟', status: '完成' },
        { step: '现场处置', time: '45分钟', status: '进行中' },
        { step: '效果评估', time: '-', status: '待进行' },
        { step: '恢复运行', time: '-', status: '待进行' }
      ],
      suppressionTech: {
        type: '加装简易阻尼装置',
        materials: '阻尼器、支撑结构',
        effectiveness: '评估中'
      }
    }
  ]);

  // 统计数据
  const statistics = {
    totalBridges: 25,
    inspectedBridges: 23,
    highRiskBridges: 3,
    emergencyEvents: 2,
    completionRate: 92,
    monitoringBridges: 18,
    suppressionDevices: 45,
    riskCategories: {
      category1: 5,
      category2: 8,
      category3: 7,
      category4: 3,
      category5: 2
    }
  };

  // 隐患排查表格列
  const hazardColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '桥梁名称',
      dataIndex: 'bridgeName',
      key: 'bridgeName',
      width: 150,
    },
    {
      title: '桥梁类型',
      dataIndex: 'bridgeType',
      key: 'bridgeType',
      width: 100,
    },
    {
      title: '主跨(m)',
      dataIndex: 'mainSpan',
      key: 'mainSpan',
      width: 80,
    },
    {
      title: '排查日期',
      dataIndex: 'inspectionDate',
      key: 'inspectionDate',
      width: 110,
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 100,
      render: (level) => {
        const colorMap = {
          '重大': 'red',
          '较大': 'orange',
          '一般': 'green',
          '低': 'blue',
        };
        return <Tag color={colorMap[level]}>{level}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已完成' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewHazard(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditHazard(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 风险评估表格列
  const riskColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '桥梁名称',
      dataIndex: 'bridgeName',
      key: 'bridgeName',
      width: 150,
    },
    {
      title: '评估日期',
      dataIndex: 'assessmentDate',
      key: 'assessmentDate',
      width: 110,
    },
    {
      title: '风速(m/s)',
      dataIndex: 'windSpeed',
      key: 'windSpeed',
      width: 90,
    },
    {
      title: '湍流强度',
      dataIndex: 'turbulenceIntensity',
      key: 'turbulenceIntensity',
      width: 100,
    },
    {
      title: '风险类别',
      dataIndex: 'riskCategory',
      key: 'riskCategory',
      width: 100,
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: '综合风险',
      dataIndex: 'overallRisk',
      key: 'overallRisk',
      width: 100,
      render: (risk) => {
        const colorMap = {
          '重大': 'red',
          '较大': 'orange',
          '一般': 'green',
          '低': 'blue',
        };
        return <Tag color={colorMap[risk]}>{risk}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewRisk(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditRisk(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 应急处置表格列
  const emergencyColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '桥梁名称',
      dataIndex: 'bridgeName',
      key: 'bridgeName',
      width: 150,
    },
    {
      title: '事件时间',
      dataIndex: 'eventTime',
      key: 'eventTime',
      width: 140,
    },
    {
      title: '事件类型',
      dataIndex: 'eventType',
      key: 'eventType',
      width: 100,
    },
    {
      title: '振动程度',
      dataIndex: 'vibrationLevel',
      key: 'vibrationLevel',
      width: 100,
      render: (level) => {
        const colorMap = {
          '轻微': 'green',
          '中等': 'orange',
          '严重': 'red',
        };
        return <Tag color={colorMap[level]}>{level}</Tag>;
      },
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已处置' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewEmergency(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditEmergency(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 处理函数
  const handleAdd = (type) => {
    setModalType(type);
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleViewHazard = (record) => {
    Modal.info({
      title: '隐患排查详情报告',
      width: 1000,
      content: (
        <div className="space-y-6 mt-4">
          <Descriptions title="基本信息" column={2} bordered>
            <Descriptions.Item label="编号">{record.id}</Descriptions.Item>
            <Descriptions.Item label="桥梁名称">{record.bridgeName}</Descriptions.Item>
            <Descriptions.Item label="桥梁类型">{record.bridgeType}</Descriptions.Item>
            <Descriptions.Item label="主跨长度">{record.mainSpan}m</Descriptions.Item>
            <Descriptions.Item label="位置">{record.location}</Descriptions.Item>
            <Descriptions.Item label="排查日期">{record.inspectionDate}</Descriptions.Item>
            <Descriptions.Item label="排查类型">{record.inspectionType}</Descriptions.Item>
            <Descriptions.Item label="风险等级">
              <Tag color={record.riskLevel === '重大' ? 'red' : 'orange'}>{record.riskLevel}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="排查人员">{record.inspector}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={record.status === '已完成' ? 'green' : 'orange'}>{record.status}</Tag>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <div>
            <h4 className="font-semibold mb-3 text-blue-600">
              <SafetyOutlined className="mr-2" />
              主梁气动外形评估
            </h4>
            <Row gutter={16}>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">气动外形</div>
                  <div className={`font-semibold ${record.mainBeamCheck.aerodynamicShape === '良好' ? 'text-green-600' : 'text-orange-600'}`}>
                    {record.mainBeamCheck.aerodynamicShape}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">截面偏差</div>
                  <div className={`font-semibold ${record.mainBeamCheck.sectionDeviation === '符合标准' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.mainBeamCheck.sectionDeviation}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">表面缺陷</div>
                  <div className={`font-semibold ${record.mainBeamCheck.surfaceDefects === '无缺陷' ? 'text-green-600' : 'text-orange-600'}`}>
                    {record.mainBeamCheck.surfaceDefects}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">附属物位置</div>
                  <div className={`font-semibold ${record.mainBeamCheck.attachments === '位置合理' ? 'text-green-600' : 'text-orange-600'}`}>
                    {record.mainBeamCheck.attachments}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-purple-600">
              <ThunderboltOutlined className="mr-2" />
              拉索外形评估
            </h4>
            <Row gutter={16}>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">外观检查</div>
                  <div className={`font-semibold ${record.cableCheck.appearance === '良好' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.cableCheck.appearance}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">连接部位</div>
                  <div className={`font-semibold ${record.cableCheck.connections === '正常' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.cableCheck.connections}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">表面状况</div>
                  <div className={`font-semibold ${record.cableCheck.surface === '无异常' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.cableCheck.surface}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">频率检测</div>
                  <div className="font-semibold text-blue-600">
                    {record.cableCheck.frequency}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-green-600">
              <EnvironmentOutlined className="mr-2" />
              抑振措施评估
            </h4>
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">抑振装置</div>
                  <div className={`font-semibold ${record.vibrationSuppression.devices === '正常' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.vibrationSuppression.devices}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">抑振效果</div>
                  <div className={`font-semibold ${record.vibrationSuppression.effectiveness === '良好' ? 'text-green-600' : 'text-orange-600'}`}>
                    {record.vibrationSuppression.effectiveness}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">维护状况</div>
                  <div className={`font-semibold ${record.vibrationSuppression.maintenance === '良好' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.vibrationSuppression.maintenance}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Divider />
          
          <div>
            <h4 className="font-semibold mb-2 text-red-600">
              <ExclamationCircleOutlined className="mr-2" />
              发现问题
            </h4>
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
              <ul className="list-disc list-inside space-y-1">
                {record.issues.map((issue, index) => (
                  <li key={index} className="text-red-700">{issue}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-blue-600">
              <CheckCircleOutlined className="mr-2" />
              处理建议
            </h4>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              <ul className="list-disc list-inside space-y-1">
                {record.recommendations.map((rec, index) => (
                  <li key={index} className="text-blue-700">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    });
  };

  const handleViewRisk = (record) => {
    Modal.info({
      title: '风险评估详情报告',
      width: 1000,
      content: (
        <div className="space-y-6 mt-4">
          <Descriptions title="基本信息" column={2} bordered>
            <Descriptions.Item label="编号">{record.id}</Descriptions.Item>
            <Descriptions.Item label="桥梁名称">{record.bridgeName}</Descriptions.Item>
            <Descriptions.Item label="评估日期">{record.assessmentDate}</Descriptions.Item>
            <Descriptions.Item label="评估人员">{record.assessor}</Descriptions.Item>
            <Descriptions.Item label="风险类别">
              <Tag color="blue">{record.riskCategory}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="综合风险">
              <Tag color={record.overallRisk === '重大' ? 'red' : 'orange'}>{record.overallRisk}</Tag>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <div>
            <h4 className="font-semibold mb-3 text-blue-600">
              <EnvironmentOutlined className="mr-2" />
              桥梁所在风场评估
            </h4>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" className="text-center">
                  <Statistic
                    title="风场风速"
                    value={record.windSpeed}
                    suffix="m/s"
                    valueStyle={{ color: '#1890ff' }}
                  />
                  <div className="mt-2">
                    <Tag color={record.windFieldEvaluation.windSpeed === '1级' ? 'green' : record.windFieldEvaluation.windSpeed === '2级' ? 'blue' : record.windFieldEvaluation.windSpeed === '3级' ? 'orange' : 'red'}>
                      {record.windFieldEvaluation.windSpeed}
                    </Tag>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="text-center">
                  <Statistic
                    title="湍流强度"
                    value={record.turbulenceIntensity}
                    precision={3}
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <div className="mt-2">
                    <Tag color={record.windFieldEvaluation.turbulence === '1级' ? 'green' : record.windFieldEvaluation.turbulence === '2级' ? 'blue' : 'orange'}>
                      {record.windFieldEvaluation.turbulence}
                    </Tag>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="text-center">
                  <Statistic
                    title="来流攻角"
                    value={record.attackAngle}
                    suffix="°"
                    precision={1}
                    valueStyle={{ color: '#faad14' }}
                  />
                  <div className="mt-2">
                    <Tag color={record.windFieldEvaluation.attackAngle === '1级' ? 'green' : 'blue'}>
                      {record.windFieldEvaluation.attackAngle}
                    </Tag>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-purple-600">
              <SafetyOutlined className="mr-2" />
              桥梁抗涡振能力评估
            </h4>
            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" title="振动特性参数">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>主梁竖向频率:</span>
                      <span className="font-semibold text-blue-600">{record.mainBeamFreq} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>主梁扭转频率:</span>
                      <span className="font-semibold text-blue-600">{record.torsionalFreq} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>拉索频率:</span>
                      <span className="font-semibold text-purple-600">{record.cableFreq} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>阻尼比:</span>
                      <span className="font-semibold text-green-600">{record.dampingRatio}</span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="振幅评估">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>总振动振幅:</span>
                      <span className="font-semibold text-red-600">{record.vibrationAmplitude} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>竖向振幅:</span>
                      <span className="font-semibold text-orange-600">{record.verticalAmplitude} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>扭转振幅:</span>
                      <span className="font-semibold text-yellow-600">{record.torsionalAmplitude} m</span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-green-600">
              <CheckCircleOutlined className="mr-2" />
              评估等级汇总
            </h4>
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-center p-4 bg-blue-50 rounded border">
                  <div className="text-sm text-gray-600 mb-2">气动外形评估</div>
                  <Tag size="large" color={record.bridgeEvaluation.aerodynamics === '1级' ? 'green' : record.bridgeEvaluation.aerodynamics === '2级' ? 'blue' : record.bridgeEvaluation.aerodynamics === '3级' ? 'orange' : 'red'}>
                    {record.bridgeEvaluation.aerodynamics}
                  </Tag>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-4 bg-purple-50 rounded border">
                  <div className="text-sm text-gray-600 mb-2">振动特性评估</div>
                  <Tag size="large" color={record.bridgeEvaluation.vibrationChar === '1级' ? 'green' : record.bridgeEvaluation.vibrationChar === '2级' ? 'blue' : record.bridgeEvaluation.vibrationChar === '3级' ? 'orange' : 'red'}>
                    {record.bridgeEvaluation.vibrationChar}
                  </Tag>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-4 bg-green-50 rounded border">
                  <div className="text-sm text-gray-600 mb-2">抑振措施评估</div>
                  <Tag size="large" color={record.bridgeEvaluation.suppression === '1级' ? 'green' : record.bridgeEvaluation.suppression === '2级' ? 'blue' : 'orange'}>
                    {record.bridgeEvaluation.suppression}
                  </Tag>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ),
    });
  };

  const handleViewEmergency = (record) => {
    Modal.info({
      title: '应急处置详情报告',
      width: 1000,
      content: (
        <div className="space-y-6 mt-4">
          <Descriptions title="事件基本信息" column={2} bordered>
            <Descriptions.Item label="编号">{record.id}</Descriptions.Item>
            <Descriptions.Item label="桥梁名称">{record.bridgeName}</Descriptions.Item>
            <Descriptions.Item label="事件时间">{record.eventTime}</Descriptions.Item>
            <Descriptions.Item label="事件类型">{record.eventType}</Descriptions.Item>
            <Descriptions.Item label="振动程度">
              <Tag color={record.vibrationLevel === '严重' ? 'red' : record.vibrationLevel === '中等' ? 'orange' : 'green'}>{record.vibrationLevel}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="当时风速">{record.windSpeed} m/s</Descriptions.Item>
            <Descriptions.Item label="响应时间">{record.responseTime}</Descriptions.Item>
            <Descriptions.Item label="责任单位">{record.responsible}</Descriptions.Item>
            <Descriptions.Item label="处置状态">
              <Tag color={record.status === '已处置' ? 'green' : record.status === '处置中' ? 'orange' : 'red'}>{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="启动条件">{record.triggerCondition}</Descriptions.Item>
          </Descriptions>

          <Divider />

          <div>
            <h4 className="font-semibold mb-3 text-blue-600">
              <ClockCircleOutlined className="mr-2" />
              应急处置流程
            </h4>
            <Steps current={record.processingSteps.findIndex(step => step.status !== '完成')} size="small">
              {record.processingSteps.map((step, index) => (
                <Step
                  key={index}
                  title={step.step}
                  description={step.time !== '-' ? `用时: ${step.time}` : ''}
                  status={step.status === '完成' ? 'finish' : step.status === '进行中' ? 'process' : 'wait'}
                  icon={step.status === '完成' ? <CheckCircleOutlined /> : step.status === '进行中' ? <SyncOutlined spin /> : <ClockCircleOutlined />}
                />
              ))}
            </Steps>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-green-600">
              <ThunderboltOutlined className="mr-2" />
              抑振技术措施
            </h4>
            <Card size="small">
              <Row gutter={16}>
                <Col span={8}>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">技术类型</div>
                    <div className="font-semibold text-blue-600 mt-1">{record.suppressionTech.type}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">使用材料</div>
                    <div className="font-semibold text-purple-600 mt-1">{record.suppressionTech.materials}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">抑振效果</div>
                    <div className={`font-semibold mt-1 ${record.suppressionTech.effectiveness === '良好' ? 'text-green-600' : 'text-orange-600'}`}>
                      {record.suppressionTech.effectiveness}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-purple-600">
              <ExclamationCircleOutlined className="mr-2" />
              处置措施详情
            </h4>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              <Timeline>
                {record.measures.map((measure, index) => (
                  <Timeline.Item key={index} color="blue">
                    {measure}
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>

          {record.postAssessment && (
            <div>
              <h4 className="font-semibold mb-3 text-orange-600">
                <CheckCircleOutlined className="mr-2" />
                事件后评估
              </h4>
              <Row gutter={16}>
                <Col span={8}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">结构健康状况</div>
                    <div className={`font-semibold ${record.postAssessment.structuralHealth === '正常' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.postAssessment.structuralHealth}
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">振动特性</div>
                    <div className={`font-semibold ${record.postAssessment.vibrationChar === '恢复正常' ? 'text-green-600' : 'text-orange-600'}`}>
                      {record.postAssessment.vibrationChar}
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">临时措施效果</div>
                    <div className={`font-semibold ${record.postAssessment.tempMeasureEffect === '有效' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.postAssessment.tempMeasureEffect}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      ),
    });
  };

  const handleEditHazard = (record) => {
    setModalType('hazard');
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleEditRisk = (record) => {
    setModalType('risk');
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleEditEmergency = (record) => {
    setModalType('emergency');
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modalType === 'hazard') {
        if (editingRecord) {
          setHazardData(hazardData.map(item => 
            item.key === editingRecord.key ? { ...item, ...values } : item
          ));
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVH${String(hazardData.length + 1).padStart(3, '0')}`,
            ...values,
            status: '待处理',
          };
          setHazardData([...hazardData, newRecord]);
        }
      } else if (modalType === 'risk') {
        if (editingRecord) {
          setRiskAssessmentData(riskAssessmentData.map(item => 
            item.key === editingRecord.key ? { ...item, ...values } : item
          ));
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVR${String(riskAssessmentData.length + 1).padStart(3, '0')}`,
            ...values,
          };
          setRiskAssessmentData([...riskAssessmentData, newRecord]);
        }
      } else if (modalType === 'emergency') {
        if (editingRecord) {
          setEmergencyData(emergencyData.map(item => 
            item.key === editingRecord.key ? { ...item, ...values } : item
          ));
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVE${String(emergencyData.length + 1).padStart(3, '0')}`,
            ...values,
            status: '处置中',
          };
          setEmergencyData([...emergencyData, newRecord]);
        }
      }
      
      message.success(editingRecord ? '编辑成功' : '添加成功');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const renderHazardForm = () => (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="bridgeName"
            label="桥梁名称"
            rules={[{ required: true, message: '请输入桥梁名称' }]}
          >
            <Input placeholder="请输入桥梁名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="bridgeType"
            label="桥梁类型"
            rules={[{ required: true, message: '请选择桥梁类型' }]}
          >
            <Select placeholder="请选择桥梁类型">
              <Option value="悬索桥">悬索桥</Option>
              <Option value="斜拉桥">斜拉桥</Option>
              <Option value="拱桥">拱桥</Option>
              <Option value="梁桥">梁桥</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="mainSpan"
            label="主跨长度(m)"
            rules={[{ required: true, message: '请输入主跨长度' }]}
          >
            <InputNumber min={0} placeholder="请输入主跨长度" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="location"
            label="桥梁位置"
            rules={[{ required: true, message: '请输入桥梁位置' }]}
          >
            <Input placeholder="请输入桥梁位置" />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="inspectionDate"
            label="排查日期"
            rules={[{ required: true, message: '请选择排查日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="inspectionType"
            label="排查类型"
            rules={[{ required: true, message: '请选择排查类型' }]}
          >
            <Select placeholder="请选择排查类型">
              <Option value="定期排查">定期排查</Option>
              <Option value="专项排查">专项排查</Option>
              <Option value="应急排查">应急排查</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="inspector"
            label="排查人员"
            rules={[{ required: true, message: '请输入排查人员' }]}
          >
            <Input placeholder="请输入排查人员" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="riskLevel"
            label="风险等级"
            rules={[{ required: true, message: '请选择风险等级' }]}
          >
            <Select placeholder="请选择风险等级">
              <Option value="重大">重大</Option>
              <Option value="较大">较大</Option>
              <Option value="一般">一般</Option>
              <Option value="低">低</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">主梁气动外形检查</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={['mainBeamCheck', 'aerodynamicShape']}
            label="气动外形设计"
            rules={[{ required: true, message: '请选择气动外形状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="优秀">优秀</Option>
              <Option value="良好">良好</Option>
              <Option value="需改进">需改进</Option>
              <Option value="不合格">不合格</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['mainBeamCheck', 'sectionDeviation']}
            label="主梁截面尺寸偏差"
            rules={[{ required: true, message: '请选择截面偏差状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="符合标准">符合标准</Option>
              <Option value="轻微偏差">轻微偏差</Option>
              <Option value="超出标准">超出标准</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={['mainBeamCheck', 'surfaceDefects']}
            label="表面缺陷"
            rules={[{ required: true, message: '请选择表面缺陷状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="无缺陷">无缺陷</Option>
              <Option value="轻微缺陷">轻微缺陷</Option>
              <Option value="明显缺陷">明显缺陷</Option>
              <Option value="严重缺陷">严重缺陷</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['mainBeamCheck', 'attachments']}
            label="附属物位置"
            rules={[{ required: true, message: '请选择附属物位置状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="位置合理">位置合理</Option>
              <Option value="位置需调整">位置需调整</Option>
              <Option value="位置不当">位置不当</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">拉索外形检查</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={['cableCheck', 'appearance']}
            label="拉索外观"
            rules={[{ required: true, message: '请选择拉索外观状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="良好">良好</Option>
              <Option value="需检修">需检修</Option>
              <Option value="严重损坏">严重损坏</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['cableCheck', 'connections']}
            label="连接部位"
            rules={[{ required: true, message: '请选择连接部位状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="正常">正常</Option>
              <Option value="松动">松动</Option>
              <Option value="损坏">损坏</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={['cableCheck', 'surface']}
            label="表面状况"
            rules={[{ required: true, message: '请选择表面状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="无异常">无异常</Option>
              <Option value="有损伤">有损伤</Option>
              <Option value="严重损伤">严重损伤</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['cableCheck', 'frequency']}
            label="频率检测结果"
            rules={[{ required: true, message: '请输入频率检测结果' }]}
          >
            <Input placeholder="如：2.35Hz" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">抑振措施检查</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name={['vibrationSuppression', 'devices']}
            label="抑振装置"
            rules={[{ required: true, message: '请选择抑振装置状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="正常">正常</Option>
              <Option value="部分松动">部分松动</Option>
              <Option value="缺失">缺失</Option>
              <Option value="损坏">损坏</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={['vibrationSuppression', 'effectiveness']}
            label="抑振效果"
            rules={[{ required: true, message: '请选择抑振效果' }]}
          >
            <Select placeholder="请选择">
              <Option value="良好">良好</Option>
              <Option value="需改进">需改进</Option>
              <Option value="差">差</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={['vibrationSuppression', 'maintenance']}
            label="维护状况"
            rules={[{ required: true, message: '请选择维护状况' }]}
          >
            <Select placeholder="请选择">
              <Option value="良好">良好</Option>
              <Option value="需加强">需加强</Option>
              <Option value="急需">急需</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        name="issues"
        label="发现问题"
      >
        <TextArea rows={3} placeholder="请输入发现的问题" />
      </Form.Item>
      
      <Form.Item
        name="recommendations"
        label="处理建议"
      >
        <TextArea rows={3} placeholder="请输入处理建议" />
      </Form.Item>
    </Form>
  );

  const renderRiskForm = () => (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="bridgeName"
            label="桥梁名称"
            rules={[{ required: true, message: '请输入桥梁名称' }]}
          >
            <Input placeholder="请输入桥梁名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="assessmentDate"
            label="评估日期"
            rules={[{ required: true, message: '请选择评估日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      
      <Divider orientation="left">桥梁所在风场评估</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="windSpeed"
            label="风场风速(m/s)"
            rules={[{ required: true, message: '请输入风场风速' }]}
          >
            <InputNumber min={0} step={0.1} placeholder="请输入风场风速" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="turbulenceIntensity"
            label="湍流强度"
            rules={[{ required: true, message: '请输入湍流强度' }]}
          >
            <InputNumber min={0} max={1} step={0.01} placeholder="请输入湍流强度" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="attackAngle"
            label="来流攻角(°)"
            rules={[{ required: true, message: '请输入来流攻角' }]}
          >
            <InputNumber min={-10} max={10} step={0.1} placeholder="请输入来流攻角" className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">桥梁振动特性评估</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="mainBeamFreq"
            label="主梁竖向频率(Hz)"
            rules={[{ required: true, message: '请输入主梁竖向频率' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="请输入主梁竖向频率" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="torsionalFreq"
            label="主梁扭转频率(Hz)"
            rules={[{ required: true, message: '请输入主梁扭转频率' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="请输入主梁扭转频率" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="cableFreq"
            label="拉索频率(Hz)"
            rules={[{ required: true, message: '请输入拉索频率' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="请输入拉索频率" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dampingRatio"
            label="阻尼比"
            rules={[{ required: true, message: '请输入阻尼比' }]}
          >
            <InputNumber min={0} max={1} step={0.001} placeholder="请输入阻尼比" className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">涡振振幅评估</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="vibrationAmplitude"
            label="总振动振幅(m)"
            rules={[{ required: true, message: '请输入总振动振幅' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="请输入总振动振幅" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="verticalAmplitude"
            label="竖向涡激振幅(m)"
            rules={[{ required: true, message: '请输入竖向涡激振幅' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="请输入竖向涡激振幅" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="torsionalAmplitude"
            label="扭转涡激振幅(m)"
            rules={[{ required: true, message: '请输入扭转涡激振幅' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="请输入扭转涡激振幅" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      
      <Divider orientation="left">风险评估结果</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="riskCategory"
            label="风险类别"
            rules={[{ required: true, message: '请选择风险类别' }]}
          >
            <Select placeholder="请选择风险类别">
              <Option value="1类">1类 - 风险很小</Option>
              <Option value="2类">2类 - 风险较小</Option>
              <Option value="3类">3类 - 风险一般</Option>
              <Option value="4类">4类 - 风险较大</Option>
              <Option value="5类">5类 - 风险很大</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="overallRisk"
            label="综合风险"
            rules={[{ required: true, message: '请选择综合风险' }]}
          >
            <Select placeholder="请选择综合风险">
              <Option value="重大">重大</Option>
              <Option value="较大">较大</Option>
              <Option value="一般">一般</Option>
              <Option value="低">低</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        name="assessor"
        label="评估人员"
        rules={[{ required: true, message: '请输入评估人员' }]}
      >
        <Input placeholder="请输入评估人员" />
      </Form.Item>
    </Form>
  );

  const renderEmergencyForm = () => (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="bridgeName"
            label="桥梁名称"
            rules={[{ required: true, message: '请输入桥梁名称' }]}
          >
            <Input placeholder="请输入桥梁名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="eventTime"
            label="事件时间"
            rules={[{ required: true, message: '请选择事件时间' }]}
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="eventType"
            label="事件类型"
            rules={[{ required: true, message: '请选择事件类型' }]}
          >
            <Select placeholder="请选择事件类型">
              <Option value="主梁涡振">主梁涡振</Option>
              <Option value="拉索涡振">拉索涡振</Option>
              <Option value="吊索涡振">吊索涡振</Option>
              <Option value="复合涡振">复合涡振</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="vibrationLevel"
            label="振动程度"
            rules={[{ required: true, message: '请选择振动程度' }]}
          >
            <Select placeholder="请选择振动程度">
              <Option value="轻微">轻微</Option>
              <Option value="中等">中等</Option>
              <Option value="严重">严重</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="windSpeed"
            label="当时风速(m/s)"
            rules={[{ required: true, message: '请输入当时风速' }]}
          >
            <InputNumber min={0} step={0.1} placeholder="请输入当时风速" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="responseTime"
            label="响应时间"
            rules={[{ required: true, message: '请输入响应时间' }]}
          >
            <Input placeholder="如：15分钟" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="triggerCondition"
        label="启动条件"
        rules={[{ required: true, message: '请输入启动条件' }]}
      >
        <TextArea rows={2} placeholder="请输入应急启动条件，如：振动频率持续5分钟超过阈值" />
      </Form.Item>
      
      <Form.Item
        name="measures"
        label="处置措施"
        rules={[{ required: true, message: '请输入处置措施' }]}
      >
        <TextArea rows={3} placeholder="请输入采取的处置措施，多个措施用分号分隔" />
      </Form.Item>

      <Divider orientation="left">抑振技术措施</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name={['suppressionTech', 'type']}
            label="技术类型"
            rules={[{ required: true, message: '请选择技术类型' }]}
          >
            <Select placeholder="请选择技术类型">
              <Option value="柔性连接装置法">柔性连接装置法</Option>
              <Option value="加装简易阻尼装置">加装简易阻尼装置</Option>
              <Option value="桥面扰流与节流法">桥面扰流与节流法</Option>
              <Option value="交通扰动控制法">交通扰动控制法</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={['suppressionTech', 'materials']}
            label="使用材料"
            rules={[{ required: true, message: '请输入使用材料' }]}
          >
            <Input placeholder="如：钢丝绳、橡胶垫" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={['suppressionTech', 'effectiveness']}
            label="预期效果"
            rules={[{ required: true, message: '请选择预期效果' }]}
          >
            <Select placeholder="请选择预期效果">
              <Option value="良好">良好</Option>
              <Option value="一般">一般</Option>
              <Option value="评估中">评估中</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        name="responsible"
        label="责任单位"
        rules={[{ required: true, message: '请输入责任单位' }]}
      >
        <Input placeholder="请输入责任单位" />
      </Form.Item>
    </Form>
  );

  const getModalTitle = () => {
    const titles = {
      hazard: '隐患排查',
      risk: '风险评估',
      emergency: '应急处置'
    };
    return `${editingRecord ? '编辑' : '添加'}${titles[modalType]}`;
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'hazard':
        return renderHazardForm();
      case 'risk':
        return renderRiskForm();
      case 'emergency':
        return renderEmergencyForm();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 统计概览 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="管辖桥梁总数"
              value={statistics.totalBridges}
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已排查桥梁"
              value={statistics.inspectedBridges}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="高风险桥梁"
              value={statistics.highRiskBridges}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="应急事件"
              value={statistics.emergencyEvents}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 监测与抑振设备统计 */}
      <Row gutter={16} className="mt-4">
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="在线监测桥梁"
              value={statistics.monitoringBridges}
              prefix={<SyncOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="抑振装置数量"
              value={statistics.suppressionDevices}
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="风险类别分布">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">1类风险:</span>
                <Badge count={statistics.riskCategories.category1} style={{ backgroundColor: '#52c41a' }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">2类风险:</span>
                <Badge count={statistics.riskCategories.category2} style={{ backgroundColor: '#1890ff' }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">3类风险:</span>
                <Badge count={statistics.riskCategories.category3} style={{ backgroundColor: '#faad14' }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">4-5类风险:</span>
                <Badge count={statistics.riskCategories.category4 + statistics.riskCategories.category5} style={{ backgroundColor: '#ff4d4f' }} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 排查完成率 */}
      <Card title="排查完成率">
        <Progress 
          percent={statistics.completionRate} 
          status="active" 
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
      </Card>

      {/* 主要内容区域 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="隐患排查" key="hazard">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">桥梁涡振隐患排查</h3>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd('hazard')}
                >
                  新增排查
                </Button>
                <Button icon={<ExportOutlined />}>
                  导出报告
                </Button>
              </Space>
            </div>
            
            <Table
              columns={hazardColumns}
              dataSource={hazardData}
              pagination={{
                total: hazardData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="风险评估" key="risk">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">桥梁涡振风险评估</h3>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd('risk')}
                >
                  新增评估
                </Button>
                <Button icon={<ExportOutlined />}>
                  导出报告
                </Button>
              </Space>
            </div>
            
            <Table
              columns={riskColumns}
              dataSource={riskAssessmentData}
              pagination={{
                total: riskAssessmentData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="应急处置" key="emergency">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">桥梁涡振应急处置</h3>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd('emergency')}
                >
                  新增事件
                </Button>
                <Button icon={<ExportOutlined />}>
                  导出报告
                </Button>
              </Space>
            </div>
            
            <Table
              columns={emergencyColumns}
              dataSource={emergencyData}
              pagination={{
                total: emergencyData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 模态框 */}
      <Modal
        title={getModalTitle()}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={800}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default BridgeVortexVibration;
