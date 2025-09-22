import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Select, 
  Space, 
  message,
  Tag,
  Input,
  Row,
  Col,
  Statistic,
  Alert
} from 'antd';
import { 
  ExportOutlined,
  SearchOutlined,
  WarningOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

function MajorHazardRegistry() {
  const [selectedEnterprise, setSelectedEnterprise] = useState('');
  const [searchText, setSearchText] = useState('');

  const [dataSource] = useState([
    {
      key: '1',
      id: 'MHR001',
      enterpriseName: '某化工企业',
      riskPoint: '反应釜区域',
      hazardSource: '高温高压反应',
      riskLevel: '重大',
      riskScore: 18,
      possibleAccident: '爆炸、中毒',
      controlMeasures: '安装温度压力监控系统，设置安全阀，定期检查维护',
      responsiblePerson: '张三',
      contactPhone: '13800138001',
      lastInspection: '2024-01-10',
      nextInspection: '2024-02-10',
      status: '正常监管',
    },
    {
      key: '2',
      id: 'MHR002',
      enterpriseName: '某化工企业',
      riskPoint: '储罐区',
      hazardSource: '易燃易爆物质储存',
      riskLevel: '重大',
      riskScore: 20,
      possibleAccident: '火灾、爆炸',
      controlMeasures: '安装气体检测报警系统，设置防火防爆设施',
      responsiblePerson: '李四',
      contactPhone: '13800138002',
      lastInspection: '2024-01-12',
      nextInspection: '2024-02-12',
      status: '重点监管',
    },
    {
      key: '3',
      id: 'MHR003',
      enterpriseName: '某机械制造企业',
      riskPoint: '压力容器区',
      hazardSource: '高压气体',
      riskLevel: '较大',
      riskScore: 15,
      possibleAccident: '容器爆裂',
      controlMeasures: '定期检验，安装安全阀，操作人员培训',
      responsiblePerson: '王五',
      contactPhone: '13800138003',
      lastInspection: '2024-01-08',
      nextInspection: '2024-02-08',
      status: '正常监管',
    },
    {
      key: '4',
      id: 'MHR004',
      enterpriseName: '某建筑企业',
      riskPoint: '塔吊作业区',
      hazardSource: '高空作业',
      riskLevel: '较大',
      riskScore: 12,
      possibleAccident: '高空坠落、物体打击',
      controlMeasures: '安全带使用，定期设备检查，安全培训',
      responsiblePerson: '赵六',
      contactPhone: '13800138004',
      lastInspection: '2024-01-15',
      nextInspection: '2024-02-15',
      status: '正常监管',
    },
  ]);

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      fixed: 'left',
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      key: 'enterpriseName',
      width: 150,
      fixed: 'left',
    },
    {
      title: '风险点',
      dataIndex: 'riskPoint',
      key: 'riskPoint',
      width: 150,
    },
    {
      title: '危险源',
      dataIndex: 'hazardSource',
      key: 'hazardSource',
      width: 150,
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
        };
        return <Tag color={colorMap[level]}>{level}</Tag>;
      },
    },
    {
      title: '风险值',
      dataIndex: 'riskScore',
      key: 'riskScore',
      width: 80,
      render: (score) => (
        <span className="font-semibold text-red-600">{score}</span>
      ),
    },
    {
      title: '可能发生的事故',
      dataIndex: 'possibleAccident',
      key: 'possibleAccident',
      width: 150,
      ellipsis: true,
    },
    {
      title: '管控措施',
      dataIndex: 'controlMeasures',
      key: 'controlMeasures',
      width: 200,
      ellipsis: true,
    },
    {
      title: '责任人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      width: 120,
    },
    {
      title: '上次检查',
      dataIndex: 'lastInspection',
      key: 'lastInspection',
      width: 110,
    },
    {
      title: '下次检查',
      dataIndex: 'nextInspection',
      key: 'nextInspection',
      width: 110,
      render: (date) => {
        const isOverdue = new Date(date) < new Date();
        return (
          <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
            {date}
            {isOverdue && <WarningOutlined className="ml-1" />}
          </span>
        );
      },
    },
    {
      title: '监管状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const colorMap = {
          '正常监管': 'green',
          '重点监管': 'red',
          '待整改': 'orange',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
  ];

  const filteredData = dataSource.filter(item => {
    const matchEnterprise = !selectedEnterprise || item.enterpriseName === selectedEnterprise;
    const matchSearch = !searchText || 
      item.riskPoint.includes(searchText) || 
      item.hazardSource.includes(searchText) ||
      item.responsiblePerson.includes(searchText);
    return matchEnterprise && matchSearch;
  });

  const statistics = {
    total: dataSource.length,
    major: dataSource.filter(item => item.riskLevel === '重大').length,
    significant: dataSource.filter(item => item.riskLevel === '较大').length,
    keySupervision: dataSource.filter(item => item.status === '重点监管').length,
    overdue: dataSource.filter(item => new Date(item.nextInspection) < new Date()).length,
  };

  const handleExport = () => {
    if (filteredData.length === 0) {
      message.warning('没有数据可导出');
      return;
    }
    
    // 模拟导出功能
    const csvContent = [
      // CSV 头部
      ['编号', '企业名称', '风险点', '危险源', '风险等级', '风险值', '可能发生的事故', '管控措施', '责任人', '联系电话', '上次检查', '下次检查', '监管状态'].join(','),
      // CSV 数据
      ...filteredData.map(item => [
        item.id,
        item.enterpriseName,
        item.riskPoint,
        item.hazardSource,
        item.riskLevel,
        item.riskScore,
        item.possibleAccident,
        item.controlMeasures,
        item.responsiblePerson,
        item.contactPhone,
        item.lastInspection,
        item.nextInspection,
        item.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `较大或重大危险源台账_${selectedEnterprise || '全部企业'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('导出成功');
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="危险源总数"
              value={statistics.total}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="重大危险源"
              value={statistics.major}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="较大危险源"
              value={statistics.significant}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="重点监管"
              value={statistics.keySupervision}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 提醒信息 */}
      {statistics.overdue > 0 && (
        <Alert
          message="检查提醒"
          description={`当前有 ${statistics.overdue} 个危险源已超过检查时间，请及时安排检查。`}
          type="warning"
          showIcon
          closable
        />
      )}

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">较大或重大危险源台账</h2>
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            导出台账
          </Button>
        </div>

        {/* 查询条件 */}
        <div className="mb-4">
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={8}>
              <Select
                placeholder="选择企业"
                value={selectedEnterprise}
                onChange={setSelectedEnterprise}
                allowClear
                className="w-full"
              >
                <Option value="">全部企业</Option>
                <Option value="某化工企业">某化工企业</Option>
                <Option value="某机械制造企业">某机械制造企业</Option>
                <Option value="某建筑企业">某建筑企业</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Search
                placeholder="搜索风险点、危险源或责任人"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={setSearchText}
                allowClear
              />
            </Col>
          </Row>
        </div>
        
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1800 }}
          size="small"
        />
      </Card>
    </div>
  );
}

export default MajorHazardRegistry;
