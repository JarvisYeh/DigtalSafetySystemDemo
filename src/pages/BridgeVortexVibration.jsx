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
  Badge,
  Collapse,
  List,
  Avatar,
  Tooltip,
  Switch,
  Drawer,
  Calendar
} from 'antd';
import dayjs from '../utils/dayjs';
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
  EnvironmentOutlined,
  SettingOutlined,
  CalendarOutlined,
  MonitorOutlined,
  ToolOutlined,
  SearchOutlined,
  FilterOutlined,
  PrinterOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  BellOutlined,
  TeamOutlined,
  BookOutlined,
  FlagOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { Panel } = Collapse;

function BridgeVortexVibration() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBridge, setSelectedBridge] = useState(null);

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
        aerodynamicDesign: '做过风洞实验',
        aerodynamicShape: '良好',
        sectionDeviation: '符合标准',
        surfaceDefects: '轻微缺陷',
        attachments: '位置需调整',
        verticalFreq: '0.18Hz',
        torsionalFreq: '0.25Hz',
        dampingRatio: '0.008',
        suppressionMeasures: '有个别抑振措施'
      },
      cableCheck: {
        appearance: '良好',
        connections: '正常',
        surface: '无异常',
        frequency: '2.35Hz',
        suppressionDevices: '抑振系统完备'
      },
      vibrationSuppression: {
        devices: '部分松动',
        effectiveness: '需改进',
        maintenance: '需加强'
      },
      environmentCheck: {
        windField: '紊流强度较高',
        trafficVolume: '中等交通量',
        heavyVehicles: '大吨位车辆比例适中'
      },
      vibrationAmplitude: {
        vertical: '0.12m',
        torsional: '0.08m',
        overall: '0.15m'
      },
      equipment: ['全站仪', '三维激光扫描仪', '无人机', '加速度传感器'],
      weatherConditions: '晴朗，风速12m/s',
      trafficFlow: '中等',
      nextInspection: '2024-07-15',
      priority: '中',
      completionRate: 85
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
      issues: ['拉索频率异常', '风场环境恶劣', '阻尼比偏低', '主梁截面尺寸偏差超标', '表面缺陷面积较大'],
      recommendations: ['立即安装抑振装置', '加强监测', '优化阻尼系统', '修复表面缺陷', '调整截面尺寸'],
      mainBeamCheck: {
        aerodynamicDesign: '未做风洞实验',
        aerodynamicShape: '需改进',
        sectionDeviation: '超出标准',
        surfaceDefects: '明显缺陷',
        attachments: '位置合理',
        verticalFreq: '0.22Hz',
        torsionalFreq: '0.31Hz',
        dampingRatio: '0.006',
        suppressionMeasures: '无任何抑振措施'
      },
      cableCheck: {
        appearance: '需检修',
        connections: '松动',
        surface: '有损伤',
        frequency: '1.85Hz',
        suppressionDevices: '无任何抑振措施'
      },
      vibrationSuppression: {
        devices: '缺失',
        effectiveness: '差',
        maintenance: '急需'
      },
      environmentCheck: {
        windField: '均匀场环境',
        trafficVolume: '接近设计交通量',
        heavyVehicles: '大吨位车辆比例高'
      },
      vibrationAmplitude: {
        vertical: '0.25m',
        torsional: '0.15m',
        overall: '0.28m'
      },
      equipment: ['毫米波雷达', '风速仪', '应变仪', '三维风向仪'],
      weatherConditions: '多云，风速25m/s',
      trafficFlow: '繁忙',
      nextInspection: '2024-02-20',
      priority: '高',
      completionRate: 45
    },
    {
      key: '3',
      id: 'BVH003',
      bridgeName: '某钢结构梁桥',
      bridgeType: '钢结构梁桥',
      mainSpan: 600,
      location: '某市某区',
      inspectionDate: '2024-01-25',
      inspectionType: '季节性监测',
      riskLevel: '一般',
      status: '进行中',
      inspector: '王工程师',
      issues: ['附属物轻微位移', '局部表面腐蚀', '部分连接螺栓松动'],
      recommendations: ['定期维护', '防腐处理', '紧固连接螺栓'],
      mainBeamCheck: {
        aerodynamicDesign: '做过数值模拟',
        aerodynamicShape: '良好',
        sectionDeviation: '符合标准',
        surfaceDefects: '轻微腐蚀',
        attachments: '位置合理',
        verticalFreq: '0.32Hz',
        torsionalFreq: '0.45Hz',
        dampingRatio: '0.012',
        suppressionMeasures: '有个别抑振措施'
      },
      cableCheck: {
        appearance: '无拉索',
        connections: '无拉索',
        surface: '无拉索',
        frequency: '无拉索',
        suppressionDevices: '无拉索'
      },
      vibrationSuppression: {
        devices: '正常',
        effectiveness: '良好',
        maintenance: '定期'
      },
      environmentCheck: {
        windField: '紊流强度不高',
        trafficVolume: '正常交通量',
        heavyVehicles: '大吨位车辆比例较低'
      },
      vibrationAmplitude: {
        vertical: '0.08m',
        torsional: '0.05m',
        overall: '0.10m'
      },
      equipment: ['激光测距仪', '水准仪', '光学影像设备'],
      weatherConditions: '阴天，风速8m/s',
      trafficFlow: '正常',
      nextInspection: '2024-04-25',
      priority: '低',
      completionRate: 70
    },
    {
      key: '4',
      id: 'BVH004',
      bridgeName: '某大跨径拱桥',
      bridgeType: '拱桥',
      mainSpan: 900,
      location: '某市某区',
      inspectionDate: '2024-01-28',
      inspectionType: '定期排查',
      riskLevel: '较大',
      status: '已完成',
      inspector: '赵工程师',
      issues: ['拱肋局部变形', '横撑连接松动', '桥面系振动明显'],
      recommendations: ['加固拱肋', '紧固横撑连接', '安装阻尼装置'],
      mainBeamCheck: {
        aerodynamicDesign: '做过风洞实验和数值模拟',
        aerodynamicShape: '良好',
        sectionDeviation: '轻微偏差',
        surfaceDefects: '局部缺陷',
        attachments: '位置合理',
        verticalFreq: '0.28Hz',
        torsionalFreq: '0.38Hz',
        dampingRatio: '0.010',
        suppressionMeasures: '抑振系统完备'
      },
      cableCheck: {
        appearance: '无拉索',
        connections: '无拉索',
        surface: '无拉索',
        frequency: '无拉索',
        suppressionDevices: '无拉索'
      },
      vibrationSuppression: {
        devices: '设备老化',
        effectiveness: '功能下降',
        maintenance: '需更新'
      },
      environmentCheck: {
        windField: '紊流强度很高',
        trafficVolume: '较高交通量',
        heavyVehicles: '大吨位车辆比例中等'
      },
      vibrationAmplitude: {
        vertical: '0.15m',
        torsional: '0.10m',
        overall: '0.18m'
      },
      equipment: ['GPS监测系统', '应变传感器', '位移传感器', '风速风向仪'],
      weatherConditions: '晴朗，风速15m/s',
      trafficFlow: '较繁忙',
      nextInspection: '2024-07-28',
      priority: '中',
      completionRate: 90
    },
    {
      key: '5',
      id: 'BVH005',
      bridgeName: '某连续梁桥',
      bridgeType: '连续梁桥',
      mainSpan: 450,
      location: '某市某区',
      inspectionDate: '2024-01-30',
      inspectionType: '专项排查',
      riskLevel: '一般',
      status: '已完成',
      inspector: '孙工程师',
      issues: ['支座轻微位移', '伸缩缝异常', '护栏连接松动'],
      recommendations: ['调整支座', '维修伸缩缝', '加固护栏连接'],
      mainBeamCheck: {
        aerodynamicDesign: '做过数值模拟',
        aerodynamicShape: '良好',
        sectionDeviation: '符合标准',
        surfaceDefects: '无缺陷',
        attachments: '位置合理',
        verticalFreq: '0.42Hz',
        torsionalFreq: '0.58Hz',
        dampingRatio: '0.015',
        suppressionMeasures: '有个别抑振措施'
      },
      cableCheck: {
        appearance: '无拉索',
        connections: '无拉索',
        surface: '无拉索',
        frequency: '无拉索',
        suppressionDevices: '无拉索'
      },
      vibrationSuppression: {
        devices: '正常',
        effectiveness: '良好',
        maintenance: '定期'
      },
      environmentCheck: {
        windField: '风场相对均匀',
        trafficVolume: '正常交通量',
        heavyVehicles: '大吨位车辆比例较低'
      },
      vibrationAmplitude: {
        vertical: '0.06m',
        torsional: '0.04m',
        overall: '0.07m'
      },
      equipment: ['加速度传感器', '应变仪', '位移计'],
      weatherConditions: '多云，风速10m/s',
      trafficFlow: '正常',
      nextInspection: '2024-07-30',
      priority: '低',
      completionRate: 95
    }
  ]);

  // 监测设备数据
  const [monitoringData, setMonitoringData] = useState([
    {
      key: '1',
      bridgeName: '某大跨径悬索桥',
      deviceType: '风速风向仪',
      location: '主梁跨中',
      status: '正常',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      dataQuality: '优秀'
    },
    {
      key: '2',
      bridgeName: '某斜拉桥',
      deviceType: '加速度传感器',
      location: '拉索中部',
      status: '异常',
      lastMaintenance: '2023-12-15',
      nextMaintenance: '2024-03-15',
      dataQuality: '良好'
    }
  ]);

  // 排查计划数据
  const [inspectionPlan, setInspectionPlan] = useState([
    {
      key: '1',
      bridgeName: '某大跨径悬索桥',
      planType: '定期排查',
      scheduledDate: '2024-07-15',
      inspector: '张工程师',
      status: '计划中',
      priority: '中'
    },
    {
      key: '2',
      bridgeName: '某斜拉桥',
      planType: '特殊情况排查',
      scheduledDate: '2024-02-20',
      inspector: '李工程师',
      status: '紧急',
      priority: '高'
    }
  ]);

  // 专家知识库数据
  const [knowledgeBase, setKnowledgeBase] = useState([
    {
      key: '1',
      title: '悬索桥主梁涡振机理与防控',
      category: '理论研究',
      author: '桥梁专家组',
      publishDate: '2024-01-01',
      downloads: 156,
      tags: ['悬索桥', '涡振', '防控技术']
    },
    {
      key: '2',
      title: '斜拉桥拉索涡振抑制装置设计指南',
      category: '技术标准',
      author: '交通部科研院',
      publishDate: '2023-12-15',
      downloads: 203,
      tags: ['斜拉桥', '拉索', '抑振装置']
    }
  ]);

  // 风险评估数据
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
      },
      // 新增详细评估数据
      mainBeamAssessment: {
        aerodynamicDesign: { level: 2, score: 80, description: '做过风洞实验或数值模拟（仅其一）' },
        sectionDeviation: { level: 1, score: 100, description: '偏差 < 1%' },
        surfaceDefects: { level: 2, score: 80, description: '2% ≤ 缺陷面积 < 5%' },
        attachmentPosition: { level: 1, score: 100, description: '位置偏差 < 2 cm' },
        verticalFreq: { level: 3, score: 65, description: '0.8Vc < V ≤ 1.0Vc' },
        torsionalFreq: { level: 3, score: 65, description: '0.8Vc < V ≤ 1.0Vc' },
        dampingRatio: { level: 4, score: 40, description: '0.4ζ₀ ≤ ζ < 0.6ζ₀' },
        suppressionMeasures: { level: 2, score: 80, description: '有个别抑振措施（如单一导流板）' }
      },
      cableAssessment: {
        appearance: { level: 1, score: 100, description: '连接部位无松动、表面无缺陷' },
        frequency: { level: 2, score: 80, description: '1.0Vc < V ≤ 1.2Vc' },
        suppressionMeasures: { level: 3, score: 65, description: '有抑振措施但老化、功能下降' }
      },
      environmentAssessment: {
        windField: { level: 2, score: 80, description: '紊流强度较高' },
        trafficVolume: { level: 3, score: 65, description: '0.7Qd ≤ Q < 0.9Qd' },
        heavyVehicles: { level: 2, score: 80, description: '0.3 ≤ r < 0.5' }
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 3, score: 65, description: '0.4Av,allow ≤ Av < 0.6Av,allow' },
        torsional: { level: 4, score: 40, description: '0.6Aθ,allow ≤ Aθ < Aθ,allow' }
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
      },
      // 新增详细评估数据
      mainBeamAssessment: {
        aerodynamicDesign: { level: 3, score: 65, description: '未做过风洞实验和数值模拟' },
        sectionDeviation: { level: 5, score: 0, description: '偏差 ≥ 2%' },
        surfaceDefects: { level: 4, score: 40, description: '缺陷面积 ≥ 5%' },
        attachmentPosition: { level: 4, score: 40, description: '偏差 ≥ 5 cm' },
        verticalFreq: { level: 5, score: 0, description: 'V ≤ 0.6Vc' },
        torsionalFreq: { level: 4, score: 40, description: '0.6Vc < V ≤ 0.8Vc' },
        dampingRatio: { level: 5, score: 0, description: 'ζ < 0.4ζ₀' },
        suppressionMeasures: { level: 4, score: 40, description: '无任何抑振措施' }
      },
      cableAssessment: {
        appearance: { level: 4, score: 40, description: '连接部位松动/裂纹/损坏' },
        frequency: { level: 5, score: 0, description: 'V ≤ 0.5Vc' },
        suppressionMeasures: { level: 4, score: 40, description: '无任何抑振措施' }
      },
      environmentAssessment: {
        windField: { level: 5, score: 0, description: '均匀场（如开阔平原、海上）' },
        trafficVolume: { level: 4, score: 40, description: '0.9Qd ≤ Q < Qd' },
        heavyVehicles: { level: 4, score: 40, description: '0.8 ≤ r < 1.0' }
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 5, score: 0, description: 'Av ≥ Av,allow' },
        torsional: { level: 5, score: 0, description: 'Aθ ≥ Aθ,allow' }
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
    pendingInspections: 5,
    expertReports: 12,
    onlineDevices: 42,
    offlineDevices: 3,
    riskCategories: {
      category1: 5,
      category2: 8,
      category3: 7,
      category4: 3,
      category5: 2
    },
    monthlyTrend: {
      inspections: [8, 12, 15, 18, 23, 25],
      risks: [5, 4, 6, 3, 4, 3],
      emergencies: [1, 0, 2, 1, 0, 2]
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
      width: 1200,
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
              <Tag color={record.riskLevel === '重大' ? 'red' : record.riskLevel === '较大' ? 'orange' : 'green'}>{record.riskLevel}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="排查人员">{record.inspector}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={record.status === '已完成' ? 'green' : record.status === '进行中' ? 'blue' : 'orange'}>{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="完成率">
              <Progress percent={record.completionRate} size="small" />
            </Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={record.priority === '高' ? 'red' : record.priority === '中' ? 'orange' : 'green'}>{record.priority}</Tag>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <div>
            <h4 className="font-semibold mb-3 text-purple-600">
              <ToolOutlined className="mr-2" />
              使用设备与环境条件
            </h4>
            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" title="检测设备">
                  <div className="space-y-2">
                    {record.equipment.map((item, index) => (
                      <Tag key={index} color="blue">{item}</Tag>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="环境条件">
                  <div className="space-y-2">
                    <div><strong>天气条件：</strong>{record.weatherConditions}</div>
                    <div><strong>交通流量：</strong>{record.trafficFlow}</div>
                    <div><strong>下次排查：</strong>{record.nextInspection}</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

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

          {record.cableCheck.appearance !== '无拉索' && (
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
          )}

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
      width: 1200,
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

          {/* 主梁结构涡振风险评估 */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-600">
              <SafetyOutlined className="mr-2" />
              主梁结构涡振风险评估
            </h4>
            
            {/* 主梁气动外形 */}
            <Card size="small" title="主梁气动外形" className="mb-4">
              <Row gutter={16}>
                <Col span={6}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">气动外形设计</div>
                    <Tag color={record.mainBeamAssessment.aerodynamicDesign.level <= 2 ? 'green' : record.mainBeamAssessment.aerodynamicDesign.level === 3 ? 'orange' : 'red'}>
                      {record.mainBeamAssessment.aerodynamicDesign.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.aerodynamicDesign.score}</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">截面尺寸偏差</div>
                    <Tag color={record.mainBeamAssessment.sectionDeviation.level <= 2 ? 'green' : 'red'}>
                      {record.mainBeamAssessment.sectionDeviation.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.sectionDeviation.score}</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">表面缺陷</div>
                    <Tag color={record.mainBeamAssessment.surfaceDefects.level <= 2 ? 'green' : record.mainBeamAssessment.surfaceDefects.level === 4 ? 'red' : 'orange'}>
                      {record.mainBeamAssessment.surfaceDefects.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.surfaceDefects.score}</div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">附属物位置</div>
                    <Tag color={record.mainBeamAssessment.attachmentPosition.level <= 2 ? 'green' : 'red'}>
                      {record.mainBeamAssessment.attachmentPosition.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.attachmentPosition.score}</div>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* 主梁振动特性 */}
            <Card size="small" title="主梁振动特性" className="mb-4">
              <Row gutter={16}>
                <Col span={8}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">竖向弯曲振动频率</div>
                    <Tag color={record.mainBeamAssessment.verticalFreq.level <= 2 ? 'green' : record.mainBeamAssessment.verticalFreq.level === 3 ? 'orange' : 'red'}>
                      {record.mainBeamAssessment.verticalFreq.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.verticalFreq.score}</div>
                    <div className="text-xs mt-1 text-blue-600">{record.mainBeamFreq} Hz</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">扭转振动频率</div>
                    <Tag color={record.mainBeamAssessment.torsionalFreq.level <= 2 ? 'green' : record.mainBeamAssessment.torsionalFreq.level === 3 ? 'orange' : 'red'}>
                      {record.mainBeamAssessment.torsionalFreq.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.torsionalFreq.score}</div>
                    <div className="text-xs mt-1 text-blue-600">{record.torsionalFreq} Hz</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">桥梁阻尼比</div>
                    <Tag color={record.mainBeamAssessment.dampingRatio.level <= 2 ? 'green' : record.mainBeamAssessment.dampingRatio.level === 3 ? 'orange' : 'red'}>
                      {record.mainBeamAssessment.dampingRatio.level}级
                    </Tag>
                    <div className="text-xs mt-1 text-gray-500">得分: {record.mainBeamAssessment.dampingRatio.score}</div>
                    <div className="text-xs mt-1 text-blue-600">{record.dampingRatio}</div>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* 桥梁抑振措施 */}
            <Card size="small" title="桥梁抑振措施" className="mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-2">抑振措施评估</div>
                <Tag size="large" color={record.mainBeamAssessment.suppressionMeasures.level === 1 ? 'green' : record.mainBeamAssessment.suppressionMeasures.level <= 3 ? 'orange' : 'red'}>
                  {record.mainBeamAssessment.suppressionMeasures.level}级
                </Tag>
                <div className="text-sm mt-2 text-gray-500">得分: {record.mainBeamAssessment.suppressionMeasures.score}</div>
                <div className="text-sm mt-2 text-blue-600">{record.mainBeamAssessment.suppressionMeasures.description}</div>
              </div>
            </Card>
          </div>

          <Divider />

          {/* 拉（吊）索结构涡振风险评估 */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-600">
              <ThunderboltOutlined className="mr-2" />
              拉（吊）索结构涡振风险评估
            </h4>
            
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title="拉（吊）索外形">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag color={record.cableAssessment.appearance.level === 1 ? 'green' : record.cableAssessment.appearance.level <= 2 ? 'blue' : 'red'}>
                      {record.cableAssessment.appearance.level}级
                    </Tag>
                    <div className="text-xs mt-2 text-gray-500">得分: {record.cableAssessment.appearance.score}</div>
                    <div className="text-xs mt-2 text-blue-600">{record.cableAssessment.appearance.description}</div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="拉（吊）索频率">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag color={record.cableAssessment.frequency.level <= 2 ? 'green' : record.cableAssessment.frequency.level === 3 ? 'orange' : 'red'}>
                      {record.cableAssessment.frequency.level}级
                    </Tag>
                    <div className="text-xs mt-2 text-gray-500">得分: {record.cableAssessment.frequency.score}</div>
                    <div className="text-xs mt-2 text-blue-600">{record.cableFreq} Hz</div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="拉（吊）索抑振措施">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag color={record.cableAssessment.suppressionMeasures.level === 1 ? 'green' : record.cableAssessment.suppressionMeasures.level === 3 ? 'orange' : 'red'}>
                      {record.cableAssessment.suppressionMeasures.level}级
                    </Tag>
                    <div className="text-xs mt-2 text-gray-500">得分: {record.cableAssessment.suppressionMeasures.score}</div>
                    <div className="text-xs mt-2 text-blue-600">{record.cableAssessment.suppressionMeasures.description}</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* 外部环境涡振风险评估 */}
          <div>
            <h4 className="font-semibold mb-4 text-green-600">
              <EnvironmentOutlined className="mr-2" />
              外部环境涡振风险评估
            </h4>
            
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title="桥址风场">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag color={record.environmentAssessment.windField.level === 1 ? 'green' : record.environmentAssessment.windField.level <= 3 ? 'orange' : 'red'}>
                      {record.environmentAssessment.windField.level}级
                    </Tag>
                    <div className="text-xs mt-2 text-gray-500">得分: {record.environmentAssessment.windField.score}</div>
                    <div className="text-xs mt-2 text-blue-600">风速: {record.windSpeed} m/s</div>
                    <div className="text-xs mt-1 text-blue-600">湍流强度: {record.turbulenceIntensity}</div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="交通量">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag color={record.environmentAssessment.trafficVolume.level <= 2 ? 'green' : record.environmentAssessment.trafficVolume.level === 3 ? 'orange' : 'red'}>
                      {record.environmentAssessment.trafficVolume.level}级
                    </Tag>
                    <div className="text-xs mt-2 text-gray-500">得分: {record.environmentAssessment.trafficVolume.score}</div>
                    <div className="text-xs mt-2 text-blue-600">{record.environmentAssessment.trafficVolume.description}</div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="大吨位车辆">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag color={record.environmentAssessment.heavyVehicles.level <= 2 ? 'green' : record.environmentAssessment.heavyVehicles.level === 3 ? 'orange' : 'red'}>
                      {record.environmentAssessment.heavyVehicles.level}级
                    </Tag>
                    <div className="text-xs mt-2 text-gray-500">得分: {record.environmentAssessment.heavyVehicles.score}</div>
                    <div className="text-xs mt-2 text-blue-600">{record.environmentAssessment.heavyVehicles.description}</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* 桥梁涡振振幅评估 */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-600">
              <LineChartOutlined className="mr-2" />
              桥梁涡振振幅评估
            </h4>
            
            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" title="竖向涡振振幅">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag size="large" color={record.vibrationAmplitudeAssessment.vertical.level <= 2 ? 'green' : record.vibrationAmplitudeAssessment.vertical.level === 3 ? 'orange' : 'red'}>
                      {record.vibrationAmplitudeAssessment.vertical.level}级
                    </Tag>
                    <div className="text-sm mt-2 text-gray-500">得分: {record.vibrationAmplitudeAssessment.vertical.score}</div>
                    <div className="text-sm mt-2 text-blue-600">振幅: {record.verticalAmplitude} m</div>
                    <div className="text-xs mt-2 text-gray-600">{record.vibrationAmplitudeAssessment.vertical.description}</div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="扭转涡振振幅">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <Tag size="large" color={record.vibrationAmplitudeAssessment.torsional.level <= 2 ? 'green' : record.vibrationAmplitudeAssessment.torsional.level === 3 ? 'orange' : 'red'}>
                      {record.vibrationAmplitudeAssessment.torsional.level}级
                    </Tag>
                    <div className="text-sm mt-2 text-gray-500">得分: {record.vibrationAmplitudeAssessment.torsional.score}</div>
                    <div className="text-sm mt-2 text-blue-600">振幅: {record.torsionalAmplitude} m</div>
                    <div className="text-xs mt-2 text-gray-600">{record.vibrationAmplitudeAssessment.torsional.description}</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* 综合评估结果 */}
          <div>
            <h4 className="font-semibold mb-4 text-red-600">
              <CheckCircleOutlined className="mr-2" />
              综合评估结果
            </h4>
            
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <Row gutter={16}>
                <Col span={8}>
                  <div className="text-center p-4">
                    <div className="text-lg font-bold text-blue-600 mb-2">主梁结构评估</div>
                    <Tag size="large" color={record.bridgeEvaluation.aerodynamics === '1级' ? 'green' : record.bridgeEvaluation.aerodynamics === '2级' ? 'blue' : record.bridgeEvaluation.aerodynamics === '3级' ? 'orange' : 'red'}>
                      {record.bridgeEvaluation.aerodynamics}
                    </Tag>
                    <div className="text-sm mt-2 text-gray-600">
                      综合得分: {Math.round((
                        record.mainBeamAssessment.aerodynamicDesign.score +
                        record.mainBeamAssessment.sectionDeviation.score +
                        record.mainBeamAssessment.surfaceDefects.score +
                        record.mainBeamAssessment.attachmentPosition.score +
                        record.mainBeamAssessment.verticalFreq.score +
                        record.mainBeamAssessment.torsionalFreq.score +
                        record.mainBeamAssessment.dampingRatio.score +
                        record.mainBeamAssessment.suppressionMeasures.score
                      ) / 8)}
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-4">
                    <div className="text-lg font-bold text-purple-600 mb-2">拉（吊）索结构评估</div>
                    <Tag size="large" color={record.bridgeEvaluation.vibrationChar === '1级' ? 'green' : record.bridgeEvaluation.vibrationChar === '2级' ? 'blue' : record.bridgeEvaluation.vibrationChar === '3级' ? 'orange' : 'red'}>
                      {record.bridgeEvaluation.vibrationChar}
                    </Tag>
                    <div className="text-sm mt-2 text-gray-600">
                      综合得分: {Math.round((
                        record.cableAssessment.appearance.score +
                        record.cableAssessment.frequency.score +
                        record.cableAssessment.suppressionMeasures.score
                      ) / 3)}
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-4">
                    <div className="text-lg font-bold text-green-600 mb-2">外部环境评估</div>
                    <Tag size="large" color={record.bridgeEvaluation.suppression === '1级' ? 'green' : record.bridgeEvaluation.suppression === '2级' ? 'blue' : 'orange'}>
                      {record.bridgeEvaluation.suppression}
                    </Tag>
                    <div className="text-sm mt-2 text-gray-600">
                      综合得分: {Math.round((
                        record.environmentAssessment.windField.score +
                        record.environmentAssessment.trafficVolume.score +
                        record.environmentAssessment.heavyVehicles.score
                      ) / 3)}
                    </div>
                  </div>
                </Col>
              </Row>
              
              <Divider />
              
              <div className="text-center">
                <div className="text-xl font-bold text-red-600 mb-2">最终风险类别</div>
                <Tag size="large" color={record.riskCategory === '1类' ? 'green' : record.riskCategory === '2类' ? 'blue' : record.riskCategory === '3类' ? 'orange' : 'red'} className="text-lg px-4 py-2">
                  {record.riskCategory}
                </Tag>
                <div className="text-lg mt-2 text-gray-600">
                  综合风险: <span className={`font-bold ${record.overallRisk === '重大' ? 'text-red-600' : 'text-orange-600'}`}>{record.overallRisk}</span>
                </div>
                <div className="text-sm mt-3 text-gray-500 bg-yellow-50 p-3 rounded">
                  <strong>评估说明：</strong>桥梁最终风险类别由主梁和拉（吊）索评估结果中较差者与外部环境评估结果综合确定
                </div>
              </div>
            </Card>
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
    
    // 处理日期字段，确保正确转换为dayjs对象
    const formValues = {
      ...record,
      inspectionDate: record.inspectionDate ? dayjs(record.inspectionDate) : null,
    };
    
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  const handleEditRisk = (record) => {
    setModalType('risk');
    setEditingRecord(record);
    
    // 处理日期字段，确保正确转换为dayjs对象
    const formValues = {
      ...record,
      assessmentDate: record.assessmentDate ? dayjs(record.assessmentDate) : null,
    };
    
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  const handleEditEmergency = (record) => {
    setModalType('emergency');
    setEditingRecord(record);
    
    // 处理日期字段，确保正确转换为dayjs对象
    const formValues = {
      ...record,
      eventTime: record.eventTime ? dayjs(record.eventTime) : null,
    };
    
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 处理日期字段，转换为字符串格式保存
      const processedValues = { ...values };
      
      if (modalType === 'hazard' && processedValues.inspectionDate) {
        processedValues.inspectionDate = processedValues.inspectionDate.format('YYYY-MM-DD');
      }
      
      if (modalType === 'risk' && processedValues.assessmentDate) {
        processedValues.assessmentDate = processedValues.assessmentDate.format('YYYY-MM-DD');
      }
      
      if (modalType === 'emergency' && processedValues.eventTime) {
        processedValues.eventTime = processedValues.eventTime.format('YYYY-MM-DD HH:mm');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modalType === 'hazard') {
        if (editingRecord) {
          setHazardData(hazardData.map(item => 
            item.key === editingRecord.key ? { ...item, ...processedValues } : item
          ));
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVH${String(hazardData.length + 1).padStart(3, '0')}`,
            ...processedValues,
            status: '待处理',
          };
          setHazardData([...hazardData, newRecord]);
        }
      } else if (modalType === 'risk') {
        if (editingRecord) {
          setRiskAssessmentData(riskAssessmentData.map(item => 
            item.key === editingRecord.key ? { ...item, ...processedValues } : item
          ));
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVR${String(riskAssessmentData.length + 1).padStart(3, '0')}`,
            ...processedValues,
          };
          setRiskAssessmentData([...riskAssessmentData, newRecord]);
        }
      } else if (modalType === 'emergency') {
        if (editingRecord) {
          setEmergencyData(emergencyData.map(item => 
            item.key === editingRecord.key ? { ...item, ...processedValues } : item
          ));
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVE${String(emergencyData.length + 1).padStart(3, '0')}`,
            ...processedValues,
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="桥梁基本信息" key="1">
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
                name="bridgeStakeNumber"
                label="桥梁桩号"
                rules={[{ required: true, message: '请输入桥梁桩号' }]}
              >
                <Input placeholder="请输入桥梁桩号" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bridgeStructureForm"
                label="桥梁结构形式"
                rules={[{ required: true, message: '请选择桥梁结构形式' }]}
              >
                <Select placeholder="请选择桥梁结构形式">
                  <Option value="悬索桥">悬索桥</Option>
                  <Option value="斜拉桥">斜拉桥</Option>
                  <Option value="拱桥">拱桥</Option>
                  <Option value="梁桥">梁桥</Option>
                  <Option value="钢结构梁桥">钢结构梁桥</Option>
                  <Option value="连续梁桥">连续梁桥</Option>
                  <Option value="刚构桥">刚构桥</Option>
                  <Option value="组合梁桥">组合梁桥</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bridgeSpan"
                label="桥梁跨径"
                rules={[{ required: true, message: '请输入桥梁跨径' }]}
              >
                <Input placeholder="请输入桥梁跨径，如：主跨1200m" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="inspectionDate"
                label="排查日期"
                rules={[{ required: true, message: '请选择排查日期' }]}
              >
                <DatePicker 
                  className="w-full" 
                  format="YYYY-MM-DD"
                  placeholder="请选择排查日期"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nextInspectionDate"
                label="上次排查日期"
                rules={[{ required: true, message: '请选择上次排查日期' }]}
              >
                <DatePicker 
                  className="w-full" 
                  format="YYYY-MM-DD"
                  placeholder="请选择上次排查日期"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="inspectionType"
                label="排查类型"
                rules={[{ required: true, message: '请选择排查类型' }]}
              >
                <Select placeholder="请选择排查类型">
                  <Option value="初始">初始</Option>
                  <Option value="定期">定期</Option>
                  <Option value="季节性">季节性</Option>
                  <Option value="特殊情况">特殊情况</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="specialInspectionReason"
            label="如为特殊情况涡振隐患排查，请填写排查原因"
          >
            <TextArea 
              rows={2} 
              placeholder="请填写特殊情况排查的具体原因"
            />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="location"
                label="桥梁位置"
                rules={[{ required: true, message: '请输入桥梁位置' }]}
              >
                <Input placeholder="请输入桥梁位置" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="buildYear"
                label="建成年份"
                rules={[{ required: true, message: '请输入建成年份' }]}
              >
                <InputNumber min={1900} max={2030} placeholder="请输入建成年份" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="designUnit"
                label="设计单位"
                rules={[{ required: true, message: '请输入设计单位' }]}
              >
                <Input placeholder="请输入设计单位" />
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
        </TabPane>

        <TabPane tab="使用设备及参数" key="2">
          <div className="space-y-6">
            {/* 使用设备列表 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">使用设备</h4>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const currentEquipment = form.getFieldValue('equipmentList') || [];
                    form.setFieldsValue({
                      equipmentList: [
                        ...currentEquipment,
                        {
                          deviceType: '',
                          deviceModel: '',
                          applicationProject: '',
                          actualParameters: ''
                        }
                      ]
                    });
                  }}
                >
                  添加设备
                </Button>
              </div>
              
              <Form.List name="equipmentList">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }) => (
                      <Card 
                        key={key} 
                        size="small" 
                        title={`设备 ${name + 1}`}
                        extra={
                          <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                          >
                            删除
                          </Button>
                        }
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'deviceType']}
                              label="设备类型"
                              rules={[{ required: true, message: '请选择设备类型' }]}
                            >
                              <Select placeholder="请选择设备类型">
                                <Option value="全站仪">全站仪</Option>
                                <Option value="三维激光扫描仪">三维激光扫描仪</Option>
                                <Option value="无人机">无人机</Option>
                                <Option value="加速度传感器">加速度传感器</Option>
                                <Option value="毫米波雷达">毫米波雷达</Option>
                                <Option value="风速仪">风速仪</Option>
                                <Option value="应变仪">应变仪</Option>
                                <Option value="三维风向仪">三维风向仪</Option>
                                <Option value="激光测距仪">激光测距仪</Option>
                                <Option value="水准仪">水准仪</Option>
                                <Option value="光学影像设备">光学影像设备</Option>
                                <Option value="GPS监测系统">GPS监测系统</Option>
                                <Option value="位移传感器">位移传感器</Option>
                                <Option value="风速风向仪">风速风向仪</Option>
                                <Option value="位移计">位移计</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'deviceModel']}
                              label="设备型号"
                              rules={[{ required: true, message: '请输入设备型号' }]}
                            >
                              <Input placeholder="请输入设备型号" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'applicationProject']}
                              label="应用排查项目"
                              rules={[{ required: true, message: '请选择应用排查项目' }]}
                            >
                              <Select 
                                mode="multiple" 
                                placeholder="请选择应用排查项目"
                                maxTagCount={2}
                              >
                                <Option value="主梁气动外形检查">主梁气动外形检查</Option>
                                <Option value="截面尺寸测量">截面尺寸测量</Option>
                                <Option value="表面缺陷检测">表面缺陷检测</Option>
                                <Option value="附属物位置测量">附属物位置测量</Option>
                                <Option value="振动频率测试">振动频率测试</Option>
                                <Option value="阻尼比测量">阻尼比测量</Option>
                                <Option value="拉索外观检查">拉索外观检查</Option>
                                <Option value="拉索频率检测">拉索频率检测</Option>
                                <Option value="风场环境监测">风场环境监测</Option>
                                <Option value="交通流量统计">交通流量统计</Option>
                                <Option value="振动振幅测量">振动振幅测量</Option>
                                <Option value="抑振装置检查">抑振装置检查</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'actualParameters']}
                              label="实际参数"
                              rules={[{ required: true, message: '请输入实际参数' }]}
                            >
                              <TextArea 
                                rows={2} 
                                placeholder="请输入设备的实际测量参数或配置参数"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    {fields.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <div className="mb-2">暂无设备信息</div>
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          onClick={() => add({
                            deviceType: '',
                            deviceModel: '',
                            applicationProject: '',
                            actualParameters: ''
                          })}
                        >
                          添加第一个设备
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Form.List>
            </div>

          </div>
        </TabPane>

        <TabPane tab="主梁涡振隐患排查" key="3">
          <div className="space-y-6">
            {/* 主梁气动外形 */}
            <Card title="主梁气动外形" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600 mb-3">截面几何尺寸、表面缺陷、附属物位置</h4>
                
                {/* 截面宽度允许偏差 */}
                <div>
                  <label className="block text-sm font-medium mb-2">截面宽度允许偏差：±6mm（≤30m）；±8mm（>30m）</label>
                  <Form.Item
                    name={['mainBeamCheck', 'sectionWidthDeviation']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'sectionWidthDeviationDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 截面中心高允许偏差 */}
                <div>
                  <label className="block text-sm font-medium mb-2">截面中心高允许偏差：±2mm</label>
                  <Form.Item
                    name={['mainBeamCheck', 'sectionHeightDeviation']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'sectionHeightDeviationDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 截面边高允许偏差 */}
                <div>
                  <label className="block text-sm font-medium mb-2">截面边高允许偏差：±3mm</label>
                  <Form.Item
                    name={['mainBeamCheck', 'sectionEdgeDeviation']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'sectionEdgeDeviationDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 对角线差允许偏差 */}
                <div>
                  <label className="block text-sm font-medium mb-2">对角线差允许偏差：≤6mm</label>
                  <Form.Item
                    name={['mainBeamCheck', 'diagonalDeviation']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'diagonalDeviationDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 相邻节段匹配高差 */}
                <div>
                  <label className="block text-sm font-medium mb-2">相邻节段匹配高差不超过2mm</label>
                  <Form.Item
                    name={['mainBeamCheck', 'segmentHeightDiff']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'segmentHeightDiffDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 附属物的布置应符合抗风设计要求 */}
                <div>
                  <label className="block text-sm font-medium mb-2">附属物的布置应符合抗风设计要求</label>
                  <Form.Item
                    name={['mainBeamCheck', 'attachmentLayout']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                      <Radio value="无上述情况">3.无上述情况</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'attachmentLayoutDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* 抑振装置状态 */}
            <Card title="抑振装置状态" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600 mb-3">安装数量、连接牢固性、维护记录</h4>
                
                {/* 与设计一致 */}
                <div>
                  <label className="block text-sm font-medium mb-2">与设计一致</label>
                  <Form.Item
                    name={['mainBeamCheck', 'designConsistency']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                      <Radio value="无上述情况">3.无上述情况</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'designConsistencyDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 无松动/老化 */}
                <div>
                  <label className="block text-sm font-medium mb-2">无松动/老化</label>
                  <Form.Item
                    name={['mainBeamCheck', 'noLooseAging']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                      <Radio value="无上述情况">3.无上述情况</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'noLooseAgingDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* 振动特性 */}
            <Card title="振动特性" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-600 mb-3">频率、振幅与历史数据对比</h4>
                
                {/* 与设计值偏差≤10% */}
                <div>
                  <label className="block text-sm font-medium mb-2">与设计值偏差≤10%</label>
                  <Form.Item
                    name={['mainBeamCheck', 'designDeviation']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['mainBeamCheck', 'designDeviationDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="拉（吊）索涡振隐患排查" key="4">
          <div className="space-y-6">
            {/* 频率测试 */}
            <Card title="频率测试" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600 mb-3">单索频率</h4>
                
                {/* 与设计值偏差≤5% */}
                <div>
                  <label className="block text-sm font-medium mb-2">与设计值偏差≤5%</label>
                  <Form.Item
                    name={['cableCheck', 'frequencyDeviation']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['cableCheck', 'frequencyDeviationDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* 气动外形 */}
            <Card title="气动外形" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600 mb-3">连接点松动、表面腐蚀、附属物合规性</h4>
                
                {/* 安装符合设计 */}
                <div>
                  <label className="block text-sm font-medium mb-2">安装符合设计</label>
                  <Form.Item
                    name={['cableCheck', 'installationCompliance']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['cableCheck', 'installationComplianceDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 无裂纹/腐蚀 */}
                <div>
                  <label className="block text-sm font-medium mb-2">无裂纹/腐蚀</label>
                  <Form.Item
                    name={['cableCheck', 'noCrackCorrosion']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['cableCheck', 'noCrackCorrosionDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* 抑振装置状态 */}
            <Card title="抑振装置状态" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-600 mb-3">安装数量、连接牢固性、维护记录</h4>
                
                {/* 与设计一致 */}
                <div>
                  <label className="block text-sm font-medium mb-2">与设计一致</label>
                  <Form.Item
                    name={['cableCheck', 'designConsistency']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                      <Radio value="无上述情况">3.无上述情况</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['cableCheck', 'designConsistencyDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>

                {/* 无松动/老化 */}
                <div>
                  <label className="block text-sm font-medium mb-2">无松动/老化</label>
                  <Form.Item
                    name={['cableCheck', 'noLooseAging']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                      <Radio value="无上述情况">3.无上述情况</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['cableCheck', 'noLooseAgingDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="外部环境排查" key="5">
          <div className="space-y-6">
            {/* 桥址风场 */}
            <Card title="桥址风场" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600 mb-3">风速、风向、来流攻角</h4>
                
                {/* 桥面10min平均风速不超过0.8倍桥面设计基准风速 */}
                <div>
                  <label className="block text-sm font-medium mb-2">桥面10min平均风速不超过0.8倍桥面设计基准风速</label>
                  <Form.Item
                    name={['environmentCheck', 'bridgeWindSpeed']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['environmentCheck', 'bridgeWindSpeedDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* 周围建筑物 */}
            <Card title="周围建筑物" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600 mb-3">新建设施对风场的干扰</h4>
                
                {/* 无新建并行大桥、特大桥 */}
                <div>
                  <label className="block text-sm font-medium mb-2">无新建并行大桥、特大桥</label>
                  <Form.Item
                    name={['environmentCheck', 'noNewBridges']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['environmentCheck', 'noNewBridgesDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* 交通运行 */}
            <Card title="交通运行" size="small">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-600 mb-3">高峰/非高峰流量、车辆类型分布</h4>
                
                {/* 与同时段既往数据改变不超过30% */}
                <div>
                  <label className="block text-sm font-medium mb-2">与同时段既往数据改变不超过30%</label>
                  <Form.Item
                    name={['environmentCheck', 'trafficDataChange']}
                    rules={[{ required: true, message: '请选择检查结果' }]}
                  >
                    <Radio.Group>
                      <Radio value="满足">1.满足</Radio>
                      <Radio value="不满足">2.不满足</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name={['environmentCheck', 'trafficDataChangeDetail']}>
                    <TextArea rows={2} placeholder="详细描述" />
                  </Form.Item>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="排查结论" key="6">
          <Form.Item
            name="issues"
            label="发现问题"
            rules={[{ required: true, message: '请输入发现的问题' }]}
          >
            <TextArea rows={4} placeholder="请详细描述排查中发现的问题" />
          </Form.Item>
          
          <Form.Item
            name="recommendations"
            label="处理建议"
            rules={[{ required: true, message: '请输入处理建议' }]}
          >
            <TextArea rows={4} placeholder="请提出针对性的处理建议和措施" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="completionRate"
                label="完成率(%)"
                rules={[{ required: true, message: '请输入完成率' }]}
              >
                <InputNumber min={0} max={100} placeholder="请输入完成率" className="w-full" addonAfter="%" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="排查状态"
                rules={[{ required: true, message: '请选择排查状态' }]}
              >
                <Select placeholder="请选择排查状态">
                  <Option value="已完成">已完成</Option>
                  <Option value="进行中">进行中</Option>
                  <Option value="待处理">待处理</Option>
                  <Option value="暂停">暂停</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">排查要点提醒：</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>主梁气动外形设计应优先考虑风洞实验或数值模拟验证</li>
              <li>截面尺寸偏差应控制在设计允许范围内</li>
              <li>表面缺陷面积不应超过相关标准要求</li>
              <li>附属物位置应符合气动设计要求</li>
              <li>拉（吊）索外观和连接部位应定期检查维护</li>
              <li>抑振装置应保持良好工作状态</li>
              <li>应重点关注桥址风场特性对涡振的影响</li>
              <li>振动振幅应在设计允许范围内</li>
            </ul>
          </div>
        </TabPane>
      </Tabs>
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
            <DatePicker 
              className="w-full" 
              format="YYYY-MM-DD"
              placeholder="请选择评估日期"
            />
          </Form.Item>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="主梁结构评估" key="1">
          <Divider orientation="left">主梁气动外形</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['mainBeamAssessment', 'aerodynamicDesign', 'level']}
                label="气动外形设计"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 做过风洞实验和数值模拟</Option>
                  <Option value={2}>2级 - 做过风洞实验或数值模拟（仅其一）</Option>
                  <Option value={3}>3级 - 未做过风洞实验和数值模拟</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['mainBeamAssessment', 'sectionDeviation', 'level']}
                label="截面尺寸偏差"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 偏差 &lt; 1%</Option>
                  <Option value={2}>2级 - 1% ≤ 偏差 &lt; 2%</Option>
                  <Option value={5}>5级 - 偏差 ≥ 2%</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['mainBeamAssessment', 'surfaceDefects', 'level']}
                label="表面缺陷"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 缺陷面积 &lt; 2%</Option>
                  <Option value={2}>2级 - 2% ≤ 缺陷面积 &lt; 5%</Option>
                  <Option value={4}>4级 - 缺陷面积 ≥ 5%</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['mainBeamAssessment', 'attachmentPosition', 'level']}
                label="附属物位置"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 位置偏差 &lt; 2 cm</Option>
                  <Option value={2}>2级 - 2 cm ≤ 偏差 &lt; 5 cm</Option>
                  <Option value={4}>4级 - 偏差 ≥ 5 cm</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">主梁振动特性</Divider>
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
                name="dampingRatio"
                label="阻尼比"
                rules={[{ required: true, message: '请输入阻尼比' }]}
              >
                <InputNumber min={0} max={1} step={0.001} placeholder="请输入阻尼比" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name={['mainBeamAssessment', 'verticalFreq', 'level']}
                label="竖向弯曲振动频率评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - V &gt; 1.2Vc</Option>
                  <Option value={2}>2级 - 1.0Vc &lt; V ≤ 1.2Vc</Option>
                  <Option value={3}>3级 - 0.8Vc &lt; V ≤ 1.0Vc</Option>
                  <Option value={4}>4级 - 0.6Vc &lt; V ≤ 0.8Vc</Option>
                  <Option value={5}>5级 - V ≤ 0.6Vc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['mainBeamAssessment', 'torsionalFreq', 'level']}
                label="扭转振动频率评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - V &gt; 1.2Vc</Option>
                  <Option value={2}>2级 - 1.0Vc &lt; V ≤ 1.2Vc</Option>
                  <Option value={3}>3级 - 0.8Vc &lt; V ≤ 1.0Vc</Option>
                  <Option value={4}>4级 - 0.6Vc &lt; V ≤ 0.8Vc</Option>
                  <Option value={5}>5级 - V ≤ 0.6Vc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['mainBeamAssessment', 'dampingRatio', 'level']}
                label="桥梁阻尼比评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - ζ ≥ 0.9ζ₀</Option>
                  <Option value={2}>2级 - 0.8ζ₀ ≤ ζ &lt; 0.9ζ₀</Option>
                  <Option value={3}>3级 - 0.6ζ₀ ≤ ζ &lt; 0.8ζ₀</Option>
                  <Option value={4}>4级 - 0.4ζ₀ ≤ ζ &lt; 0.6ζ₀</Option>
                  <Option value={5}>5级 - ζ &lt; 0.4ζ₀</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">桥梁抑振措施</Divider>
          <Form.Item
            name={['mainBeamAssessment', 'suppressionMeasures', 'level']}
            label="抑振措施评估"
            rules={[{ required: true, message: '请选择评估等级' }]}
          >
            <Select placeholder="请选择评估等级">
              <Option value={1}>1级 - 抑振系统完备，设有阻尼器、风嘴、导流板等</Option>
              <Option value={2}>2级 - 有个别抑振措施（如单一导流板）</Option>
              <Option value={3}>3级 - 有抑振措施但设备老化、功能下降</Option>
              <Option value={4}>4级 - 无任何抑振措施</Option>
            </Select>
          </Form.Item>
        </TabPane>

        <TabPane tab="拉（吊）索结构评估" key="2">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="cableFreq"
                label="拉索频率(Hz)"
                rules={[{ required: true, message: '请输入拉索频率' }]}
              >
                <InputNumber min={0} step={0.01} placeholder="请输入拉索频率" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['cableAssessment', 'appearance', 'level']}
                label="拉（吊）索外形"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 连接部位无松动、表面无缺陷</Option>
                  <Option value={2}>2级 - 表面缺陷面积 ≤ 5%</Option>
                  <Option value={4}>4级 - 连接部位松动/裂纹/损坏或表面缺陷面积 &gt; 5%</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['cableAssessment', 'frequency', 'level']}
                label="拉（吊）索频率评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - V &gt; 1.2Vc</Option>
                  <Option value={2}>2级 - 1.0Vc &lt; V ≤ 1.2Vc</Option>
                  <Option value={3}>3级 - 0.75Vc &lt; V ≤ 1.0Vc</Option>
                  <Option value={4}>4级 - 0.5Vc &lt; V ≤ 0.75Vc</Option>
                  <Option value={5}>5级 - V ≤ 0.5Vc</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={['cableAssessment', 'suppressionMeasures', 'level']}
            label="拉（吊）索抑振措施"
            rules={[{ required: true, message: '请选择评估等级' }]}
          >
            <Select placeholder="请选择评估等级">
              <Option value={1}>1级 - 抑振系统完备（如设置内置/外置阻尼器）</Option>
              <Option value={3}>3级 - 有抑振措施但老化、功能下降</Option>
              <Option value={4}>4级 - 无任何抑振措施</Option>
            </Select>
          </Form.Item>
        </TabPane>

        <TabPane tab="外部环境评估" key="3">
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

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name={['environmentAssessment', 'windField', 'level']}
                label="桥址风场紊流强度"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 紊流强度很高（如山区峡谷、城市高楼间）</Option>
                  <Option value={2}>2级 - 紊流强度较高</Option>
                  <Option value={3}>3级 - 紊流强度不高</Option>
                  <Option value={4}>4级 - 风场相对均匀</Option>
                  <Option value={5}>5级 - 均匀场（如开阔平原、海上）</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['environmentAssessment', 'trafficVolume', 'level']}
                label="交通量评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - Q &lt; 0.5Qd</Option>
                  <Option value={2}>2级 - 0.5Qd ≤ Q &lt; 0.7Qd</Option>
                  <Option value={3}>3级 - 0.7Qd ≤ Q &lt; 0.9Qd</Option>
                  <Option value={4}>4级 - 0.9Qd ≤ Q &lt; Qd</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['environmentAssessment', 'heavyVehicles', 'level']}
                label="大吨位车辆评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - r &lt; 0.3</Option>
                  <Option value={2}>2级 - 0.3 ≤ r &lt; 0.5</Option>
                  <Option value={3}>3级 - 0.5 ≤ r &lt; 0.8</Option>
                  <Option value={4}>4级 - 0.8 ≤ r &lt; 1.0</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="振幅评估" key="4">
          <Row gutter={16}>
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
            <Col span={8}>
              <Form.Item
                name="vibrationAmplitude"
                label="总振动振幅(m)"
                rules={[{ required: true, message: '请输入总振动振幅' }]}
              >
                <InputNumber min={0} step={0.01} placeholder="请输入总振动振幅" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['vibrationAmplitudeAssessment', 'vertical', 'level']}
                label="竖向涡振振幅评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - Av &lt; 0.2Av,allow</Option>
                  <Option value={2}>2级 - 0.2Av,allow ≤ Av &lt; 0.4Av,allow</Option>
                  <Option value={3}>3级 - 0.4Av,allow ≤ Av &lt; 0.6Av,allow</Option>
                  <Option value={4}>4级 - 0.6Av,allow ≤ Av &lt; Av,allow</Option>
                  <Option value={5}>5级 - Av ≥ Av,allow</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['vibrationAmplitudeAssessment', 'torsional', 'level']}
                label="扭转涡振振幅评估"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - Aθ &lt; 0.2Aθ,allow</Option>
                  <Option value={2}>2级 - 0.2Aθ,allow ≤ Aθ &lt; 0.4Aθ,allow</Option>
                  <Option value={3}>3级 - 0.4Aθ,allow ≤ Aθ &lt; 0.6Aθ,allow</Option>
                  <Option value={4}>4级 - 0.6Aθ,allow ≤ Aθ &lt; Aθ,allow</Option>
                  <Option value={5}>5级 - Aθ ≥ Aθ,allow</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="综合评估" key="5">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="riskCategory"
                label="风险类别"
                rules={[{ required: true, message: '请选择风险类别' }]}
              >
                <Select placeholder="请选择风险类别">
                  <Option value="1类">1类 - 涡振风险隐患小</Option>
                  <Option value="2类">2类 - 涡振风险隐患较小</Option>
                  <Option value="3类">3类 - 涡振风险隐患中等</Option>
                  <Option value="4类">4类 - 涡振风险隐患较大</Option>
                  <Option value="5类">5类 - 涡振风险隐患大</Option>
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

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">风险评估说明</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div>• 各指标评估等级分为1级、2级、3级、4级、5级，对应得分分别为100、80、65、40、0</div>
              <div>• 主梁结构评估取各项指标中的最低等级</div>
              <div>• 拉（吊）索结构评估取各项指标中的最低等级</div>
              <div>• 桥梁整体涡振风险评估类别取主梁和拉（吊）索两类评估结果中的较差者</div>
              <div>• 最终风险类别根据主梁/拉（吊）索评估得分与外部环境评估得分查表确定</div>
            </div>
          </div>
        </TabPane>
      </Tabs>
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
            <DatePicker 
              showTime 
              className="w-full" 
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择事件时间"
            />
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

  // 根据路由路径确定当前页面内容
  const getCurrentPageContent = () => {
    const path = window.location.hash.replace('#', '');
    
    switch (path) {
      case '/hazard-inspection':
        return renderHazardInspectionPage();
      case '/risk-assessment':
        return renderRiskAssessmentPage();
      case '/emergency-response':
        return renderEmergencyResponsePage();
      case '/monitoring-equipment':
        return renderMonitoringEquipmentPage();
      case '/inspection-plan':
        return renderInspectionPlanPage();
      case '/knowledge-base':
        return renderKnowledgeBasePage();
      case '/system-settings':
        return renderSystemSettingsPage();
      default:
        return renderHazardInspectionPage();
    }
  };

  // 隐患排查页面
  const renderHazardInspectionPage = () => (
    <div className="space-y-6">
      {/* 重要提醒 */}
      <Alert
        message="涡振隐患排查提醒"
        description={`当前有 ${statistics.highRiskBridges} 座桥梁存在重大涡振隐患，${statistics.pendingInspections} 项排查计划待执行。建议优先处理高风险桥梁的隐患治理工作。`}
        type="warning"
        showIcon
        closable
        className="mb-4"
      />

      {/* 统计概览 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="管辖桥梁总数"
              value={statistics.totalBridges}
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              涵盖悬索桥、斜拉桥、梁桥等类型
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="已排查桥梁"
              value={statistics.inspectedBridges}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              排查完成率 {Math.round((statistics.inspectedBridges / statistics.totalBridges) * 100)}%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="高风险桥梁"
              value={statistics.highRiskBridges}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              需重点关注和优先处理
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="应急事件"
              value={statistics.emergencyEvents}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              本月新增事件数量
            </div>
          </Card>
        </Col>
      </Row>

      {/* 主要内容区域 */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">桥梁涡振隐患排查</h3>
          <Space>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setDrawerVisible(true)}
            >
              高级筛选
            </Button>
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
          scroll={{ x: 1400 }}
        />
      </Card>
    </div>
  );

  // 风险评估页面
  const renderRiskAssessmentPage = () => (
    <div className="space-y-6">
      {/* 风险评估统计 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="风险评估总数"
              value={riskAssessmentData.length}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="重大风险"
              value={riskAssessmentData.filter(item => item.overallRisk === '重大').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="较大风险"
              value={riskAssessmentData.filter(item => item.overallRisk === '较大').length}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="风险类别分布" className="hover:shadow-lg transition-shadow">
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

      <Card>
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
      </Card>
    </div>
  );

  // 应急处置页面
  const renderEmergencyResponsePage = () => (
    <div className="space-y-6">
      {/* 应急处置统计 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="应急事件总数"
              value={emergencyData.length}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="已处置事件"
              value={emergencyData.filter(item => item.status === '已处置').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="处置中事件"
              value={emergencyData.filter(item => item.status === '处置中').length}
              prefix={<SyncOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="平均响应时间"
              value="12"
              suffix="分钟"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
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
      </Card>
    </div>
  );

  // 监测设备页面
  const renderMonitoringEquipmentPage = () => (
    <div className="space-y-6">
      {/* 设备统计 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="设备总数"
              value={statistics.onlineDevices + statistics.offlineDevices}
              prefix={<MonitorOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="在线设备"
              value={statistics.onlineDevices}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="离线设备"
              value={statistics.offlineDevices}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="设备在线率"
              value={Math.round((statistics.onlineDevices / (statistics.onlineDevices + statistics.offlineDevices)) * 100)}
              suffix="%"
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">监测设备管理</h3>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAdd('monitoring')}
            >
              添加设备
            </Button>
            <Button icon={<SettingOutlined />}>
              设备配置
            </Button>
          </Space>
        </div>
        
        <Table
          columns={[
            {
              title: '桥梁名称',
              dataIndex: 'bridgeName',
              key: 'bridgeName',
              width: 200,
            },
            {
              title: '设备类型',
              dataIndex: 'deviceType',
              key: 'deviceType',
              width: 150,
            },
            {
              title: '安装位置',
              dataIndex: 'location',
              key: 'location',
              width: 150,
            },
            {
              title: '运行状态',
              dataIndex: 'status',
              key: 'status',
              width: 100,
              render: (status) => (
                <Tag color={status === '正常' ? 'green' : 'red'}>{status}</Tag>
              ),
            },
            {
              title: '数据质量',
              dataIndex: 'dataQuality',
              key: 'dataQuality',
              width: 100,
              render: (quality) => (
                <Tag color={quality === '优秀' ? 'green' : quality === '良好' ? 'blue' : 'orange'}>{quality}</Tag>
              ),
            },
            {
              title: '上次维护',
              dataIndex: 'lastMaintenance',
              key: 'lastMaintenance',
              width: 120,
            },
            {
              title: '下次维护',
              dataIndex: 'nextMaintenance',
              key: 'nextMaintenance',
              width: 120,
            },
            {
              title: '操作',
              key: 'action',
              width: 200,
              render: (_, record) => (
                <Space size="small">
                  <Button type="link" icon={<EyeOutlined />}>
                    查看
                  </Button>
                  <Button type="link" icon={<SettingOutlined />}>
                    配置
                  </Button>
                  <Button type="link" icon={<EditOutlined />}>
                    维护
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={monitoringData}
          pagination={{
            total: monitoringData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );

  // 排查计划页面
  const renderInspectionPlanPage = () => (
    <div className="space-y-6">
      {/* 计划统计 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="计划总数"
              value={inspectionPlan.length}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="待执行计划"
              value={inspectionPlan.filter(item => item.status === '计划中').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="紧急计划"
              value={inspectionPlan.filter(item => item.status === '紧急').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="本月计划"
              value={5}
              prefix={<FlagOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">排查计划管理</h3>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAdd('plan')}
            >
              制定计划
            </Button>
            <Button icon={<CalendarOutlined />}>
              日历视图
            </Button>
          </Space>
        </div>
        
        <Table
          columns={[
            {
              title: '桥梁名称',
              dataIndex: 'bridgeName',
              key: 'bridgeName',
              width: 200,
            },
            {
              title: '计划类型',
              dataIndex: 'planType',
              key: 'planType',
              width: 120,
              render: (type) => (
                <Tag color={type === '定期排查' ? 'blue' : type === '季节性监测' ? 'green' : 'red'}>{type}</Tag>
              ),
            },
            {
              title: '计划日期',
              dataIndex: 'scheduledDate',
              key: 'scheduledDate',
              width: 120,
            },
            {
              title: '负责人',
              dataIndex: 'inspector',
              key: 'inspector',
              width: 100,
            },
            {
              title: '优先级',
              dataIndex: 'priority',
              key: 'priority',
              width: 100,
              render: (priority) => (
                <Tag color={priority === '高' ? 'red' : priority === '中' ? 'orange' : 'green'}>{priority}</Tag>
              ),
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              width: 100,
              render: (status) => (
                <Tag color={status === '紧急' ? 'red' : status === '计划中' ? 'blue' : 'green'}>{status}</Tag>
              ),
            },
            {
              title: '操作',
              key: 'action',
              width: 200,
              render: (_, record) => (
                <Space size="small">
                  <Button type="link" icon={<EyeOutlined />}>
                    查看
                  </Button>
                  <Button type="link" icon={<EditOutlined />}>
                    编辑
                  </Button>
                  <Button type="link" icon={<FlagOutlined />}>
                    执行
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={inspectionPlan}
          pagination={{
            total: inspectionPlan.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );

  // 专家知识库页面
  const renderKnowledgeBasePage = () => (
    <div className="space-y-6">
      {/* 知识库统计 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="资料总数"
              value={knowledgeBase.length}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="理论研究"
              value={knowledgeBase.filter(item => item.category === '理论研究').length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="技术标准"
              value={knowledgeBase.filter(item => item.category === '技术标准').length}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic
              title="总下载量"
              value={knowledgeBase.reduce((sum, item) => sum + item.downloads, 0)}
              prefix={<DownloadOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">专家知识库</h3>
          <Space>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={() => handleAdd('knowledge')}
            >
              上传资料
            </Button>
            <Button icon={<SearchOutlined />}>
              搜索资料
            </Button>
          </Space>
        </div>
        
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={knowledgeBase}
          renderItem={(item) => (
            <List.Item
              key={item.key}
              actions={[
                <Button type="link" icon={<EyeOutlined />}>查看</Button>,
                <Button type="link" icon={<DownloadOutlined />}>下载</Button>,
                <span><DownloadOutlined /> {item.downloads}</span>,
              ]}
              extra={
                <div className="w-32">
                  <Tag color="blue">{item.category}</Tag>
                </div>
              }
            >
              <List.Item.Meta
                avatar={<Avatar icon={<BookOutlined />} />}
                title={<a href="#">{item.title}</a>}
                description={
                  <div>
                    <div>作者: {item.author}</div>
                    <div>发布时间: {item.publishDate}</div>
                    <div className="mt-2">
                      {item.tags.map(tag => (
                        <Tag key={tag} size="small">{tag}</Tag>
                      ))}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );

  // 系统设置页面
  const renderSystemSettingsPage = () => (
    <div className="space-y-6">
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">系统设置</h3>
        </div>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="基础设置" className="h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>系统名称</span>
                  <Input defaultValue="大跨桥梁涡振风险管控系统" style={{ width: 200 }} />
                </div>
                <div className="flex justify-between items-center">
                  <span>数据刷新间隔</span>
                  <Select defaultValue="5" style={{ width: 120 }}>
                    <Option value="1">1分钟</Option>
                    <Option value="5">5分钟</Option>
                    <Option value="10">10分钟</Option>
                    <Option value="30">30分钟</Option>
                  </Select>
                </div>
                <div className="flex justify-between items-center">
                  <span>自动保存</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="通知设置" className="h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>风险预警通知</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span>设备异常通知</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span>排查提醒通知</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} lg={12}>
            <Card title="数据管理" className="h-full">
              <div className="space-y-4">
                <Button type="primary" block icon={<ExportOutlined />}>
                  导出系统数据
                </Button>
                <Button block icon={<UploadOutlined />}>
                  导入系统数据
                </Button>
                <Button danger block icon={<DeleteOutlined />}>
                  清空历史数据
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="系统信息" className="h-full">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="系统版本">v1.0.0</Descriptions.Item>
                <Descriptions.Item label="最后更新">2024-01-30</Descriptions.Item>
                <Descriptions.Item label="数据库版本">MySQL 8.0</Descriptions.Item>
                <Descriptions.Item label="运行状态">
                  <Tag color="green">正常运行</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );

  return (
    <div>
      {getCurrentPageContent()}

      {/* 高级筛选抽屉 */}
      <Drawer
        title="高级筛选"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
      >
        <Form layout="vertical">
          <Form.Item label="桥梁类型">
            <Checkbox.Group>
              <div className="space-y-2">
                <div><Checkbox value="悬索桥">悬索桥</Checkbox></div>
                <div><Checkbox value="斜拉桥">斜拉桥</Checkbox></div>
                <div><Checkbox value="钢结构梁桥">钢结构梁桥</Checkbox></div>
                <div><Checkbox value="拱桥">拱桥</Checkbox></div>
              </div>
            </Checkbox.Group>
          </Form.Item>
          
          <Form.Item label="风险等级">
            <Checkbox.Group>
              <div className="space-y-2">
                <div><Checkbox value="重大">重大</Checkbox></div>
                <div><Checkbox value="较大">较大</Checkbox></div>
                <div><Checkbox value="一般">一般</Checkbox></div>
                <div><Checkbox value="低">低</Checkbox></div>
              </div>
            </Checkbox.Group>
          </Form.Item>
          
          <Form.Item label="排查类型">
            <Checkbox.Group>
              <div className="space-y-2">
                <div><Checkbox value="初始排查">初始排查</Checkbox></div>
                <div><Checkbox value="定期排查">定期排查</Checkbox></div>
                <div><Checkbox value="季节性监测">季节性监测</Checkbox></div>
                <div><Checkbox value="特殊情况排查">特殊情况排查</Checkbox></div>
              </div>
            </Checkbox.Group>
          </Form.Item>
          
          <Form.Item label="排查日期">
            <RangePicker className="w-full" />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary">应用筛选</Button>
              <Button>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

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
