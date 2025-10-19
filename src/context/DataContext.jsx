import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [hazardInspectionData, setHazardInspectionData] = useState([
    {
      key: '1',
      id: 'BVH001',
      bridgeName: '长江大桥',
      bridgeStakeNumber: 'K15+200~K16+400',
      bridgeStructureForm: '悬索桥',
      bridgeSpan: '主跨1200m，边跨各400m',
      bridgeType: '悬索桥',
      mainSpan: 1200,
      location: '某市某区跨江大桥',
      buildYear: 2018,
      designUnit: '某桥梁设计研究院',
      inspectionDate: '2024-01-15',
      nextInspectionDate: '2024-07-15',
      inspectionType: '定期排查',
      riskLevel: '较大',
      status: '已完成',
      inspector: '张工程师',
      issues: ['主梁气动外形轻微缺陷', '部分抑振装置松动', '桥面附属物位置不当'],
      recommendations: ['加强监测', '维修抑振装置', '调整附属物位置']
    },
    {
      key: '2',
      id: 'BVH002',
      bridgeName: '黄河大桥',
      bridgeStakeNumber: 'K25+100~K26+200',
      bridgeStructureForm: '斜拉桥',
      bridgeSpan: '主跨800m，边跨各300m',
      bridgeType: '斜拉桥',
      mainSpan: 800,
      location: '某市某区跨河大桥',
      buildYear: 2020,
      designUnit: '某桥梁设计研究院',
      inspectionDate: '2024-01-20',
      nextInspectionDate: '2024-08-20',
      inspectionType: '专项排查',
      riskLevel: '中等',
      status: '进行中',
      inspector: '李工程师',
      issues: ['拉索振动异常', '塔柱表面轻微裂纹'],
      recommendations: ['安装阻尼器', '加强塔柱监测']
    },
    {
      key: '3',
      id: 'BVH003',
      bridgeName: '珠江大桥',
      bridgeStakeNumber: 'K35+500~K36+800',
      bridgeStructureForm: '钢结构梁桥',
      bridgeSpan: '主跨600m，边跨各200m',
      bridgeType: '钢结构梁桥',
      mainSpan: 600,
      location: '某市某区跨江大桥',
      buildYear: 2019,
      designUnit: '某桥梁设计研究院',
      inspectionDate: '2024-01-25',
      nextInspectionDate: '2024-09-25',
      inspectionType: '定期排查',
      riskLevel: '轻微',
      status: '已完成',
      inspector: '王工程师',
      issues: ['钢梁表面锈蚀', '伸缩缝异常'],
      recommendations: ['防腐处理', '更换伸缩缝']
    },
    {
      key: '4',
      id: 'BVH004',
      bridgeName: '淮河大桥',
      bridgeStakeNumber: 'K45+300~K46+100',
      bridgeStructureForm: '其他桥型',
      bridgeSpan: '主跨400m，边跨各150m',
      bridgeType: '其他桥型',
      mainSpan: 400,
      location: '某市某区跨河大桥',
      buildYear: 2021,
      designUnit: '某桥梁设计研究院',
      inspectionDate: '2024-01-30',
      nextInspectionDate: '2024-10-30',
      inspectionType: '应急排查',
      riskLevel: '较大',
      status: '待处理',
      inspector: '赵工程师',
      issues: ['桥面开裂', '支座异常'],
      recommendations: ['紧急维修', '限制通行']
    }
  ]);

  const [riskAssessmentData, setRiskAssessmentData] = useState([
    {
      key: '1',
      id: 'BVR001',
      bridgeName: '长江大桥',
      assessmentDate: '2024-01-15',
      riskCategory: '4',
      overallRisk: '重大',
      assessor: '张专家',
      windDirection: '东北风',
      temperature: 15,
      humidity: 65,
      visibility: '良好',
      assessmentMethod: 'CFD数值模拟',
      riskScore: 85,
      recommendations: ['加强监测', '安装抑振装置', '限制通行条件'],
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
        trafficLoad: { level: 3, score: 65, description: '0.7Qd ≤ Q < 0.9Qd' },
        trafficVolume: { level: 3, score: 65, description: '0.7Qd ≤ Q < 0.9Qd' },
        heavyVehicles: { level: 2, score: 80, description: '0.3 ≤ r < 0.5' }
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 3, score: 65, description: '0.4Av,allow ≤ Av < 0.6Av,allow' },
        torsional: { level: 4, score: 40, description: '0.6Aθ,allow ≤ Aθ < Aθ,allow' }
      },
      bridgeEvaluation: {
        aerodynamics: '3级',
        vibrationChar: '3级',
        suppression: '2级'
      },
      mainBeamFreq: 0.18,
      torsionalFreq: 0.25,
      dampingRatio: 0.008,
      cableFreq: 2.35,
      windSpeed: 12,
      turbulenceIntensity: '较高',
      verticalAmplitude: 0.12,
      torsionalAmplitude: 0.08
    },
    {
      key: '2',
      id: 'BVR002',
      bridgeName: '黄河大桥',
      assessmentDate: '2024-01-18',
      riskCategory: '2',
      overallRisk: '较大',
      assessor: '李专家',
      windDirection: '西北风',
      temperature: 12,
      humidity: 58,
      visibility: '良好',
      assessmentMethod: '风洞试验',
      riskScore: 65,
      recommendations: ['定期监测', '优化气动外形'],
      mainBeamAssessment: {
        aerodynamicDesign: { level: 3, score: 65, description: '未做过风洞实验和数值模拟' },
        sectionDeviation: { level: 2, score: 80, description: '1% ≤ 偏差 < 2%' },
        surfaceDefects: { level: 3, score: 65, description: '5% ≤ 缺陷面积 < 10%' },
        attachmentPosition: { level: 2, score: 80, description: '2 cm ≤ 偏差 < 5 cm' },
        verticalFreq: { level: 2, score: 80, description: '1.0Vc < V ≤ 1.2Vc' },
        torsionalFreq: { level: 2, score: 80, description: '1.0Vc < V ≤ 1.2Vc' },
        dampingRatio: { level: 3, score: 65, description: '0.6ζ₀ ≤ ζ < 0.8ζ₀' },
        suppressionMeasures: { level: 3, score: 65, description: '有抑振措施但效果一般' }
      },
      cableAssessment: {
        appearance: { level: 2, score: 80, description: '表面缺陷面积 ≤ 5%' },
        frequency: { level: 3, score: 65, description: '0.75Vc < V ≤ 1.0Vc' },
        suppressionMeasures: { level: 2, score: 80, description: '有完善的抑振措施' }
      },
      environmentAssessment: {
        windField: { level: 3, score: 65, description: '紊流强度不高' },
        trafficLoad: { level: 2, score: 80, description: '0.5Qd ≤ Q < 0.7Qd' },
        trafficVolume: { level: 2, score: 80, description: '0.5Qd ≤ Q < 0.7Qd' },
        heavyVehicles: { level: 3, score: 65, description: '0.5 ≤ r < 0.8' }
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 2, score: 80, description: '0.2Av,allow ≤ Av < 0.4Av,allow' },
        torsional: { level: 2, score: 80, description: '0.2Aθ,allow ≤ Aθ < 0.4Aθ,allow' }
      },
      bridgeEvaluation: {
        aerodynamics: '2级',
        vibrationChar: '2级',
        suppression: '2级'
      },
      mainBeamFreq: 0.22,
      torsionalFreq: 0.31,
      dampingRatio: 0.012,
      cableFreq: 1.85,
      windSpeed: 18,
      turbulenceIntensity: '不高',
      verticalAmplitude: 0.08,
      torsionalAmplitude: 0.06
    },
    {
      key: '3',
      id: 'BVR003',
      bridgeName: '珠江大桥',
      assessmentDate: '2024-01-22',
      riskCategory: '1',
      overallRisk: '轻微',
      assessor: '王专家',
      windDirection: '南风',
      temperature: 20,
      humidity: 72,
      visibility: '优秀',
      assessmentMethod: '现场测试',
      riskScore: 35,
      recommendations: ['保持现状', '定期检查'],
      mainBeamAssessment: {
        aerodynamicDesign: { level: 1, score: 100, description: '做过风洞实验和数值模拟' },
        sectionDeviation: { level: 1, score: 100, description: '偏差 < 1%' },
        surfaceDefects: { level: 1, score: 100, description: '缺陷面积 < 2%' },
        attachmentPosition: { level: 1, score: 100, description: '位置偏差 < 2 cm' },
        verticalFreq: { level: 1, score: 100, description: 'V > 1.2Vc' },
        torsionalFreq: { level: 1, score: 100, description: 'V > 1.2Vc' },
        dampingRatio: { level: 1, score: 100, description: 'ζ ≥ 0.9ζ₀' },
        suppressionMeasures: { level: 1, score: 100, description: '抑振系统完备' }
      },
      cableAssessment: {
        appearance: { level: 1, score: 100, description: '连接部位无松动、表面无缺陷' },
        frequency: { level: 1, score: 100, description: 'V > 1.2Vc' },
        suppressionMeasures: { level: 1, score: 100, description: '抑振系统完备' }
      },
      environmentAssessment: {
        windField: { level: 1, score: 100, description: '紊流强度很高' },
        trafficLoad: { level: 1, score: 100, description: 'Q < 0.5Qd' },
        trafficVolume: { level: 1, score: 100, description: 'Q < 0.5Qd' },
        heavyVehicles: { level: 1, score: 100, description: 'r < 0.3' }
      },
      vibrationAmplitudeAssessment: {
        vertical: { level: 1, score: 100, description: 'Av < 0.2Av,allow' },
        torsional: { level: 1, score: 100, description: 'Aθ < 0.2Aθ,allow' }
      },
      bridgeEvaluation: {
        aerodynamics: '1级',
        vibrationChar: '1级',
        suppression: '1级'
      },
      mainBeamFreq: 0.42,
      torsionalFreq: 0.58,
      dampingRatio: 0.015,
      cableFreq: 3.2,
      windSpeed: 8,
      turbulenceIntensity: '很高',
      verticalAmplitude: 0.06,
      torsionalAmplitude: 0.04
    }
  ]);

  const [emergencyResponseData, setEmergencyResponseData] = useState([
    {
      key: '1',
      id: 'BVE001',
      bridgeName: '长江大桥',
      mainBeamTech: ['调谐质量阻尼器'],
      cableTech: ['螺旋线缆'],
      environmentTech: ['风屏障'],
      emergencyLevel: '重大',
      responseTime: '2024-01-15 14:30',
      completionTime: '2024-01-16 10:00',
      status: '已完成',
      responsePerson: '张队长',
      emergencyType: '涡振异常',
      measures: ['立即限行', '安装临时阻尼器', '24小时监测'],
      result: '成功抑制涡振，桥梁恢复正常通行',
      eventTime: '2024-01-15 14:30',
      vibrationLevel: '严重',
      windSpeed: 28.5,
      triggerCondition: '主梁振幅超过L/1000且持续3分钟',
      responsible: '应急小组A',
      suppressionTech: {
        type: '调谐质量阻尼器',
        materials: '钢质量块、弹簧系统',
        effectiveness: '良好'
      },
      processingSteps: [
        { step: '快速研判', time: '3分钟', status: '完成' },
        { step: '应急响应', time: '5分钟', status: '完成' },
        { step: '现场处置', time: '30分钟', status: '完成' },
        { step: '效果评估', time: '15分钟', status: '完成' },
        { step: '恢复运行', time: '10分钟', status: '完成' }
      ]
    },
    {
      key: '2',
      id: 'BVE002',
      bridgeName: '黄河大桥',
      mainBeamTech: ['气动措施'],
      cableTech: ['阻尼器'],
      environmentTech: ['导流板'],
      emergencyLevel: '较大',
      responseTime: '2024-01-20 09:15',
      completionTime: null,
      status: '实施中',
      responsePerson: '李队长',
      emergencyType: '拉索振动',
      measures: ['部分限行', '调整阻尼器参数', '加强监测'],
      result: '正在处理中，预计2天内完成',
      eventTime: '2024-01-20 09:15',
      vibrationLevel: '中等',
      windSpeed: 18.2,
      triggerCondition: '拉索振动频率持续5分钟超过阈值',
      responsible: '应急小组B',
      suppressionTech: {
        type: '阻尼器调整',
        materials: '液压阻尼器、调节装置',
        effectiveness: '评估中'
      },
      processingSteps: [
        { step: '快速研判', time: '5分钟', status: '完成' },
        { step: '应急响应', time: '10分钟', status: '完成' },
        { step: '现场处置', time: '45分钟', status: '进行中' },
        { step: '效果评估', time: '-', status: '待进行' },
        { step: '恢复运行', time: '-', status: '待进行' }
      ]
    }
  ]);

  const [knowledgeBaseData, setKnowledgeBaseData] = useState([
    {
      key: '1',
      id: 'KB001',
      title: '悬索桥涡振机理研究报告',
      type: '技术报告',
      category: '理论研究',
      bridgeName: '长江大桥',
      author: '张教授',
      uploadDate: '2024-01-10',
      fileSize: '2.5MB',
      downloads: 156,
      status: '已审核',
      tags: ['涡振', '悬索桥', '机理研究'],
      abstract: '本报告详细分析了悬索桥在风荷载作用下的涡振现象，提出了有效的抑振措施。',
      keywords: '涡振, 悬索桥, 风荷载, 抑振措施',
      version: 'v1.2',
      language: '中文'
    }
  ]);

  const addHazardInspection = (data) => {
    const newData = {
      ...data,
      id: hazardInspectionData.length + 1
    };
    setHazardInspectionData(prev => [...prev, newData]);
  };

  const updateHazardInspection = (id, data) => {
    setHazardInspectionData(prev => 
      prev.map(item => item.id === id ? { ...item, ...data } : item)
    );
  };

  const deleteHazardInspection = (id) => {
    setHazardInspectionData(prev => prev.filter(item => item.id !== id));
  };

  const addRiskAssessment = (data) => {
    const newData = {
      ...data,
      id: riskAssessmentData.length + 1
    };
    setRiskAssessmentData(prev => [...prev, newData]);
  };

  const updateRiskAssessment = (id, data) => {
    setRiskAssessmentData(prev => 
      prev.map(item => item.id === id ? { ...item, ...data } : item)
    );
  };

  const deleteRiskAssessment = (id) => {
    setRiskAssessmentData(prev => prev.filter(item => item.id !== id));
  };

  const addEmergencyResponse = (data) => {
    const newData = {
      ...data,
      id: emergencyResponseData.length + 1
    };
    setEmergencyResponseData(prev => [...prev, newData]);
  };

  const updateEmergencyResponse = (id, data) => {
    setEmergencyResponseData(prev => 
      prev.map(item => item.id === id ? { ...item, ...data } : item)
    );
  };

  const deleteEmergencyResponse = (id) => {
    setEmergencyResponseData(prev => prev.filter(item => item.id !== id));
  };

  const addKnowledgeBase = (data) => {
    const newData = {
      ...data,
      id: knowledgeBaseData.length + 1
    };
    setKnowledgeBaseData(prev => [...prev, newData]);
  };

  const updateKnowledgeBase = (id, data) => {
    setKnowledgeBaseData(prev => 
      prev.map(item => item.id === id ? { ...item, ...data } : item)
    );
  };

  const deleteKnowledgeBase = (id) => {
    setKnowledgeBaseData(prev => prev.filter(item => item.id !== id));
  };

  const getStatistics = () => {
    return {
      totalBridges: 45,
      hazardInspectionCount: hazardInspectionData.length,
      riskAssessmentCount: riskAssessmentData.length,
      emergencyResponseCount: emergencyResponseData.length,
      knowledgeBaseCount: knowledgeBaseData.length
    };
  };

  const value = {
    hazardInspectionData,
    riskAssessmentData,
    emergencyResponseData,
    knowledgeBaseData,
    addHazardInspection,
    updateHazardInspection,
    deleteHazardInspection,
    addRiskAssessment,
    updateRiskAssessment,
    deleteRiskAssessment,
    addEmergencyResponse,
    updateEmergencyResponse,
    deleteEmergencyResponse,
    addKnowledgeBase,
    updateKnowledgeBase,
    deleteKnowledgeBase,
    getStatistics
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};