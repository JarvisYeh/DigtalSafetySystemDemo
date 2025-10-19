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
import { useDataContext } from '../context/DataContext';
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

function BridgeVortexVibration({ pageType }) {
  const { 
    hazardInspectionData, 
    riskAssessmentData, 
    emergencyResponseData,
    addHazardInspection,
    updateHazardInspection,
    deleteHazardInspection,
    addRiskAssessment, 
    updateRiskAssessment,
    deleteRiskAssessment,
    addEmergencyResponse,
    updateEmergencyResponse,
    deleteEmergencyResponse
  } = useDataContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBridge, setSelectedBridge] = useState(null);

  // 计算得分的函数
  const calculateScore = (level) => {
    const scoreMap = { 1: 100, 2: 80, 3: 65, 4: 40, 5: 0 };
    return scoreMap[level] || 0;
  };

  // 自动计算各类别得分
  const calculateCategoryScores = () => {
    const formValues = form.getFieldsValue();
    console.log('Form values:', formValues);
    
    // 计算主梁结构评估得分 D1 - 包含所有主梁评估字段
    const mainBeamFields = [
      formValues.mainBeamAssessment?.aerodynamicDesign?.level,
      formValues.mainBeamAssessment?.sectionDeviation?.level,
      formValues.mainBeamAssessment?.surfaceDefects?.level,
      formValues.mainBeamAssessment?.attachmentPosition?.level,
      formValues.mainBeamAssessment?.verticalFreq?.level,
      formValues.mainBeamAssessment?.torsionalFreq?.level,
      formValues.mainBeamAssessment?.dampingRatio?.level,
      formValues.mainBeamAssessment?.suppressionMeasures?.level
    ];
    
    const mainBeamScore = mainBeamFields.length > 0 
      ? Math.round(mainBeamFields.reduce((sum, level) => sum + calculateScore(level || 0), 0) / mainBeamFields.length)
      : 0;

    // 计算拉索结构评估得分 D2 - 包含所有拉索评估字段
    const cableFields = [
      formValues.cableAssessment?.appearance?.level,
      formValues.cableAssessment?.frequency?.level,
      formValues.cableAssessment?.suppressionMeasures?.level
    ];
    
    const cableScore = cableFields.length > 0 
      ? Math.round(cableFields.reduce((sum, level) => sum + calculateScore(level || 0), 0) / cableFields.length)
      : 0;

    // 计算外部环境评估得分 D3 - 包含所有环境评估字段
    const environmentFields = [
      formValues.environmentAssessment?.windField?.level,
      formValues.environmentAssessment?.trafficLoad?.level,
      formValues.environmentAssessment?.heavyVehicles?.level
    ];
    
    const environmentScore = environmentFields.length > 0 
      ? Math.round(environmentFields.reduce((sum, level) => sum + calculateScore(level || 0), 0) / environmentFields.length)
      : 0;

    console.log('Calculated scores:', { mainBeamScore, cableScore, environmentScore });

    // 更新表单字段
    form.setFieldsValue({
      mainBeamScore: mainBeamScore,
      cableScore: cableScore,
      environmentScore: environmentScore
    });
    
    // 强制重新渲染
    setTimeout(() => {
      form.setFieldsValue({
        mainBeamScore: mainBeamScore,
        cableScore: cableScore,
        environmentScore: environmentScore
      });
    }, 50);
  };

  // 监听表单值变化，自动计算得分
  React.useEffect(() => {
    // 初始化时设置默认分数
    form.setFieldsValue({
      mainBeamScore: 0,
      cableScore: 0,
      environmentScore: 0
    });
    calculateCategoryScores();
  }, []);

  // 监听表单字段变化
  const onValuesChange = (changedValues, allValues) => {
    console.log('Values changed:', changedValues);
    // 当主梁、拉索、环境评估相关字段变化时重新计算
    const shouldRecalculate = Object.keys(changedValues).some(key => 
      key.includes('mainBeamAssessment') || 
      key.includes('cableAssessment') || 
      key.includes('environmentAssessment')
    );
    
    if (shouldRecalculate) {
      setTimeout(() => {
        calculateCategoryScores();
      }, 100);
    }
  };

  // 隐患排查数据 - 已迁移到DataContext，保留作为备用数据
  const [hazardDataBackup, setHazardDataBackup] = useState([
    {
      key: '1',
      id: 'BVH001',
      bridgeName: '某大跨径悬索桥',
      bridgeStakeNumber: 'K15+200~K16+400',
      bridgeStructureForm: '悬索桥',
      bridgeSpan: '主跨1200m，边跨各400m',
      bridgeType: '悬索桥',
      mainSpan: 1200,
      location: '某市某区跨江大桥',
      buildYear: 2018,
      designUnit: '某桥梁设计研究院',
      inspectionDate: '2024-01-15',
      nextInspectionDate: '2023-07-15',
      inspectionType: '定期排查',
      riskLevel: '较大',
      status: '已完成',
      inspector: '张工程师',
      issues: ['主梁气动外形轻微缺陷', '部分抑振装置松动', '桥面附属物位置不当'],
      recommendations: ['加强监测', '维修抑振装置', '调整附属物位置'],
      equipmentList: [
        {
          deviceType: '全站仪',
          deviceModel: 'Leica TS16',
          applicationProject: ['主梁气动外形检查', '截面尺寸测量', '附属物位置测量'],
          actualParameters: '测量精度: ±1mm\n测量距离: 1000m\n角度精度: ±1"\n环境温度: 15°C\n湿度: 65%'
        },
        {
          deviceType: '三维激光扫描仪',
          deviceModel: 'FARO Focus3D X330',
          applicationProject: ['表面缺陷检测', '截面尺寸测量', '振动频率测试'],
          actualParameters: '扫描精度: ±2mm\n扫描速度: 976,000点/秒\n测量范围: 0.6-330m\n激光等级: Class 1\n工作温度: 5-40°C'
        },
        {
          deviceType: '加速度传感器',
          deviceModel: 'PCB 393B12',
          applicationProject: ['振动频率测试', '阻尼比测量', '振动振幅测量'],
          actualParameters: '频率范围: 0.5-10000Hz\n灵敏度: 10V/g\n测量范围: ±500g\n工作温度: -54-121°C\n供电电压: 18-30VDC'
        },
        {
          deviceType: '风速风向仪',
          deviceModel: 'Vaisala WXT536',
          applicationProject: ['风场环境监测', '抑振装置检查'],
          actualParameters: '风速范围: 0-60m/s\n风速精度: ±0.3m/s\n风向范围: 0-360°\n风向精度: ±3°\n工作温度: -52-60°C'
        }
      ],
      mainBeamCheck: {
        aerodynamicDesign: '做过风洞实验',
        aerodynamicShape: '良好',
        sectionWidthDeviation: '满足',
        sectionHeightDeviation: '满足',
        sectionEdgeDeviation: '满足',
        diagonalDeviation: '满足',
        segmentHeightDiff: '满足',
        attachmentLayout: '不满足',
        designConsistency: '满足',
        noLooseAging: '不满足',
        designDeviation: '满足',
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
        suppressionDevices: '抑振系统完备',
        frequencyDeviation: '满足',
        installationCompliance: '满足',
        noCrackCorrosion: '满足',
        designConsistency: '满足',
        noLooseAging: '满足'
      },
      environmentCheck: {
        windField: '紊流强度较高',
        trafficVolume: '中等交通量',
        heavyVehicles: '大吨位车辆比例适中',
        bridgeWindSpeed: '满足',
        noNewBridges: '满足',
        trafficDataChange: '满足'
      },
      vibrationSuppression: {
        devices: '部分松动',
        effectiveness: '需改进',
        maintenance: '需加强'
      },
      vibrationAmplitude: {
        vertical: '0.12m',
        torsional: '0.08m',
        overall: '0.15m'
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 2, score: 80, description: '0.7ha < hc ≤ 0.8ha' },
        torsional: { level: 3, score: 65, description: '0.8θa < θc ≤ 0.9θa' }
      },
      equipment: ['全站仪', '三维激光扫描仪', '无人机', '加速度传感器'],
      weatherConditions: '晴朗，风速12m/s，温度15°C，湿度65%',
      trafficFlow: '中等，日均车流量15000辆',
      nextInspection: '2024-07-15',
      priority: '中',
      completionRate: 85
    },
    {
      key: '2',
      id: 'BVH002',
      bridgeName: '某斜拉桥',
      bridgeStakeNumber: 'K8+100~K8+900',
      bridgeStructureForm: '斜拉桥',
      bridgeSpan: '主跨800m，边跨各200m',
      bridgeType: '斜拉桥',
      mainSpan: 800,
      location: '某市某区城市快速路',
      buildYear: 2015,
      designUnit: '某交通设计院',
      inspectionDate: '2024-01-20',
      nextInspectionDate: '2023-10-20',
      inspectionType: '特殊情况排查',
      specialInspectionReason: '近期发现拉索异常振动，风速达到25m/s时振幅明显增大，存在安全隐患',
      riskLevel: '重大',
      status: '待处理',
      inspector: '李工程师',
      issues: ['拉索频率异常', '风场环境恶劣', '阻尼比偏低', '主梁截面尺寸偏差超标', '表面缺陷面积较大'],
      recommendations: ['立即安装抑振装置', '加强监测', '优化阻尼系统', '修复表面缺陷', '调整截面尺寸'],
      equipmentList: [
        {
          deviceType: '毫米波雷达',
          deviceModel: 'IMS-5000',
          applicationProject: ['振动振幅测量', '拉索频率检测', '振动特性测试'],
          actualParameters: '测量精度: ±0.1mm\n频率范围: 0.1-50Hz\n测量距离: 5-200m\n分辨率: 0.1mm\n工作温度: -40-70°C'
        },
        {
          deviceType: '应变仪',
          deviceModel: 'TML FLA-5-11',
          applicationProject: ['阻尼比测量', '拉索外观检查', '抑振装置检查'],
          actualParameters: '应变范围: ±50000με\n精度: ±0.1%\n工作频率: 0-1000Hz\n温度补偿: 自动\n防护等级: IP67'
        },
        {
          deviceType: '三维风向仪',
          deviceModel: 'Gill WindMaster Pro',
          applicationProject: ['风场环境监测', '交通流量统计'],
          actualParameters: '风速范围: 0-45m/s\n风速精度: ±1.5%\n风向精度: ±2°\n采样频率: 32Hz\n工作温度: -35-70°C'
        }
      ],
      mainBeamCheck: {
        aerodynamicDesign: '未做风洞实验',
        aerodynamicShape: '需改进',
        sectionWidthDeviation: '不满足',
        sectionHeightDeviation: '不满足',
        sectionEdgeDeviation: '不满足',
        diagonalDeviation: '不满足',
        segmentHeightDiff: '不满足',
        attachmentLayout: '满足',
        designConsistency: '无上述情况',
        noLooseAging: '无上述情况',
        designDeviation: '不满足',
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
        suppressionDevices: '无任何抑振措施',
        frequencyDeviation: '不满足',
        installationCompliance: '不满足',
        noCrackCorrosion: '不满足',
        designConsistency: '无上述情况',
        noLooseAging: '无上述情况'
      },
      environmentCheck: {
        windField: '均匀场环境',
        trafficVolume: '接近设计交通量',
        heavyVehicles: '大吨位车辆比例高',
        bridgeWindSpeed: '不满足',
        noNewBridges: '满足',
        trafficDataChange: '不满足'
      },
      vibrationSuppression: {
        devices: '缺失',
        effectiveness: '差',
        maintenance: '急需'
      },
      vibrationAmplitude: {
        vertical: '0.25m',
        torsional: '0.15m',
        overall: '0.28m'
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 4, score: 40, description: '0.9ha < hc ≤ ha' },
        torsional: { level: 4, score: 40, description: '0.9θa < θc ≤ θa' }
      },
      equipment: ['毫米波雷达', '风速仪', '应变仪', '三维风向仪'],
      weatherConditions: '多云，风速25m/s，温度8°C，湿度78%',
      trafficFlow: '繁忙，日均车流量28000辆',
      nextInspection: '2024-02-20',
      priority: '高',
      completionRate: 45
    },
    {
      key: '3',
      id: 'BVH003',
      bridgeName: '某钢结构梁桥',
      bridgeStakeNumber: 'K25+800~K26+400',
      bridgeStructureForm: '钢结构梁桥',
      bridgeSpan: '主跨600m，连续3跨',
      bridgeType: '钢结构梁桥',
      mainSpan: 600,
      location: '某市某区工业园区',
      buildYear: 2020,
      designUnit: '某钢结构设计院',
      inspectionDate: '2024-01-25',
      nextInspectionDate: '2023-10-25',
      inspectionType: '季节性监测',
      riskLevel: '一般',
      status: '进行中',
      inspector: '王工程师',
      issues: ['附属物轻微位移', '局部表面腐蚀', '部分连接螺栓松动'],
      recommendations: ['定期维护', '防腐处理', '紧固连接螺栓'],
      equipmentList: [
        {
          deviceType: '激光测距仪',
          deviceModel: 'Leica DISTO D810',
          applicationProject: ['截面尺寸测量', '附属物位置测量', '表面缺陷检测'],
          actualParameters: '测量范围: 0.05-200m\n精度: ±1.0mm\n激光等级: Class 2\n防护等级: IP65\n工作温度: -10-50°C'
        },
        {
          deviceType: '水准仪',
          deviceModel: 'Topcon AT-B4A',
          applicationProject: ['主梁气动外形检查', '振动特性测试'],
          actualParameters: '精度: ±1.5mm/km\n放大倍率: 24倍\n最短视距: 0.3m\n补偿器范围: ±15\'\n工作温度: -20-50°C'
        },
        {
          deviceType: '光学影像设备',
          deviceModel: 'Canon EOS R5',
          applicationProject: ['表面缺陷检测', '抑振装置检查'],
          actualParameters: '分辨率: 45MP\n镜头: 24-105mm f/4L\nISO范围: 100-51200\n防抖: 5轴\n工作温度: 0-40°C'
        }
      ],
      mainBeamCheck: {
        aerodynamicDesign: '做过数值模拟',
        aerodynamicShape: '良好',
        sectionWidthDeviation: '满足',
        sectionHeightDeviation: '满足',
        sectionEdgeDeviation: '满足',
        diagonalDeviation: '满足',
        segmentHeightDiff: '满足',
        attachmentLayout: '满足',
        designConsistency: '满足',
        noLooseAging: '不满足',
        designDeviation: '满足',
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
        suppressionDevices: '无拉索',
        frequencyDeviation: '无拉索',
        installationCompliance: '无拉索',
        noCrackCorrosion: '无拉索',
        designConsistency: '无拉索',
        noLooseAging: '无拉索'
      },
      environmentCheck: {
        windField: '紊流强度不高',
        trafficVolume: '正常交通量',
        heavyVehicles: '大吨位车辆比例较低',
        bridgeWindSpeed: '满足',
        noNewBridges: '满足',
        trafficDataChange: '满足'
      },
      vibrationSuppression: {
        devices: '正常',
        effectiveness: '良好',
        maintenance: '定期'
      },
      vibrationAmplitude: {
        vertical: '0.08m',
        torsional: '0.05m',
        overall: '0.10m'
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 1, score: 100, description: 'hc ≤ 0.7ha' },
        torsional: { level: 1, score: 100, description: 'θc ≤ 0.7θa' }
      },
      equipment: ['激光测距仪', '水准仪', '光学影像设备'],
      weatherConditions: '阴天，风速8m/s，温度22°C，湿度55%',
      trafficFlow: '正常，日均车流量12000辆',
      nextInspection: '2024-04-25',
      priority: '低',
      completionRate: 70
    },
    {
      key: '4',
      id: 'BVH004',
      bridgeName: '某大跨径拱桥',
      bridgeStakeNumber: 'K35+200~K36+100',
      bridgeStructureForm: '拱桥',
      bridgeSpan: '主跨900m，拱肋钢筋混凝土结构',
      bridgeType: '拱桥',
      mainSpan: 900,
      location: '某市某区山区峡谷',
      buildYear: 2016,
      designUnit: '某桥梁工程设计院',
      inspectionDate: '2024-01-28',
      nextInspectionDate: '2023-07-28',
      inspectionType: '定期排查',
      riskLevel: '较大',
      status: '已完成',
      inspector: '赵工程师',
      issues: ['拱肋局部变形', '横撑连接松动', '桥面系振动明显'],
      recommendations: ['加固拱肋', '紧固横撑连接', '安装阻尼装置'],
      equipmentList: [
        {
          deviceType: 'GPS监测系统',
          deviceModel: 'Trimble NetR9',
          applicationProject: ['振动振幅测量', '振动特性测试', '主梁气动外形检查'],
          actualParameters: '定位精度: ±2mm+0.5ppm\n采样频率: 20Hz\n工作温度: -40-65°C\n数据存储: 8GB\n通信方式: 以太网/串口'
        },
        {
          deviceType: '应变传感器',
          deviceModel: 'HBM 1-LY41-6/120',
          applicationProject: ['阻尼比测量', '抑振装置检查', '振动特性测试'],
          actualParameters: '应变范围: ±3000με\n精度: 0.1%\n工作频率: 0-1000Hz\n温度范围: -196-200°C\n防护等级: IP68'
        },
        {
          deviceType: '位移传感器',
          deviceModel: 'LVDT LD320',
          applicationProject: ['振动振幅测量', '截面尺寸测量'],
          actualParameters: '测量范围: ±10mm\n分辨率: 0.1μm\n线性度: ±0.25%\n工作温度: -55-125°C\n激励电压: 5-24VAC'
        },
        {
          deviceType: '风速风向仪',
          deviceModel: 'Campbell Scientific 05103',
          applicationProject: ['风场环境监测'],
          actualParameters: '风速范围: 0-100m/s\n风速精度: ±0.3m/s\n风向范围: 360°\n风向精度: ±3°\n工作温度: -50-50°C'
        }
      ],
      mainBeamCheck: {
        aerodynamicDesign: '做过风洞实验和数值模拟',
        aerodynamicShape: '良好',
        sectionWidthDeviation: '满足',
        sectionHeightDeviation: '不满足',
        sectionEdgeDeviation: '满足',
        diagonalDeviation: '满足',
        segmentHeightDiff: '满足',
        attachmentLayout: '满足',
        designConsistency: '不满足',
        noLooseAging: '不满足',
        designDeviation: '满足',
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
        suppressionDevices: '无拉索',
        frequencyDeviation: '无拉索',
        installationCompliance: '无拉索',
        noCrackCorrosion: '无拉索',
        designConsistency: '无拉索',
        noLooseAging: '无拉索'
      },
      environmentCheck: {
        windField: '紊流强度很高',
        trafficVolume: '较高交通量',
        heavyVehicles: '大吨位车辆比例中等',
        bridgeWindSpeed: '满足',
        noNewBridges: '满足',
        trafficDataChange: '不满足'
      },
      vibrationSuppression: {
        devices: '设备老化',
        effectiveness: '功能下降',
        maintenance: '需更新'
      },
      vibrationAmplitude: {
        vertical: '0.15m',
        torsional: '0.10m',
        overall: '0.18m'
      },
      equipment: ['GPS监测系统', '应变传感器', '位移传感器', '风速风向仪'],
      weatherConditions: '晴朗，风速15m/s，温度18°C，湿度45%',
      trafficFlow: '较繁忙，日均车流量22000辆',
      nextInspection: '2024-07-28',
      priority: '中',
      completionRate: 90
    },
    {
      key: '5',
      id: 'BVH005',
      bridgeName: '某连续梁桥',
      bridgeStakeNumber: 'K42+600~K43+050',
      bridgeStructureForm: '连续梁桥',
      bridgeSpan: '主跨450m，连续5跨预应力混凝土',
      bridgeType: '连续梁桥',
      mainSpan: 450,
      location: '某市某区城市环线',
      buildYear: 2019,
      designUnit: '某市政设计研究院',
      inspectionDate: '2024-01-30',
      nextInspectionDate: '2023-07-30',
      inspectionType: '专项排查',
      specialInspectionReason: '近期雨季后发现支座有轻微位移，伸缩缝出现异常声响，需要专项检查',
      riskLevel: '一般',
      status: '已完成',
      inspector: '孙工程师',
      issues: ['支座轻微位移', '伸缩缝异常', '护栏连接松动'],
      recommendations: ['调整支座', '维修伸缩缝', '加固护栏连接'],
      equipmentList: [
        {
          deviceType: '加速度传感器',
          deviceModel: 'Kistler 8395A',
          applicationProject: ['振动频率测试', '阻尼比测量', '振动振幅测量'],
          actualParameters: '频率范围: 0.2-3000Hz\n灵敏度: 100mV/g\n测量范围: ±50g\n工作温度: -54-125°C\n防护等级: IP67'
        },
        {
          deviceType: '应变仪',
          deviceModel: 'Kyowa KFG-5-120-C1',
          applicationProject: ['振动特性测试', '抑振装置检查'],
          actualParameters: '应变范围: ±20000με\n精度: ±1.0%\n温度补偿: 自补偿\n工作温度: -30-80°C\n电阻: 120Ω'
        },
        {
          deviceType: '位移计',
          deviceModel: 'Novotechnik LWH-0225',
          applicationProject: ['截面尺寸测量', '附属物位置测量'],
          actualParameters: '测量范围: 225mm\n分辨率: 0.01mm\n线性度: ±0.05%\n工作温度: -40-85°C\n防护等级: IP65'
        }
      ],
      mainBeamCheck: {
        aerodynamicDesign: '做过数值模拟',
        aerodynamicShape: '良好',
        sectionWidthDeviation: '满足',
        sectionHeightDeviation: '满足',
        sectionEdgeDeviation: '满足',
        diagonalDeviation: '满足',
        segmentHeightDiff: '满足',
        attachmentLayout: '满足',
        designConsistency: '满足',
        noLooseAging: '不满足',
        designDeviation: '满足',
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
        suppressionDevices: '无拉索',
        frequencyDeviation: '无拉索',
        installationCompliance: '无拉索',
        noCrackCorrosion: '无拉索',
        designConsistency: '无拉索',
        noLooseAging: '无拉索'
      },
      environmentCheck: {
        windField: '风场相对均匀',
        trafficVolume: '正常交通量',
        heavyVehicles: '大吨位车辆比例较低',
        bridgeWindSpeed: '满足',
        noNewBridges: '满足',
        trafficDataChange: '满足'
      },
      vibrationSuppression: {
        devices: '正常',
        effectiveness: '良好',
        maintenance: '定期'
      },
      vibrationAmplitude: {
        vertical: '0.06m',
        torsional: '0.04m',
        overall: '0.07m'
      },
      equipment: ['加速度传感器', '应变仪', '位移计'],
      weatherConditions: '多云，风速10m/s，温度25°C，湿度60%',
      trafficFlow: '正常，日均车流量18000辆',
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

  // 桥梁资料库数据
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

  // 风险评估数据已从DataContext获取

  const [emergencyDataBackup, setEmergencyDataBackup] = useState([
    {
      key: '1',
      id: 'BVE001',
      bridgeName: '某斜拉桥',
      mainBeamTech: ['加装简易阻尼装置法'],
      cableTech: ['局部质量附加法', '扰流与表面扰动法'],
      environmentTech: []
    },
    {
      key: '2',
      id: 'BVE002',
      bridgeName: '某悬索桥',
      mainBeamTech: ['桥面扰流与节流法'],
      cableTech: [],
      environmentTech: ['交通扰动控制法']
    },
    {
      key: '3',
      id: 'BVE003',
      bridgeName: '某钢桁梁桥',
      mainBeamTech: [],
      cableTech: ['柔性连接装置法'],
      environmentTech: ['扰流法', '交通扰动控制法']
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
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteHazard(record)}
          >
            删除
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
      title: '风险类别',
      dataIndex: 'riskCategory',
      key: 'riskCategory',
      width: 100,
      render: (category) => (
        <Tag color="blue">{category}</Tag>
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
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRisk(record)}
          >
            删除
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
      title: '主梁应急抑振技术',
      dataIndex: 'mainBeamTech',
      key: 'mainBeamTech',
      width: 200,
      render: (techs) => (
        <div>
          {techs && techs.length > 0 ? techs.map(tech => (
            <Tag key={tech} color="blue" className="mb-1">{tech}</Tag>
          )) : <span className="text-gray-400">未选择</span>}
        </div>
      ),
    },
    {
      title: '拉（吊）索应急抑振技术',
      dataIndex: 'cableTech',
      key: 'cableTech',
      width: 200,
      render: (techs) => (
        <div>
          {techs && techs.length > 0 ? techs.map(tech => (
            <Tag key={tech} color="green" className="mb-1">{tech}</Tag>
          )) : <span className="text-gray-400">未选择</span>}
        </div>
      ),
    },
    {
      title: '外部环境应急干预技术',
      dataIndex: 'environmentTech',
      key: 'environmentTech',
      width: 200,
      render: (techs) => (
        <div>
          {techs && techs.length > 0 ? techs.map(tech => (
            <Tag key={tech} color="orange" className="mb-1">{tech}</Tag>
          )) : <span className="text-gray-400">未选择</span>}
        </div>
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
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteEmergency(record)}
          >
            删除
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
            <Descriptions.Item label="桥梁桩号">{record.bridgeStakeNumber || '未填写'}</Descriptions.Item>
            <Descriptions.Item label="桥梁结构形式">{record.bridgeStructureForm || record.bridgeType}</Descriptions.Item>
            <Descriptions.Item label="桥梁跨径">{record.bridgeSpan || `主跨${record.mainSpan}m`}</Descriptions.Item>
            <Descriptions.Item label="桥梁位置">{record.location}</Descriptions.Item>
            <Descriptions.Item label="建成年份">{record.buildYear || '未填写'}</Descriptions.Item>
            <Descriptions.Item label="设计单位">{record.designUnit || '未填写'}</Descriptions.Item>
            <Descriptions.Item label="排查日期">{record.inspectionDate}</Descriptions.Item>
            <Descriptions.Item label="上次排查日期">{record.nextInspectionDate || '未填写'}</Descriptions.Item>
            <Descriptions.Item label="排查类型">{record.inspectionType}</Descriptions.Item>
            <Descriptions.Item label="排查人员">{record.inspector}</Descriptions.Item>
            <Descriptions.Item label="风险等级">
              <Tag color={record.riskLevel === '重大' ? 'red' : record.riskLevel === '较大' ? 'orange' : 'green'}>{record.riskLevel}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={record.status === '已完成' ? 'green' : record.status === '进行中' ? 'blue' : 'orange'}>{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="完成率">
              <Progress percent={record.completionRate || 0} size="small" />
            </Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={record.priority === '高' ? 'red' : record.priority === '中' ? 'orange' : 'green'}>{record.priority || '中'}</Tag>
            </Descriptions.Item>
          </Descriptions>

          {record.specialInspectionReason && (
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">特殊情况排查原因</h4>
              <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                {record.specialInspectionReason}
              </div>
            </div>
          )}

          <Divider />

          <div>
            <h4 className="font-semibold mb-3 text-purple-600">
              <ToolOutlined className="mr-2" />
              使用设备与参数
            </h4>
            {record.equipmentList && record.equipmentList.length > 0 ? (
              <div className="space-y-4">
                {record.equipmentList.map((equipment, index) => (
                  <Card key={index} size="small" title={`设备 ${index + 1}: ${equipment.deviceType}`}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <div><strong>设备型号：</strong>{equipment.deviceModel}</div>
                        <div><strong>应用项目：</strong>
                          {Array.isArray(equipment.applicationProject) 
                            ? equipment.applicationProject.map(item => (
                                <Tag key={item} size="small" color="blue" className="ml-1">{item}</Tag>
                              ))
                            : equipment.applicationProject
                          }
                        </div>
                      </Col>
                      <Col span={12}>
                        <div><strong>实际参数：</strong></div>
                        <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                          {equipment.actualParameters}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            ) : (
              <Card size="small" title="检测设备">
                <div className="space-y-2">
                  {(record.equipment || []).map((item, index) => (
                    <Tag key={index} color="blue">{item}</Tag>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-blue-600">
              <SafetyOutlined className="mr-2" />
              主梁涡振隐患排查结果
            </h4>
            
            {/* 主梁气动外形检查结果 */}
            <Card size="small" title="主梁气动外形" className="mb-4">
              <div className="space-y-3">
                <Row gutter={16}>
                  <Col span={8}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">截面宽度偏差</div>
                      <div className={`font-semibold ${record.mainBeamCheck?.sectionWidthDeviation === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.mainBeamCheck?.sectionWidthDeviation || '未检查'}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">截面中心高偏差</div>
                      <div className={`font-semibold ${record.mainBeamCheck?.sectionHeightDeviation === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.mainBeamCheck?.sectionHeightDeviation || '未检查'}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">截面边高偏差</div>
                      <div className={`font-semibold ${record.mainBeamCheck?.sectionEdgeDeviation === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.mainBeamCheck?.sectionEdgeDeviation || '未检查'}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">对角线差偏差</div>
                      <div className={`font-semibold ${record.mainBeamCheck?.diagonalDeviation === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.mainBeamCheck?.diagonalDeviation || '未检查'}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">节段匹配高差</div>
                      <div className={`font-semibold ${record.mainBeamCheck?.segmentHeightDiff === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.mainBeamCheck?.segmentHeightDiff || '未检查'}
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">附属物布置</div>
                      <div className={`font-semibold ${record.mainBeamCheck?.attachmentLayout === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.mainBeamCheck?.attachmentLayout || '未检查'}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>

            {/* 抑振装置状态 */}
            <Card size="small" title="抑振装置状态" className="mb-4">
              <Row gutter={16}>
                <Col span={12}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">与设计一致</div>
                    <div className={`font-semibold ${record.mainBeamCheck?.designConsistency === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.mainBeamCheck?.designConsistency || '未检查'}
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">无松动/老化</div>
                    <div className={`font-semibold ${record.mainBeamCheck?.noLooseAging === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.mainBeamCheck?.noLooseAging || '未检查'}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* 振动特性 */}
            <Card size="small" title="振动特性" className="mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">与设计值偏差</div>
                <div className={`font-semibold ${record.mainBeamCheck?.designDeviation === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.mainBeamCheck?.designDeviation || '未检查'}
                </div>
              </div>
            </Card>
          </div>

          {record.bridgeType !== '钢结构梁桥' && record.bridgeType !== '连续梁桥' && record.bridgeType !== '拱桥' && (
            <div>
              <h4 className="font-semibold mb-3 text-purple-600">
                <ThunderboltOutlined className="mr-2" />
                拉（吊）索涡振隐患排查结果
              </h4>
              
              {/* 频率测试 */}
              <Card size="small" title="频率测试" className="mb-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">与设计值偏差</div>
                  <div className={`font-semibold ${record.cableCheck?.frequencyDeviation === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.cableCheck?.frequencyDeviation || '未检查'}
                  </div>
                </div>
          </Card>

              {/* 气动外形 */}
              <Card size="small" title="气动外形" className="mb-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">安装符合设计</div>
                      <div className={`font-semibold ${record.cableCheck?.installationCompliance === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.cableCheck?.installationCompliance || '未检查'}
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">无裂纹/腐蚀</div>
                      <div className={`font-semibold ${record.cableCheck?.noCrackCorrosion === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.cableCheck?.noCrackCorrosion || '未检查'}
                      </div>
                    </div>
                  </Col>
                </Row>

      </Card>

              {/* 抑振装置状态 */}
              <Card size="small" title="抑振装置状态" className="mb-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">与设计一致</div>
                      <div className={`font-semibold ${record.cableCheck?.designConsistency === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.cableCheck?.designConsistency || '未检查'}
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">无松动/老化</div>
                      <div className={`font-semibold ${record.cableCheck?.noLooseAging === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                        {record.cableCheck?.noLooseAging || '未检查'}
                      </div>
                    </div>
                  </Col>
                </Row>

      </Card>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3 text-green-600">
              <EnvironmentOutlined className="mr-2" />
              外部环境排查结果
            </h4>
            
            {/* 桥址风场 */}
            <Card size="small" title="桥址风场" className="mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">桥面10min平均风速</div>
                <div className={`font-semibold ${record.environmentCheck?.bridgeWindSpeed === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.environmentCheck?.bridgeWindSpeed || '未检查'}
                </div>
              </div>
            </Card>

            {/* 周围建筑物 */}
            <Card size="small" title="周围建筑物" className="mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">无新建并行大桥</div>
                <div className={`font-semibold ${record.environmentCheck?.noNewBridges === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.environmentCheck?.noNewBridges || '未检查'}
                </div>
              </div>
            </Card>

            {/* 交通运行 */}
            <Card size="small" title="交通运行" className="mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">交通数据变化</div>
                <div className={`font-semibold ${record.environmentCheck?.trafficDataChange === '满足' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.environmentCheck?.trafficDataChange || '未检查'}
                </div>
              </div>
            </Card>
          </div>

          <Divider />
          
          <div>
            <h4 className="font-semibold mb-2 text-red-600">
              <ExclamationCircleOutlined className="mr-2" />
              发现问题
            </h4>
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
              {typeof record.issues === 'string' ? (
                <div className="text-red-700">{record.issues}</div>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {(record.issues || []).map((issue, index) => (
                    <li key={index} className="text-red-700">{issue}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-blue-600">
              <CheckCircleOutlined className="mr-2" />
              处理建议
            </h4>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              {typeof record.recommendations === 'string' ? (
                <div className="text-blue-700">{record.recommendations}</div>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {(record.recommendations || []).map((rec, index) => (
                    <li key={index} className="text-blue-700">{rec}</li>
                  ))}
                </ul>
              )}
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
            <Steps current={record.processingSteps ? record.processingSteps.findIndex(step => step.status !== '完成') : 0} size="small">
              {record.processingSteps ? record.processingSteps.map((step, index) => (
                <Step
                  key={index}
                  title={step.step}
                  description={step.time !== '-' ? `用时: ${step.time}` : ''}
                  status={step.status === '完成' ? 'finish' : step.status === '进行中' ? 'process' : 'wait'}
                  icon={step.status === '完成' ? <CheckCircleOutlined /> : step.status === '进行中' ? <SyncOutlined spin /> : <ClockCircleOutlined />}
                />
              )) : null}
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
      nextInspectionDate: record.nextInspectionDate ? dayjs(record.nextInspectionDate) : null,
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
    
    // 编辑模式下需要重新计算分数
    setTimeout(() => {
      calculateCategoryScores();
    }, 100);
  };

  const handleEditEmergency = (record) => {
    setModalType('emergency');
    setEditingRecord(record);
    
    // 设置表单值，直接使用记录中的数组数据
    const formValues = {
      bridgeName: record.bridgeName,
      mainBeamTech: record.mainBeamTech || [],
      cableTech: record.cableTech || [],
      environmentTech: record.environmentTech || []
    };
    
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  // 删除处理函数
  const handleDeleteHazard = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除隐患排查记录"${record.bridgeName}"吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteHazardInspection(record.id);
      }
    });
  };

  const handleDeleteRisk = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除风险评估记录"${record.bridgeName}"吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteRiskAssessment(record.id);
      }
    });
  };

  const handleDeleteEmergency = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除应急处置记录"${record.bridgeName}"吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteEmergencyResponse(record.id);
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 处理日期字段，转换为字符串格式保存
      const processedValues = { ...values };
      
      if (modalType === 'hazard') {
        if (processedValues.inspectionDate) {
          processedValues.inspectionDate = processedValues.inspectionDate.format('YYYY-MM-DD');
        }
        if (processedValues.nextInspectionDate) {
          processedValues.nextInspectionDate = processedValues.nextInspectionDate.format('YYYY-MM-DD');
        }
      }
      
      if (modalType === 'risk' && processedValues.assessmentDate) {
        processedValues.assessmentDate = processedValues.assessmentDate.format('YYYY-MM-DD');
      }
      
      // 应急处置不需要日期处理
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modalType === 'hazard') {
        if (editingRecord) {
          updateHazardInspection(editingRecord.id, processedValues);
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVH${String(hazardInspectionData.length + 1).padStart(3, '0')}`,
            ...processedValues,
            bridgeType: processedValues.bridgeStructureForm || processedValues.bridgeType,
            mainSpan: processedValues.bridgeSpan ? parseInt(processedValues.bridgeSpan.match(/\d+/)?.[0] || '0') : 0,
            status: '待处理',
          };
          addHazardInspection(newRecord);
        }
      } else if (modalType === 'risk') {
        if (editingRecord) {
          updateRiskAssessment(editingRecord.id, processedValues);
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVR${String(riskAssessmentData.length + 1).padStart(3, '0')}`,
            ...processedValues,
          };
          addRiskAssessment(newRecord);
        }
      } else if (modalType === 'emergency') {
        if (editingRecord) {
          updateEmergencyResponse(editingRecord.id, processedValues);
        } else {
          const newRecord = {
            key: Date.now().toString(),
            id: `BVE${String(emergencyResponseData.length + 1).padStart(3, '0')}`,
            ...processedValues,
            mainBeamTech: processedValues.mainBeamTech || [],
            cableTech: processedValues.cableTech || [],
            environmentTech: processedValues.environmentTech || []
          };
          addEmergencyResponse(newRecord);
        }
      }
      
      setIsModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
      
    } catch (error) {
      console.error('表单验证失败:', error);
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
              >
                <Input placeholder="请输入桥梁位置" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="buildYear"
                label="建成年份"
              >
                <InputNumber min={1900} max={2030} placeholder="请输入建成年份" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="designUnit"
                label="设计单位"
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
              >
                <Input placeholder="请输入排查人员" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="riskLevel"
                label="风险等级"
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
                          applicationProject: [],
                          actualParameters: ''
                        }
                      ]
                    });
                  }}
                >
                  添加设备
                </Button>
              </div>
              
              <Form.List name="equipmentList" initialValue={[]}>
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
                            applicationProject: [],
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
          >
            <TextArea rows={4} placeholder="请详细描述排查中发现的问题" />
          </Form.Item>
          
          <Form.Item
            name="recommendations"
            label="处理建议"
          >
            <TextArea rows={4} placeholder="请提出针对性的处理建议和措施" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="completionRate"
                label="完成率(%)"
              >
                <InputNumber min={0} max={100} placeholder="请输入完成率" className="w-full" addonAfter="%" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="排查状态"
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
    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
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
          <Form.Item
            name={['mainBeamAssessment', 'verticalFreq', 'level']}
            label="主梁竖向弯曲振动频率"
            rules={[{ required: true, message: '请选择评估等级' }]}
          >
            <Select placeholder="请选择评估等级">
              <Option value={1}>1级 - fb &gt; 0.60Us/B</Option>
              <Option value={2}>2级 - 0.50Us/B &lt; fb ≤ 0.60Us/B</Option>
              <Option value={3}>3级 - 0.40Us/B &lt; fb ≤ 0.50Us/B</Option>
              <Option value={4}>4级 - 0.25Us/B &lt; fb ≤ 0.40Us/B</Option>
              <Option value={5}>5级 - fb ≤ 0.25Us/B</Option>
            </Select>
          </Form.Item>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-600">注释说明</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>f<sub>b</sub></strong> —— 竖向弯曲振动频率(Hz)</div>
                  <div><strong>U<sub>s</sub></strong> 为公路在用桥梁所在风场风速</div>
                  <div><strong>B</strong> —— 主梁的特征宽度(m)，按照参考图所示</div>
                  <div className="mt-2 text-sm text-gray-600">
                    条文说明：《公路桥梁抗风设计规范》中规定，跨径小于200m的实腹式桥梁的竖向涡激共振起振风速U<sub>vh</sub>：
                  </div>
                  <div className="text-center font-mono text-sm bg-white p-2 rounded border">
                    U<sub>vh</sub> = 2.0f<sub>b</sub>B
                  </div>
                </div>
              </div>
              <Button 
                type="link" 
                icon={<EyeOutlined />}
                onClick={() => {
                  Modal.info({
                    title: '闭口截面主梁参考图',
                    width: 800,
                    content: (
                      <div className="text-center">
                        <img 
                          src="https://oneday-react-native.oss-cn-zhangjiakou.aliyuncs.com/oneday/source/0079cce8-4315-4a1d-a749-e74b983aa5b3.png"
                          alt="闭口截面主梁"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <div className="mt-4 text-sm text-gray-600">
                          <p><strong>图4.2.2 截面的宽度和高度取值</strong></p>
                          <p>a) 六边形截面主梁 &nbsp;&nbsp; b) 桁架桥的桁宽及梁高 &nbsp;&nbsp; c) 闭口截面主梁</p>
                        </div>
                      </div>
                    ),
                  });
                }}
              >
                查看参考图
              </Button>
            </div>
          </div>

          <Form.Item
            name={['mainBeamAssessment', 'torsionalFreq', 'level']}
            label="主梁扭转振动频率"
            rules={[{ required: true, message: '请选择评估等级' }]}
          >
            <Select placeholder="请选择评估等级">
              <Option value={1}>1级 - ft &gt; 0.90Us/B</Option>
              <Option value={2}>2级 - 0.75Us/B &lt; ft ≤ 0.90Us/B</Option>
              <Option value={3}>3级 - 0.60Us/B &lt; ft ≤ 0.75Us/B</Option>
              <Option value={4}>4级 - 0.40Us/B &lt; ft ≤ 0.60Us/B</Option>
              <Option value={5}>5级 - ft ≤ 0.40Us/B</Option>
            </Select>
          </Form.Item>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-600">注释说明</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>f<sub>t</sub></strong> —— 扭转振动频率(Hz)</div>
                  <div><strong>U<sub>s</sub></strong> 为公路在用桥梁所在风场风速</div>
                  <div><strong>B</strong> —— 主梁的特征宽度(m)，按照参考图所示</div>
                  <div className="mt-2 text-sm text-gray-600">
                    条文说明：《公路桥梁抗风设计规范》中规定，跨径小于200m的实腹式桥梁的扭转涡激共振起振风速U<sub>vt</sub>：
                  </div>
                  <div className="text-center font-mono text-sm bg-white p-2 rounded border">
                    U<sub>vt</sub> = 1.33f<sub>t</sub>B
                  </div>
                </div>
              </div>
              <Button 
                type="link" 
                icon={<EyeOutlined />}
                onClick={() => {
                  Modal.info({
                    title: '闭口截面主梁参考图',
                    width: 800,
                    content: (
                      <div className="text-center">
                        <img 
                          src="https://oneday-react-native.oss-cn-zhangjiakou.aliyuncs.com/oneday/source/0079cce8-4315-4a1d-a749-e74b983aa5b3.png"
                          alt="闭口截面主梁"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <div className="mt-4 text-sm text-gray-600">
                          <p><strong>图4.2.2 截面的宽度和高度取值</strong></p>
                          <p>a) 六边形截面主梁 &nbsp;&nbsp; b) 桁架桥的桁宽及梁高 &nbsp;&nbsp; c) 闭口截面主梁</p>
                        </div>
                      </div>
                    ),
                  });
                }}
              >
                查看参考图
              </Button>
            </div>
          </div>

          <Form.Item
            name={['mainBeamAssessment', 'dampingRatio', 'level']}
            label="桥梁阻尼比"
            rules={[{ required: true, message: '请选择评估等级' }]}
          >
            <Select placeholder="请选择评估等级">
              <Option value={1}>1级 - ξ₂ ≥ ξ₁</Option>
              <Option value={2}>2级 - 0.9ξ₁ ≤ ξ₂ &lt; ξ₁</Option>
              <Option value={3}>3级 - 0.7ξ₁ ≤ ξ₂ &lt; 0.9ξ₁</Option>
              <Option value={4}>4级 - 0.5ξ₁ &lt; ξ₂ &lt; 0.7ξ₁</Option>
              <Option value={5}>5级 - ξ₂ ≤ 0.5ξ₁</Option>
            </Select>
          </Form.Item>
          
          <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
            注：ξ<sub>1</sub>为桥梁运行初期阻尼比；ξ<sub>2</sub>为现场实测阻尼比。
          </div>

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
          <div className="space-y-6">
            {/* 5.1 拉（吊）索外形 */}
            <div>
              <Form.Item
                name={['cableAssessment', 'appearance', 'level']}
                label="拉（吊）索外形"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 连接部位无松动，裂纹或损坏；索的表面无磨损、腐蚀、裂纹等缺陷；索无变形扭曲或明显的外力作用痕迹</Option>
                  <Option value={2}>2级 - 连接部位无松动，裂纹或损坏；索的表面磨损、腐蚀、裂纹等缺陷面积不超过5%；索无变形扭曲或明显的外力作用痕迹</Option>
                  <Option value={3}>3级 - -</Option>
                  <Option value={4}>4级 - 符合下列情况之一：1.连接部位出现松动、裂纹或损坏；2.索的表面磨损、腐蚀、裂纹等缺陷面积超过5%；3.索有变形扭曲或明显的外力作用痕迹</Option>
                  <Option value={5}>5级 - -</Option>
                </Select>
              </Form.Item>
              

            </div>

            {/* 5.2 拉（吊）索频率 */}
            <div>
              <Form.Item
                name={['cableAssessment', 'frequency', 'level']}
                label="拉（吊）索频率"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - f<sub>s</sub> &gt; 1.5S<sub>s</sub>U<sub>cr</sub>/H</Option>
                  <Option value={2}>2级 - S<sub>s</sub>U<sub>cr</sub>/H &lt; f<sub>s</sub> ≤ 1.5S<sub>s</sub>U<sub>cr</sub>/H</Option>
                  <Option value={3}>3级 - 0.75S<sub>s</sub>U<sub>cr</sub>/H &lt; f<sub>s</sub> ≤ S<sub>s</sub>U<sub>cr</sub>/H</Option>
                  <Option value={4}>4级 - 0.5S<sub>s</sub>U<sub>cr</sub>/H &lt; f<sub>s</sub> ≤ 0.75S<sub>s</sub>U<sub>cr</sub>/H</Option>
                  <Option value={5}>5级 - f<sub>s</sub> ≤ 0.5S<sub>s</sub>U<sub>cr</sub>/H</Option>
                </Select>
              </Form.Item>
              
              <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                注：f<sub>s</sub>——拉（吊）索频率(Hz)；U<sub>cr</sub> 为公路在用桥梁所在风场风速；H——垂直于风向方向上的桥梁投影高度(m)，S<sub>s</sub>为桥梁断面的斯特劳哈尔数。
                <br /><br />
                参文说明：根据《斜拉桥拉索振动与控制》等著作，位于桥梁尾流中的拉索，与桥梁自身有频率f<sub>s</sub>相对应出现的涡脱数据，其临界风速U<sub>cr</sub>可按式(5.2.1)计算：
                <br /><br />
                U<sub>cr</sub> = f<sub>s</sub>H/S<sub>s</sub>
              </div>
            </div>

            {/* 5.3 拉（吊）索抑振措施 */}
            <div>
              <Form.Item
                name={['cableAssessment', 'suppressionMeasures', 'level']}
                label="拉（吊）索抑振措施"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 拉（吊）索的抑振系统完备，设置有阻尼器等抑振措施</Option>
                  <Option value={2}>2级 - -</Option>
                  <Option value={3}>3级 - 拉（吊）索有抑振措施，但设备老化，功能下降</Option>
                  <Option value={4}>4级 - 拉（吊）索没有任何抑振措施</Option>
                  <Option value={5}>5级 - -</Option>
                </Select>
              </Form.Item>
              

            </div>
          </div>
        </TabPane>

        <TabPane tab="外部环境评估" key="3">
          <div className="space-y-6">
            {/* 6.1 桥址风场紊流强度 */}
            <div>
              <Form.Item
                name={['environmentAssessment', 'windField', 'level']}
                label="桥址风场紊流强度"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 紊流强度很高</Option>
                  <Option value={2}>2级 - 紊流强度较高</Option>
                  <Option value={3}>3级 - 紊流强度不高</Option>
                  <Option value={4}>4级 - 风场相对均匀</Option>
                  <Option value={5}>5级 - 均匀场</Option>
                </Select>
              </Form.Item>
            </div>

            {/* 6.2 交通载荷 */}
            <div>
              <Form.Item
                name={['environmentAssessment', 'trafficLoad', 'level']}
                label="交通载荷"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - 1 &lt; Q<sub>m</sub>/Q<sub>d</sub> ≤ 1.3</Option>
                  <Option value={2}>2级 - 1.3 &lt; Q<sub>m</sub>/Q<sub>d</sub> ≤ 1.7</Option>
                  <Option value={3}>3级 - 1.7 &lt; Q<sub>m</sub>/Q<sub>d</sub> ≤ 2.0</Option>
                  <Option value={4}>4级 - 2.0 &lt; Q<sub>m</sub>/Q<sub>d</sub></Option>
                  <Option value={5}>5级 - -</Option>
                </Select>
              </Form.Item>
              
              <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                注：Q<sub>m</sub>为典型代表交通量；Q<sub>d</sub>为设计交通量。
              </div>
            </div>

            {/* 6.3 大吨位车辆比例 */}
            <div>
              <Form.Item
                name={['environmentAssessment', 'heavyVehicles', 'level']}
                label="大吨位车辆比例"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - α &lt; 0.3</Option>
                  <Option value={2}>2级 - 0.3 ≤ α &lt; 0.5</Option>
                  <Option value={3}>3级 - 0.5 ≤ α &lt; 0.8</Option>
                  <Option value={4}>4级 - 0.8 ≤ α &lt; 1.0</Option>
                  <Option value={5}>5级 - -</Option>
                </Select>
              </Form.Item>
              
              <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                注：α为大吨位车辆混入率，指车辆质量超过30吨的车辆所占比例。
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane tab="振幅评估" key="4">
          <div className="space-y-6">
            {/* 7.2 竖向涡振振幅 */}
            <div>
              <Form.Item
                name={['vibrationAmplitudeAssessment', 'vertical', 'level']}
                label="竖向涡振振幅"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - h<sub>c</sub> ≤ 0.7h<sub>a</sub></Option>
                  <Option value={2}>2级 - 0.7h<sub>a</sub> &lt; h<sub>c</sub> ≤ 0.8h<sub>a</sub></Option>
                  <Option value={3}>3级 - 0.8h<sub>a</sub> &lt; h<sub>c</sub> ≤ 0.9h<sub>a</sub></Option>
                  <Option value={4}>4级 - 0.9h<sub>a</sub> &lt; h<sub>c</sub> ≤ h<sub>a</sub></Option>
                  <Option value={5}>5级 - h<sub>c</sub> &gt; h<sub>a</sub></Option>
                </Select>
              </Form.Item>
              
              <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                注：h<sub>c</sub>为公路在用桥梁竖向涡振振幅；h<sub>a</sub>为现行《公路桥梁抗风设计规范》（JTGT 3360-01—2018）规定的竖向涡振的允许振幅。
                <br /><br />
                路径小于200m的实腐式桥梁竖向涡振振幅可按下式计算：
                <br /><br />
                h<sub>c</sub> = (E<sub>h</sub>E<sub>hh</sub>B)/(2πm<sub>v</sub>ξ<sub>s</sub>)
                <br /><br />
                m<sub>v</sub> = m/ρB<sup>2</sup>
                <br /><br />
                E<sub>h</sub> = 0.065β<sub>ds</sub>(B/H)<sup>-1</sup>
                <br /><br />
                E<sub>hh</sub> = 1 - 15 · β<sub>t</sub>(B/H)<sup>1/2</sup>I<sub>u</sub><sup>2</sup> ≥ 0
                <br /><br />
                式中，
                <br />
                h<sub>v</sub>——竖向涡激共振振幅(m)；
                <br />
                m——桥梁单位长度质量(kg/m)。对变截面桥梁，可取1/4路径处的平均值；对斜拉桥应计入斜拉索质量的一半；对悬索桥应计入主缆质量；
                <br />
                ξ<sub>s</sub>——桥梁结构阻尼比；
                <br />
                β<sub>ds</sub>——形状修正系数，对宽度小于1/4有效高度，或具有垂直腰板的纯体断面，取2；对六边形断面或宽度大于1/4有效高度或具有斜腰板的纯体断面，取1；
                <br />
                D——主梁特征高度(m)，如图4.1.3示；
                <br />
                β<sub>t</sub>——系数，对六边形截面取0，其他断面取1；
                <br />
                I<sub>u</sub>——
                <br /><br />
                纵向脉动风设计基准风速度，可按《公路桥梁抗风设计规范》表4.3.1选取，也可按I<sub>u</sub> = 1/ln(Z/Z<sub>0</sub>)确定；
                <br /><br />
                Z——桥面基准高度(m)；
                <br />
                Z<sub>0</sub>——桥址处的地表粗糙高度(m)，可按《公路桥梁抗风设计规范》表4.2.1选取。
                <br /><br />
                当路径小于200m时，竖向涡振的允许振幅：
                <br /><br />
                h<sub>a</sub> = 0.04/f<sub>v</sub>
                <br /><br />
                式中，
                <br />
                f<sub>v</sub>——竖向振动频率(Hz)；
                <br />
                γ<sub>v</sub>——涡振共振分项系数。当采用风洞试验获取h<sub>v</sub>时取1.0；采用规范第8.2.7条计算h<sub>v</sub>或采用虚拟风洞试验获取h<sub>v</sub>时取0.8。
              </div>
            </div>

            {/* 7.3 扭转涡振振幅 */}
            <div>
              <Form.Item
                name={['vibrationAmplitudeAssessment', 'torsional', 'level']}
                label="扭转涡振振幅"
                rules={[{ required: true, message: '请选择评估等级' }]}
              >
                <Select placeholder="请选择评估等级">
                  <Option value={1}>1级 - θ<sub>c</sub> ≤ 0.7θ<sub>a</sub></Option>
                  <Option value={2}>2级 - 0.7θ<sub>a</sub> &lt; θ<sub>c</sub> ≤ 0.8θ<sub>a</sub></Option>
                  <Option value={3}>3级 - 0.8θ<sub>a</sub> &lt; θ<sub>c</sub> ≤ 0.9θ<sub>a</sub></Option>
                  <Option value={4}>4级 - 0.9θ<sub>a</sub> &lt; θ<sub>c</sub> ≤ θ<sub>a</sub></Option>
                  <Option value={5}>5级 - θ<sub>c</sub> &gt; θ<sub>a</sub></Option>
                </Select>
              </Form.Item>
              
              <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                注：θ<sub>c</sub>为公路在用桥梁竖向涡振振幅；θ<sub>a</sub>为现行《公路桥梁抗风设计规范》（JTGT 3360-01—2018）规定的竖向涡振的允许振幅。
                <br /><br />
                路径小于200m的实腐式桥梁扭转涡振振幅可按下式计算：
                <br /><br />
                θ<sub>c</sub> = (E<sub>θ</sub>E<sub>θθ</sub>B)/(2πI<sub>pv</sub>ξ<sub>s</sub>)
                <br /><br />
                I<sub>pv</sub> = I<sub>p</sub>/ρB<sup>4</sup>
                <br /><br />
                E<sub>θ</sub> = 17.16β<sub>ds</sub>(B/H)<sup>-3</sup>
                <br /><br />
                E<sub>θθ</sub> = 1 - 20 · β<sub>t</sub>(B/H)<sup>-1/2</sup>I<sub>u</sub><sup>2</sup> ≥ 0
                <br /><br />
                式中，
                <br />
                θ<sub>t</sub>——扭转涡激共振振幅(°)；
                <br /><br />
                I<sub>m</sub>——桥梁单位长度质量惯性矩(kg·m<sup>2</sup>/m)。对变截面桥梁，可取1/4路径处的平均值；对斜拉桥应计入斜拉索质量的一半；对悬索桥，应计入主缆全部质量；
                <br />
                ξ<sub>s</sub>——桥梁结构阻尼比；
                <br /><br />
                当路径小于200m时，扭转涡振的允许振幅：
                <br /><br />
                θ<sub>a</sub> = γ<sub>v</sub> · 4.56/Bf<sub>t</sub>
                <br /><br />
                式中，
                <br />
                v——扭转涡激共振振幅(°)；
                <br />
                f<sub>t</sub>——扭转振动频率(Hz)；
                <br />
                B——主梁的特征宽度(m)；
                <br />
                γ<sub>v</sub>——涡激共振分项系数。当采用风洞试验获取θ<sub>t</sub>时取1.0；采用规范第8.2.8条计算θ<sub>t</sub>或采用虚拟风洞试验获取θ<sub>t</sub>时取0.8。
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane tab="综合评估" key="5">
          <div className="space-y-6">
            {/* 桥梁主梁涡振风险评估得分 D1 */}
            <div>
              <Form.Item
                name="mainBeamScore"
                label="桥梁主梁涡振风险评估得分 D1"
              >
                <Input 
                  disabled 
                  className="bg-gray-50"
                  suffix="分"
                />
              </Form.Item>
              <div className="text-sm text-gray-600 mb-4">
                计算方式：主梁结构评估中所有字段的得分平均值
              </div>
            </div>

            {/* 拉（吊）索涡振风险评估得分 D2 */}
            <div>
              <Form.Item
                name="cableScore"
                label="拉（吊）索涡振风险评估得分 D2"
              >
                <Input 
                  disabled 
                  className="bg-gray-50"
                  suffix="分"
                />
              </Form.Item>
              <div className="text-sm text-gray-600 mb-4">
                计算方式：拉（吊）索结构评估中所有字段的得分平均值
              </div>
            </div>

            {/* 外部环境涡振评估得分 D3 */}
            <div>
              <Form.Item
                name="environmentScore"
                label="外部环境涡振评估得分 D3"
              >
                <Input 
                  disabled 
                  className="bg-gray-50"
                  suffix="分"
                />
              </Form.Item>
              <div className="text-sm text-gray-600 mb-4">
                计算方式：外部环境评估中所有字段的得分平均值
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">评分计算说明</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div>• 指标等级与得分对应关系：1级=100分，2级=80分，3级=65分，4级=40分，5级=0分</div>

                <div>• 各类别得分为对应类别中所有字段的平均值</div>
                <div>• 计算示例：主梁扭转振动频率为1级，桥梁阻尼比为1级，主梁竖向弯曲振动频率为2级，则D1=(100+100+80)/3=93分</div>
              </div>
            </div>

            {/* 表3.0.5 公路桥梁涡振风险评价标准 */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4 text-center">表3.0.5 公路桥梁涡振风险评价标准</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100" rowSpan="2"></th>
                      <th className="border border-gray-400 p-2 bg-gray-100" colSpan="5">D<sub>3</sub></th>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100">[90,100]</th>
                      <th className="border border-gray-400 p-2 bg-gray-100">[75,90)</th>
                      <th className="border border-gray-400 p-2 bg-gray-100">[60,75)</th>
                      <th className="border border-gray-400 p-2 bg-gray-100">[40,60)</th>
                      <th className="border border-gray-400 p-2 bg-gray-100">[0,40)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100" rowSpan="5">D<sub>1</sub>或<br/>D<sub>2</sub></th>
                      <th className="border border-gray-400 p-2 bg-gray-100">[90,100]</th>
                      <td className="border border-gray-400 p-2 text-center">1类</td>
                      <td className="border border-gray-400 p-2 text-center">2类</td>
                      <td className="border border-gray-400 p-2 text-center">3类</td>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100">[75,90)</th>
                      <td className="border border-gray-400 p-2 text-center">2类</td>
                      <td className="border border-gray-400 p-2 text-center">3类</td>
                      <td className="border border-gray-400 p-2 text-center">3类</td>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100">[60,75)</th>
                      <td className="border border-gray-400 p-2 text-center">3类</td>
                      <td className="border border-gray-400 p-2 text-center">3类</td>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100">[40,60)</th>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">4类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 p-2 bg-gray-100">[0,40)</th>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                      <td className="border border-gray-400 p-2 text-center">5类</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 表3.0.3 公路桥梁涡振风险评估类别 */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4 text-center">表3.0.3 公路桥梁涡振风险评估类别</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-3 bg-gray-100 w-1/3">涡振风险评估类别</th>
                      <th className="border border-gray-400 p-3 bg-gray-100 w-2/3">定性描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-3 text-center font-medium">1类</td>
                      <td className="border border-gray-400 p-3 text-center">涡振风险隐患小</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-3 text-center font-medium">2类</td>
                      <td className="border border-gray-400 p-3 text-center">涡振风险隐患较小</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-3 text-center font-medium">3类</td>
                      <td className="border border-gray-400 p-3 text-center">涡振风险隐患中等</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-3 text-center font-medium">4类</td>
                      <td className="border border-gray-400 p-3 text-center">涡振风险隐患较大</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-3 text-center font-medium">5类</td>
                      <td className="border border-gray-400 p-3 text-center">涡振风险隐患大</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 风险评估类别选择 */}
            <div className="mt-6">
              <Form.Item
                name="riskCategory"
                label="根据上述评价标准，选择对应的风险评估类别"
              >
                <Select placeholder="请选择风险评估类别" className="w-full">
                  <Option value="1">1类 - 涡振风险隐患小</Option>
                  <Option value="2">2类 - 涡振风险隐患较小</Option>
                  <Option value="3">3类 - 涡振风险隐患中等</Option>
                  <Option value="4">4类 - 涡振风险隐患较大</Option>
                  <Option value="5">5类 - 涡振风险隐患大</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  );

  const renderEmergencyForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="bridgeName"
        label="桥梁名称"
        rules={[{ required: true, message: '请输入桥梁名称' }]}
      >
        <Input placeholder="请输入桥梁名称" />
      </Form.Item>

      <Form.Item
        name="mainBeamTech"
        label="主梁应急抑振技术"
      >
        <Checkbox.Group>
          <div className="space-y-2">
            <div><Checkbox value="加装简易阻尼装置法">加装简易阻尼装置法</Checkbox></div>
            <div><Checkbox value="桥面扰流与节流法">桥面扰流与节流法</Checkbox></div>
          </div>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        name="cableTech"
        label="拉（吊）索应急抑振技术"
      >
        <Checkbox.Group>
          <div className="space-y-2">
            <div><Checkbox value="柔性连接装置法">柔性连接装置法</Checkbox></div>
            <div><Checkbox value="局部质量附加法">局部质量附加法</Checkbox></div>
            <div><Checkbox value="扰流与表面扰动法">扰流与表面扰动法</Checkbox></div>
          </div>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        name="environmentTech"
        label="外部环境应急干预技术"
      >
        <Checkbox.Group>
          <div className="space-y-2">
            <div><Checkbox value="扰流法">扰流法</Checkbox></div>
            <div><Checkbox value="交通扰动控制法">交通扰动控制法</Checkbox></div>
          </div>
        </Checkbox.Group>
      </Form.Item>
    </Form>
  );

  const getModalTitle = () => {
    const titles = {
      hazard: '隐患排查',
      risk: '风险评估',
      emergency: '应急处置',
      knowledge: '知识资料',
      monitoring: '监测设备',
      plan: '排查计划'
    };
    return `${editingRecord ? '编辑' : '添加'}${titles[modalType] || ''}`;
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'hazard':
        return renderHazardForm();
      case 'risk':
        return renderRiskForm();
      case 'emergency':
        return renderEmergencyForm();
      case 'knowledge':
        return renderKnowledgeForm();
      case 'monitoring':
        return renderMonitoringForm();
      case 'plan':
        return renderPlanForm();
      default:
        return null;
    }
  };

  // 根据传入的pageType参数确定当前页面内容
  const getCurrentPageContent = () => {
    switch (pageType) {
      case 'hazard-inspection':
        return renderHazardInspectionPage();
      case 'risk-assessment':
        return renderRiskAssessmentPage();
      case 'emergency-response':
        return renderEmergencyResponsePage();
      case 'knowledge-base':
        return renderKnowledgeBasePage();
      case 'system-settings':
        return renderSystemSettingsPage();
      default:
        return renderRiskAssessmentPage();
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
          dataSource={hazardInspectionData}
          pagination={{
            total: hazardInspectionData.length,
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
              value={emergencyResponseData.length}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
      </Card>
        </Col>

      </Row>

      {/* 涡振快速应急处置流程 */}
      <Card>
        <Collapse 
          defaultActiveKey={['1']} 
          expandIconPosition="end"
          className="border-0"
        >
          <Panel 
            header={<h3 className="text-lg font-semibold m-0">涡振快速应急处置流程</h3>} 
            key="1"
            className="border-0"
          >
        
        <div className="space-y-6">
          {/* 应急启动条件 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">应急启动条件</h4>
            <Alert
              message="当监测系统满足下列任一条件时，应立即启动涡振快速应急处置流程："
              type="warning"
              showIcon
              className="mb-4"
            />
            <div className="bg-gray-50 p-4 rounded-lg">
              <ol className="space-y-2 text-sm">
                <li>最大平均风速大于设计风速时；</li>
                <li>索结构应力大于设计值或一个月内发现10次以上大于0.95倍设计值时；</li>
                <li>位移或变形大于设计值或一个月内发现10次以上大于0.8倍设计值时。</li>
              </ol>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>注意：</strong> 启动应急处置流程后，应立即组织人员确认振动类型，调取监测数据，并评估风险等级。
              </p>
            </div>
          </div>

          {/* 应急响应措施 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">应急响应措施</h4>
            <Alert
              message="根据判定结果，采取下列一项或多项应急响应措施："
              type="info"
              showIcon
              className="mb-4"
            />
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-center">序号</th>
                    <th className="border border-gray-300 p-3 text-center">情况类别</th>
                    <th className="border border-gray-300 p-3 text-center">应急措施示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">1</td>
                    <td className="border border-gray-300 p-3 text-center">主梁轻微振动</td>
                    <td className="border border-gray-300 p-3">降速运行、限制重载车辆通行、监控风速</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">2</td>
                    <td className="border border-gray-300 p-3 text-center">持续单索涡振</td>
                    <td className="border border-gray-300 p-3">安装简易阻尼器、喷淋扰流、水袋减振等局部措施</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">3</td>
                    <td className="border border-gray-300 p-3 text-center">局部多索共振</td>
                    <td className="border border-gray-300 p-3">交替消能装置、索间连接、物理抗器（临时）</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 text-center">4</td>
                    <td className="border border-gray-300 p-3 text-center">多构件群振</td>
                    <td className="border border-gray-300 p-3">临时封桥、进行人工检视、部署高频数据采集系统</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>补充说明：</strong> 必要时可增设临时观测点，使用便携式传感设备加强对异常构件的跟踪。
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>核实方法：</strong> 可利用人工方式（如无人机锤击、观察、摄像）对疑似构件状态进行二次核实。
                </p>
              </div>
            </div>
          </div>

          {/* 处置措施实施与跟踪 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">处置措施实施与跟踪</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">现场处置应遵循以下原则：</h5>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="space-y-2 text-sm">
                    <li>避免人员长时间近距离接触发生振动的构件；</li>
                    <li>现场施工应防止产生额外激励或扰动；</li>
                    <li>操作应具备快速撤离、快速撤离高能力。</li>
                  </ol>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-800 mb-2">典型处置技术包括：</h5>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="space-y-2 text-sm">
                    <li>临时耗能装置（软连接套夹、磁流体阻尼器）安装；</li>
                    <li>扰流改性措施（缠带、风绳、屏障）简易部署；</li>
                    <li>环境控制措施（水喷雾降低扰流、表面加湿增阻尼）等。</li>
                  </ol>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>重要提醒：</strong> 处置后应立即启动高频数据记录，评估是否减弱或消除振动。
                </p>
              </div>
            </div>
          </div>

          {/* 效果评估与响应解除 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">效果评估与响应解除</h4>
            
            <div className="space-y-4">
              <Alert
                message="处置完成后，应持续观测不少于15分钟，并满足以下条件方可解除应急状态："
                type="success"
                showIcon
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="space-y-2 text-sm">
                  <li>涡振现象完全消失，响应信号恢复正常；</li>
                  <li>风速回落至非临界区间，未再诱发涡振特征；</li>
                  <li>所有处置措施无安全隐患，临时装置稳定运行。</li>
                </ol>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>记录要求：</strong> 建议保留数据和图像记录，形成完整应急报告，供后续优化使用。
                </p>
              </div>
            </div>
          </div>
        </div>
        </Panel>
      </Collapse>
      </Card>

      {/* 应急抑振技术措施 */}
      <Card>
        <Collapse 
          defaultActiveKey={['1']} 
          expandIconPosition="end"
          className="border-0"
        >
          <Panel 
            header={<h3 className="text-lg font-semibold m-0">应急抑振技术措施</h3>} 
            key="1"
            className="border-0"
          >
        
        <Tabs defaultActiveKey="1">
          <TabPane tab="一般规定" key="1">
            <div className="space-y-4">
              <Alert
                message="临时抑振措施应用条件"
                description="当大跨桥梁构件（如吊索、主梁等）发生明显的涡激振动，且暂不具备实施永久性减振系统的条件时，应及时采用临时抑振技术措施以快速控制振动发展，保障结构运行安全。"
                type="warning"
                showIcon
              />
              
              <Card title="临时抑振措施应具备以下特征：" className="mt-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-center rounded-full text-sm mr-3 mt-0.5">1</span>
                    <span>快速安装与拆卸</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-center rounded-full text-sm mr-3 mt-0.5">2</span>
                    <span>适应现场风雨环境</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-center rounded-full text-sm mr-3 mt-0.5">3</span>
                    <span>不对桥梁结构产生二次损伤或附加载荷</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-center rounded-full text-sm mr-3 mt-0.5">4</span>
                    <span>可显著提升局部或整体阻尼、改变气动特性或扰乱锁频过程</span>
                  </div>
                </div>
          </Card>
            </div>
          </TabPane>

          <TabPane tab="主梁应急抑振技术" key="2">
            <div className="space-y-6">
              <Alert
                message="主梁应急抑振技术"
                description="主梁应急抑振技术应包括简易阻尼装置法和桥面扰流与节流法。"
                type="info"
                showIcon
              />
              
              <Card title="加装简易阻尼装置">
                <div className="mb-4">
                  <p className="text-gray-600 mb-4">
                    加装简易阻尼装置法应在主梁横向加设简易TMD（调谐质量阻尼器）或摩擦阻尼装置，临时附加被动耗能机构。
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-center">序号</th>
                          <th className="border border-gray-300 p-3 text-center">类型</th>
                          <th className="border border-gray-300 p-3 text-center">典型形式</th>
                          <th className="border border-gray-300 p-3 text-center">适用条件</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">1</td>
                          <td className="border border-gray-300 p-3 text-center">简易TMD</td>
                          <td className="border border-gray-300 p-3">钢箱+弹簧+阻尼垫</td>
                          <td className="border border-gray-300 p-3">频率明显，空间可用</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">2</td>
                          <td className="border border-gray-300 p-3 text-center">摩擦滑移耗能装置</td>
                          <td className="border border-gray-300 p-3">垫板+锚固+砂粒层</td>
                          <td className="border border-gray-300 p-3">横梁或斜腹构件处</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
          </Card>

              <Card title="桥面扰流与节流法">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    桥面扰流与节流法应通过临时挡板、导流板调整桥面风流路径，减缓横桥向涡激激发。
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">可采用措施：</h4>
                      <ul className="space-y-2 text-sm">
                        <li>可采用沙袋压布、临时挡风带、帆布折流板等</li>
                        <li>禁止封闭通风孔或永久排风结构，避免诱发其他类型振动</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">风屏障类型：</h4>
                      <ul className="space-y-2 text-sm">
                        <li>原始设计 3m 高条形风屏障</li>
                        <li>4m 高筛网形风屏障</li>
                      </ul>
                    </div>
                  </div>
                </div>
          </Card>
            </div>
          </TabPane>

          <TabPane tab="拉（吊）索应急抑振技术" key="3">
            <div className="space-y-6">
              <Alert
                message="拉（吊）索应急抑振技术"
                description="拉（吊）索应急抑振技术应包括柔性连接装置法、局部质量附加法和扰流与表面扰动法。"
                type="info"
                showIcon
              />
              
              <Card title="柔性连接装置法">
                <div className="mb-4">
                  <p className="text-gray-600 mb-4">
                    柔性连接装置法应通过柔性材料将相邻拉（吊）索连接，打破振型协同效应，提高系统阻尼，减弱群体共振效应。
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-center">序号</th>
                          <th className="border border-gray-300 p-3 text-center">技术方式</th>
                          <th className="border border-gray-300 p-3 text-center">材料建议</th>
                          <th className="border border-gray-300 p-3 text-center">优点</th>
                          <th className="border border-gray-300 p-3 text-center">注意事项</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">1</td>
                          <td className="border border-gray-300 p-3 text-center">软连接绳索法</td>
                          <td className="border border-gray-300 p-3">芳纶绳、高强纤维带</td>
                          <td className="border border-gray-300 p-3">安装方便，无刚度激励</td>
                          <td className="border border-gray-300 p-3">限于相邻索段不太远</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">2</td>
                          <td className="border border-gray-300 p-3 text-center">弹性件阻尼法</td>
                          <td className="border border-gray-300 p-3">硅胶圈、橡胶片、弹簧绳</td>
                          <td className="border border-gray-300 p-3">有耗能能力，衰减振幅</td>
                          <td className="border border-gray-300 p-3">防老化、防滑移</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
          </Card>

              <Card title="局部质量附加法">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    局部质量附加法应在振动最大跨（通常为中上1/3）设置临时配重或阻尼质量块，改变局部动力参数，抑制振动模式形成。
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">实施要点：</h4>
                    <ul className="space-y-2 text-sm">
                      <li>1. 建议配重质量为吊索较轻质量的1%～3%</li>
                      <li>2. 采用可夹持或挂载的方式，确保安装安全</li>
                      <li>3. 配合橡胶层缓冲可增强耗能效果</li>
                    </ul>
                  </div>
                </div>
          </Card>

              <Card title="扰流与表面扰动法">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    扰流与表面扰动法应通过破坏表面气动光滑性或改变边界层，阻止涡激同步形成。
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-center">序号</th>
                          <th className="border border-gray-300 p-3 text-center">技术方式</th>
                          <th className="border border-gray-300 p-3 text-center">施工材料例示</th>
                          <th className="border border-gray-300 p-3 text-center">特点</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">1</td>
                          <td className="border border-gray-300 p-3 text-center">缠带（缠绕物）法</td>
                          <td className="border border-gray-300 p-3">EVA带、尼龙布、束线带等</td>
                          <td className="border border-gray-300 p-3">操作简单，施工快速</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">2</td>
                          <td className="border border-gray-300 p-3 text-center">螺旋尾翼法</td>
                          <td className="border border-gray-300 p-3">PVC硬片、波纹塑料片等</td>
                          <td className="border border-gray-300 p-3">改变气流分离点，扰乱涡街同步</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">3</td>
                          <td className="border border-gray-300 p-3 text-center">临时喷胶法</td>
                          <td className="border border-gray-300 p-3">防雨粗糙喷胶</td>
                          <td className="border border-gray-300 p-3">表面短期粗糙化，模拟沙粒效果</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
          </Card>
            </div>
          </TabPane>

          <TabPane tab="外部环境应急干预技术" key="4">
            <div className="space-y-6">
              <Alert
                message="外部环境应急干预技术"
                description="外部环境应急干预技术应包括扰流法和交通扰动控制法。"
                type="info"
                showIcon
              />
              
              <Card title="扰流法">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    扰流法应利用消防管道或喷洒设备对吊索或主梁表面喷雾或吹气，打散气流分离，具有良好的扰流效果。
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">实施要点：</h4>
                    <ul className="space-y-2 text-sm">
                      <li>喷嘴布设在振动活跃区</li>
                      <li>建议压力控制在0.2～0.4MPa，持续时间5～15分钟</li>
                      <li>雨天或低温时不建议采用</li>
                    </ul>
                  </div>
                </div>
          </Card>

              <Card title="交通扰动控制法">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    交通扰动控制法应通过限制某侧或中央车道通行，使车辆驱动扰打破涡街同步激励。
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">适用情况：</h4>
                      <ul className="space-y-2 text-sm">
                        <li>可与气象预报结合，择风速峰值前进行扰动引导</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">注意事项：</h4>
                      <ul className="space-y-2 text-sm">
                        <li>本方法不适用于振幅已超限时段，仅限预警阶段</li>
                      </ul>
                    </div>
                  </div>
                </div>
          </Card>
            </div>
          </TabPane>

          <TabPane tab="应用与维护" key="5">
            <div className="space-y-6">
              <Card title="应用与维护要求">
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-700">重要提醒：</h4>
                    <ul className="space-y-2 text-sm text-red-600">
                      <li>1. 所有临时措施必须在结构允许附加质量与局部应力范围内进行</li>
                      <li>2. 抑振装置应每日巡查一次，风雨天后及时检查松动或位移情况</li>
                      <li>3. 建议保留1:1样品与详细记录，作为后续永久减振系统设计依据</li>
                      <li>4. 涉及高空作业的，需制定专项安全措施与施工方案</li>
                    </ul>
                  </div>
                </div>
          </Card>
            </div>
          </TabPane>
        </Tabs>
        </Panel>
      </Collapse>
      </Card>

      {/* 涡振事件后的技术评估与修复 */}
      <Card>
        <Collapse 
          defaultActiveKey={['1']} 
          expandIconPosition="end"
          className="border-0"
        >
          <Panel 
            header={<h3 className="text-lg font-semibold m-0">涡振事件后的技术评估与修复</h3>} 
            key="1"
            className="border-0"
          >
        
        <div className="space-y-6">
          {/* 事件数据收集与整理 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">事件数据收集与整理</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">涡振事件发生后，应第一时间完整收集监测系统的实时数据，包括振动幅值、频率、持续时间、风速及风向等信息。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">对现场目击记录、视频资料及维护人员现场管理报告进行汇总、补充完善证据。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">建立事件档案，包含事件发生背景、处置过程、临时措施与结果，便于后续分析。</h5>
              </div>
            </div>
          </div>

          {/* 结构健康状况检测 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">结构健康状况检测</h4>
            
            <div className="space-y-4">
              <Alert
                message="事件结束后，应对相关构件（吊索、主梁、附属构件等）开展全面的结构健康检测，包括但不限于："
                type="info"
                showIcon
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="space-y-2 text-sm">
                  <li>视觉检查（裂纹、锈蚀、涂层脱落、焊缝异常）；</li>
                  <li>非破坏性检测（超声波、磁粉探伤、红外热成像等）；</li>
                  <li>应变与残余变形检测。</li>
                </ol>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>重点检测疑似受涡振影响的薄弱环节和连接节点，排查潜在安全隐患。</strong>
                </p>
              </div>
            </div>
          </div>

          {/* 振动特性与风环境分析 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">振动特性与风环境分析</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">基于事件数据，开展振动参数的识别与对比，判定涡振引起的刚度变化或阻尼变化。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">分析当时的风速、风向、气象条件，识别涡振的诱发机理及环境特征。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">利用数值仿真或对照事件振动响应，验证涡振模型的适用性。</h5>
              </div>
            </div>
          </div>

          {/* 临时措施效果评估 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">临时措施效果评估</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">评估临时抑振措施对涡振幅值、频率的影响，判断其有效性和不足。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">针对失效或不足的措施，分析原因并提出改进建议。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">结合结构健康检测结果，判断是否存在因振动造成的结构劣化。</h5>
              </div>
            </div>
          </div>

          {/* 修复与优化建议 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">修复与优化建议</h4>
            
            <div className="space-y-4">
              <Alert
                message="根据检测和分析结果，制定修复方案，可能包括："
                type="success"
                showIcon
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="space-y-2 text-sm">
                  <li>换索、补强套夹；</li>
                  <li>重新涂装或隔离防护；</li>
                  <li>加强连接节点，改善结构刚度；</li>
                  <li>安装永久性阻尼器或扰流装置。</li>
                </ol>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>建议优化监测系统，提高灵敏度和数据实时性，完善预警指标。</strong>
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>提出针对风环境特征的防涡振设计优化措施，如改进表面形状、增设扰流装置等。</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 报告与归档 */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">报告与归档</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">编制涡振事件综合技术评估报告，内容包括事件概述、数据分析、检测结果、临时措施评价及修复建议。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">报告应由桥梁设计单位、监测单位及维护管理单位联合签署，形成权威文件。</h5>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">建立事件数据库，为长期桥梁安全管理和减振技术研发提供参考。</h5>
              </div>
            </div>
          </div>
        </div>
        </Panel>
      </Collapse>
      </Card>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">应急处置记录</h3>
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
          dataSource={emergencyResponseData}
          pagination={{
            total: emergencyResponseData.length,
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
            <Button 
              type="link" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDevice(record)}
            >
              查看
            </Button>
            <Button 
              type="link" 
              icon={<SettingOutlined />}
              onClick={() => handleConfigDevice(record)}
            >
              配置
            </Button>
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleMaintenanceDevice(record)}
            >
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

  // 日历视图处理函数
  const handleCalendarView = () => {
    Modal.info({
      title: '排查计划日历视图',
      width: 1000,
      content: (
        <div className="space-y-4 mt-4">
          <Calendar
            dateCellRender={(value) => {
              const dateStr = value.format('YYYY-MM-DD');
              const plansForDate = inspectionPlan.filter(plan => plan.scheduledDate === dateStr);
              
              if (plansForDate.length === 0) return null;
              
              return (
                <div className="space-y-1">
                  {plansForDate.map(plan => (
                    <div 
                      key={plan.key}
                      className={`text-xs p-1 rounded cursor-pointer ${
                        plan.status === '紧急' ? 'bg-red-100 text-red-600' :
                        plan.status === '计划中' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}
                      onClick={() => {
                        Modal.info({
                          title: '计划详情',
                          content: (
                            <div className="space-y-2">
                              <div><strong>桥梁名称：</strong>{plan.bridgeName}</div>
                              <div><strong>计划类型：</strong>{plan.planType}</div>
                              <div><strong>负责人：</strong>{plan.inspector}</div>
                              <div><strong>优先级：</strong>
                                <Tag color={plan.priority === '高' ? 'red' : plan.priority === '中' ? 'orange' : 'green'}>
                                  {plan.priority}
                                </Tag>
                              </div>
                              <div><strong>状态：</strong>
                                <Tag color={plan.status === '紧急' ? 'red' : plan.status === '计划中' ? 'blue' : 'green'}>
                                  {plan.status}
                                </Tag>
                              </div>
                            </div>
                          ),
                        });
                      }}
                    >
                      {plan.bridgeName}
                    </div>
                  ))}
                </div>
              );
            }}
            monthCellRender={(value) => {
              const monthStr = value.format('YYYY-MM');
              const monthPlans = inspectionPlan.filter(plan => 
                plan.scheduledDate.startsWith(monthStr)
              );
              
              if (monthPlans.length === 0) return null;
              
              return (
                <div className="text-center">
                  <div className="text-xs text-gray-500">
                    {monthPlans.length} 个计划
                  </div>
                </div>
              );
            }}
          />
          
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-2">图例说明：</h4>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
                <span className="text-sm">紧急计划</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
                <span className="text-sm">计划中</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                <span className="text-sm">已完成</span>
              </div>
            </div>
          </div>
        </div>
      ),
    });
  };

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
            <Button 
              icon={<CalendarOutlined />}
              onClick={handleCalendarView}
            >
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
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />}
                    onClick={() => handleViewPlan(record)}
                  >
                    查看
                  </Button>
                  <Button 
                    type="link" 
                    icon={<EditOutlined />}
                    onClick={() => handleEditPlan(record)}
                  >
                    编辑
                  </Button>
                  <Button 
                    type="link" 
                    icon={<FlagOutlined />}
                    onClick={() => handleExecutePlan(record)}
                  >
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

  // 查看知识库资料
  const handleViewKnowledge = (item) => {
    Modal.info({
      title: item.title,
      width: 800,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>作者：</strong>{item.author}</div>
              <div><strong>发布时间：</strong>{item.publishDate}</div>
              <div><strong>分类：</strong><Tag color="blue">{item.category}</Tag></div>
              <div><strong>下载量：</strong>{item.downloads}</div>
            </div>
            <div className="mt-3">
              <strong>标签：</strong>
              <div className="mt-1">
                {item.tags.map(tag => (
                  <Tag key={tag} size="small" color="geekblue">{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">资料摘要</h4>
            <p className="text-gray-700 leading-relaxed">
              {item.category === '理论研究' 
                ? '本资料详细介绍了悬索桥主梁涡振的产生机理、影响因素及防控技术。通过理论分析和实验研究，提出了有效的涡振抑制方案，为大跨径悬索桥的抗风设计提供了重要参考。'
                : '本技术标准规范了斜拉桥拉索涡振抑制装置的设计、安装和维护要求。包含了详细的技术参数、施工工艺和质量控制标准，是斜拉桥抑振装置工程应用的重要指导文件。'
              }
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">主要内容</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {item.category === '理论研究' ? [
                '涡振现象的理论基础与数学模型',
                '风洞试验与数值模拟方法',
                '主梁截面气动优化设计',
                '抑振装置的设计原理与应用',
                '工程案例分析与经验总结'
              ] : [
                '抑振装置的分类与选型',
                '设计计算方法与参数确定',
                '安装施工技术要求',
                '运行维护与检测标准',
                '质量验收与评价体系'
              ]}
              {item.category === '理论研究' ? [
                '涡振现象的理论基础与数学模型',
                '风洞试验与数值模拟方法',
                '主梁截面气动优化设计',
                '抑振装置的设计原理与应用',
                '工程案例分析与经验总结'
              ] : [
                '抑振装置的分类与选型',
                '设计计算方法与参数确定',
                '安装施工技术要求',
                '运行维护与检测标准',
                '质量验收与评价体系'
              ].map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadKnowledge(item)}
            >
              下载完整资料
            </Button>
          </div>
        </div>
      ),
    });
  };

  // 下载知识库资料
  const handleDownloadKnowledge = (item) => {
    // 模拟下载过程
    const downloadUrl = `https://example.com/downloads/${item.key}.pdf`;
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${item.title}.pdf`;
    link.style.display = 'none';
    
    // 模拟下载
    document.body.appendChild(link);
    
    // 显示下载进度
    let progress = 0;
    const progressModal = Modal.info({
      title: '正在下载',
      content: (
        <div className="space-y-3">
          <div>正在下载：{item.title}</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">下载进度：{progress}%</div>
        </div>
      ),
      okButtonProps: { style: { display: 'none' } }
    });
    
    // 模拟下载进度
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        progressModal.destroy();
        
        // 更新下载量
        setKnowledgeBase(knowledgeBase.map(knowledge => 
          knowledge.key === item.key 
            ? { ...knowledge, downloads: knowledge.downloads + 1 }
            : knowledge
        ));
        
        message.success(`《${item.title}》下载完成！`);
        
        // 清理下载链接
        document.body.removeChild(link);
      } else {
        progressModal.update({
          content: (
            <div className="space-y-3">
              <div>正在下载：{item.title}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">下载进度：{progress}%</div>
            </div>
          )
        });
      }
    }, 200);
  };

  // 设备查看功能
  const handleViewDevice = (record) => {
    Modal.info({
      title: '设备详细信息',
      width: 800,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-blue-600">基本信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>设备编号：</strong>{record.key}</div>
              <div><strong>桥梁名称：</strong>{record.bridgeName}</div>
              <div><strong>设备类型：</strong>{record.deviceType}</div>
              <div><strong>安装位置：</strong>{record.location}</div>
              <div><strong>运行状态：</strong>
                <Tag color={record.status === '正常' ? 'green' : 'red'} className="ml-2">
                  {record.status}
                </Tag>
              </div>
              <div><strong>数据质量：</strong>
                <Tag color={record.dataQuality === '优秀' ? 'green' : record.dataQuality === '良好' ? 'blue' : 'orange'} className="ml-2">
                  {record.dataQuality}
                </Tag>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-green-600">维护记录</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>上次维护：</strong>{record.lastMaintenance}</div>
              <div><strong>下次维护：</strong>{record.nextMaintenance}</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-yellow-600">技术参数</h4>
            <div className="space-y-2 text-sm">
              <div>• 测量精度：±0.1%</div>
              <div>• 工作温度：-40°C ~ +85°C</div>
              <div>• 供电电压：DC 12V</div>
              <div>• 通信方式：4G/以太网</div>
              <div>• 数据采集频率：1Hz</div>
            </div>
          </div>
        </div>
      ),
    });
  };

  // 设备配置功能
  const handleConfigDevice = (record) => {
    Modal.info({
      title: '设备配置',
      width: 700,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">设备：{record.deviceType} - {record.location}</h4>
          </div>
          
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="采集频率">
                  <Select defaultValue="1Hz" style={{ width: '100%' }}>
                    <Option value="0.1Hz">0.1Hz</Option>
                    <Option value="0.5Hz">0.5Hz</Option>
                    <Option value="1Hz">1Hz</Option>
                    <Option value="5Hz">5Hz</Option>
                    <Option value="10Hz">10Hz</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="数据上传间隔">
                  <Select defaultValue="1分钟" style={{ width: '100%' }}>
                    <Option value="30秒">30秒</Option>
                    <Option value="1分钟">1分钟</Option>
                    <Option value="5分钟">5分钟</Option>
                    <Option value="10分钟">10分钟</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="报警阈值">
                  <InputNumber 
                    defaultValue={100} 
                    style={{ width: '100%' }}
                    addonAfter="单位"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="校准系数">
                  <InputNumber 
                    defaultValue={1.0} 
                    step={0.01}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item label="通信设置">
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="w-20">IP地址：</span>
                  <Input defaultValue="192.168.1.100" style={{ width: 200 }} />
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-20">端口：</span>
                  <InputNumber defaultValue={8080} style={{ width: 200 }} />
                </div>
              </div>
            </Form.Item>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button>重置</Button>
              <Button type="primary" onClick={() => {
                message.success('设备配置已保存');
              }}>
                保存配置
              </Button>
            </div>
          </Form>
        </div>
      ),
    });
  };

  // 设备维护功能
  const handleMaintenanceDevice = (record) => {
    Modal.info({
      title: '设备维护',
      width: 600,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">维护设备：{record.deviceType}</h4>
            <div><strong>位置：</strong>{record.location}</div>
          </div>
          
          <Form layout="vertical">
            <Form.Item label="维护类型" required>
              <Select placeholder="请选择维护类型" style={{ width: '100%' }}>
                <Option value="定期保养">定期保养</Option>
                <Option value="故障维修">故障维修</Option>
                <Option value="设备校准">设备校准</Option>
                <Option value="软件升级">软件升级</Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="维护人员" required>
              <Input placeholder="请输入维护人员姓名" />
            </Form.Item>
            
            <Form.Item label="维护内容" required>
              <TextArea 
                rows={4} 
                placeholder="请详细描述维护内容和发现的问题"
              />
            </Form.Item>
            
            <Form.Item label="维护结果">
              <Radio.Group defaultValue="正常">
                <Radio value="正常">设备正常</Radio>
                <Radio value="异常">设备异常</Radio>
                <Radio value="待观察">待观察</Radio>
              </Radio.Group>
            </Form.Item>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button>取消</Button>
              <Button type="primary" onClick={() => {
                // 更新设备状态
                setMonitoringData(monitoringData.map(item => 
                  item.key === record.key 
                    ? { ...item, lastMaintenance: new Date().toISOString().split('T')[0] }
                    : item
                ));
                message.success('维护记录已保存');
              }}>
                保存维护记录
              </Button>
            </div>
          </Form>
        </div>
      ),
    });
  };

  // 搜索功能处理函数
  const handleSearchKnowledge = () => {
    Modal.info({
      title: '搜索桥梁资料库',
      width: 600,
      content: (
        <div className="space-y-4 mt-4">
          <Input.Search
            placeholder="请输入关键词搜索资料"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={(value) => {
              if (value.trim()) {
                message.success(`正在搜索"${value}"相关资料...`);
                // 这里可以添加实际的搜索逻辑
              } else {
                message.warning('请输入搜索关键词');
              }
            }}
          />
          <div className="mt-4">
            <h4 className="font-semibold mb-2">热门搜索：</h4>
            <Space wrap>
              {['悬索桥', '斜拉桥', '涡振', '防控技术', '抑振装置', '风洞实验'].map(tag => (
                <Tag 
                  key={tag} 
                  color="blue" 
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    message.success(`正在搜索"${tag}"相关资料...`);
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">搜索范围：</h4>
            <Checkbox.Group defaultValue={['title', 'content']}>
              <div className="space-y-2">
                <div><Checkbox value="title">标题</Checkbox></div>
                <div><Checkbox value="content">内容</Checkbox></div>
                <div><Checkbox value="author">作者</Checkbox></div>
                <div><Checkbox value="tags">标签</Checkbox></div>
              </div>
            </Checkbox.Group>
          </div>
        </div>
      ),
    });
  };

  // 桥梁资料库页面
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
          <h3 className="text-lg font-semibold">桥梁资料库</h3>
          <Space>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={() => handleAdd('knowledge')}
            >
              上传资料
            </Button>
            <Button 
              icon={<SearchOutlined />}
              onClick={handleSearchKnowledge}
            >
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
                <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewKnowledge(item)}>查看</Button>,
                <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownloadKnowledge(item)}>下载</Button>,
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

  // 知识库表单
  const renderKnowledgeForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="title"
        label="资料标题"
        rules={[{ required: true, message: '请输入资料标题' }]}
      >
        <Input placeholder="请输入资料标题" />
      </Form.Item>
      
      <Form.Item
        name="category"
        label="资料分类"
        rules={[{ required: true, message: '请选择资料分类' }]}
      >
        <Select placeholder="请选择资料分类">
          <Option value="理论研究">理论研究</Option>
          <Option value="技术标准">技术标准</Option>
          <Option value="案例分析">案例分析</Option>
          <Option value="操作指南">操作指南</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="author"
        label="作者"
        rules={[{ required: true, message: '请输入作者' }]}
      >
        <Input placeholder="请输入作者" />
      </Form.Item>
      
      <Form.Item
        name="tags"
        label="标签"
      >
        <Select mode="tags" placeholder="请输入标签，按回车添加">
          <Option value="悬索桥">悬索桥</Option>
          <Option value="斜拉桥">斜拉桥</Option>
          <Option value="涡振">涡振</Option>
          <Option value="防控技术">防控技术</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        label="上传文件"
        rules={[{ required: true, message: '请上传文件' }]}
      >
        <Upload
          name="file"
          action="/api/upload"
          listType="text"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
      </Form.Item>
    </Form>
  );

  // 监测设备表单
  const renderMonitoringForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="bridgeName"
        label="桥梁名称"
        rules={[{ required: true, message: '请输入桥梁名称' }]}
      >
        <Input placeholder="请输入桥梁名称" />
      </Form.Item>
      
      <Form.Item
        name="deviceType"
        label="设备类型"
        rules={[{ required: true, message: '请选择设备类型' }]}
      >
        <Select placeholder="请选择设备类型">
          <Option value="风速风向仪">风速风向仪</Option>
          <Option value="加速度传感器">加速度传感器</Option>
          <Option value="位移传感器">位移传感器</Option>
          <Option value="应变仪">应变仪</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="location"
        label="安装位置"
        rules={[{ required: true, message: '请输入安装位置' }]}
      >
        <Input placeholder="请输入安装位置" />
      </Form.Item>
      
      <Form.Item
        name="status"
        label="运行状态"
        rules={[{ required: true, message: '请选择运行状态' }]}
      >
        <Select placeholder="请选择运行状态">
          <Option value="正常">正常</Option>
          <Option value="异常">异常</Option>
          <Option value="维护中">维护中</Option>
        </Select>
      </Form.Item>
    </Form>
  );

  // 查看排查计划详情
  const handleViewPlan = (record) => {
    Modal.info({
      title: '排查计划详情',
      width: 700,
      content: (
        <div className="space-y-4 mt-4">
          <Descriptions title="基本信息" column={2} bordered>
            <Descriptions.Item label="计划编号">{record.key}</Descriptions.Item>
            <Descriptions.Item label="桥梁名称">{record.bridgeName}</Descriptions.Item>
            <Descriptions.Item label="计划类型">
              <Tag color={record.planType === '定期排查' ? 'blue' : record.planType === '季节性监测' ? 'green' : 'red'}>
                {record.planType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="计划日期">{record.scheduledDate}</Descriptions.Item>
            <Descriptions.Item label="负责人">{record.inspector}</Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={record.priority === '高' ? 'red' : record.priority === '中' ? 'orange' : 'green'}>
                {record.priority}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={record.status === '紧急' ? 'red' : record.status === '计划中' ? 'blue' : 'green'}>
                {record.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">2024-01-15</Descriptions.Item>
          </Descriptions>

          <div>
            <h4 className="font-semibold mb-3 text-blue-600">
              <CalendarOutlined className="mr-2" />
              排查内容
            </h4>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              <ul className="list-disc list-inside space-y-1">
                <li>主梁涡振隐患排查</li>
                <li>拉索涡振隐患排查</li>
                <li>抑振装置状态检查</li>
                <li>监测设备运行状态检查</li>
                <li>环境条件评估</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-green-600">
              <CheckCircleOutlined className="mr-2" />
              排查要求
            </h4>
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <ul className="list-disc list-inside space-y-1">
                <li>严格按照排查标准执行</li>
                <li>详细记录排查过程和结果</li>
                <li>发现问题及时上报</li>
                <li>完成后提交排查报告</li>
              </ul>
            </div>
          </div>

          {record.status === '紧急' && (
            <Alert
              message="紧急计划提醒"
              description="此计划为紧急排查，请优先安排执行，确保桥梁安全。"
              type="error"
              showIcon
            />
          )}
        </div>
      ),
    });
  };

  // 编辑排查计划
  const handleEditPlan = (record) => {
    setModalType('plan');
    setEditingRecord(record);
    
    // 处理日期字段，确保正确转换为dayjs对象
    const formValues = {
      ...record,
      scheduledDate: record.scheduledDate ? dayjs(record.scheduledDate) : null,
    };
    
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  // 执行排查计划
  const handleExecutePlan = (record) => {
    Modal.confirm({
      title: '执行排查计划',
      content: `确定要执行"${record.bridgeName}"的${record.planType}吗？`,
      onOk() {
        // 更新计划状态
        setInspectionPlan(inspectionPlan.map(item => 
          item.key === record.key 
            ? { ...item, status: '执行中' }
            : item
        ));
        message.success('排查计划已开始执行');
      },
    });
  };

  // 排查计划表单
  const renderPlanForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="bridgeName"
        label="桥梁名称"
        rules={[{ required: true, message: '请输入桥梁名称' }]}
      >
        <Input placeholder="请输入桥梁名称" />
      </Form.Item>
      
      <Form.Item
        name="planType"
        label="计划类型"
        rules={[{ required: true, message: '请选择计划类型' }]}
      >
        <Select placeholder="请选择计划类型">
          <Option value="定期排查">定期排查</Option>
          <Option value="季节性监测">季节性监测</Option>
          <Option value="特殊情况排查">特殊情况排查</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="scheduledDate"
        label="计划日期"
        rules={[{ required: true, message: '请选择计划日期' }]}
      >
        <DatePicker 
          className="w-full" 
          placeholder="请选择计划日期"
          format="YYYY-MM-DD"
        />
      </Form.Item>
      
      <Form.Item
        name="inspector"
        label="负责人"
        rules={[{ required: true, message: '请输入负责人' }]}
      >
        <Input placeholder="请输入负责人" />
      </Form.Item>
      
      <Form.Item
        name="priority"
        label="优先级"
        rules={[{ required: true, message: '请选择优先级' }]}
      >
        <Select placeholder="请选择优先级">
          <Option value="高">高</Option>
          <Option value="中">中</Option>
          <Option value="低">低</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="计划状态"
        rules={[{ required: true, message: '请选择计划状态' }]}
      >
        <Select placeholder="请选择计划状态">
          <Option value="计划中">计划中</Option>
          <Option value="紧急">紧急</Option>
          <Option value="执行中">执行中</Option>
          <Option value="已完成">已完成</Option>
          <Option value="已取消">已取消</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="计划描述"
      >
        <TextArea 
          rows={3} 
          placeholder="请输入计划的详细描述和要求"
        />
      </Form.Item>
    </Form>
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
