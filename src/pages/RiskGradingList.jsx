import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  message,
  Tag,
  InputNumber,
  Row,
  Col
} from 'antd';
import { 
  EditOutlined, 
  ExportOutlined,
  UnorderedListOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;

function RiskGradingList() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'RGL001',
      enterpriseName: '某化工企业',
      riskPoint: '反应釜区域',
      hazardSource: '高温高压反应',
      riskScore: 18,
      riskLevel: '重大',
      riskColor: '#ff4d4f',
      status: '已评估',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'RGL002',
      enterpriseName: '某机械制造企业',
      riskPoint: '焊接作业区',
      hazardSource: '电弧焊接',
      riskScore: 12,
      riskLevel: '较大',
      riskColor: '#faad14',
      status: '已评估',
      createTime: '2024-01-16',
    },
  ]);

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      key: 'enterpriseName',
      width: 150,
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
      title: '风险值',
      dataIndex: 'riskScore',
      key: 'riskScore',
      width: 100,
      render: (score) => (
        <span className="font-semibold">{score}</span>
      ),
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 120,
      render: (level, record) => (
        <Tag color={record.riskColor}>{level}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已评估' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleView = (record) => {
    Modal.info({
      title: '风险分级清单详情',
      width: 600,
      content: (
        <div className="space-y-4 mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <div><strong>编号：</strong>{record.id}</div>
            </Col>
            <Col span={12}>
              <div><strong>企业名称：</strong>{record.enterpriseName}</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div><strong>风险点：</strong>{record.riskPoint}</div>
            </Col>
            <Col span={12}>
              <div><strong>危险源：</strong>{record.hazardSource}</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div><strong>风险值：</strong>{record.riskScore}</div>
            </Col>
            <Col span={12}>
              <div>
                <strong>风险等级：</strong>
                <Tag color={record.riskColor} className="ml-2">{record.riskLevel}</Tag>
              </div>
            </Col>
          </Row>
        </div>
      ),
    });
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      likelihoodScore: 3,
      exposureScore: 3,
      consequenceScore: 2,
    });
    setIsModalVisible(true);
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  const handleGenerateControlList = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要生成管控清单的记录');
      return;
    }
    message.success('生成安全风险分级管控清单成功');
  };

  const calculateRiskScore = (likelihood, exposure, consequence) => {
    return likelihood * exposure * consequence;
  };

  const getRiskLevel = (score) => {
    if (score >= 15) return { level: '重大', color: '#ff4d4f' };
    if (score >= 10) return { level: '较大', color: '#faad14' };
    if (score >= 5) return { level: '一般', color: '#52c41a' };
    return { level: '低', color: '#1890ff' };
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const riskScore = calculateRiskScore(
        values.likelihoodScore,
        values.exposureScore,
        values.consequenceScore
      );
      
      const { level, color } = getRiskLevel(riskScore);
      
      const updatedRecord = {
        ...editingRecord,
        ...values,
        riskScore,
        riskLevel: level,
        riskColor: color,
        status: '已评估',
      };
      
      setDataSource(dataSource.map(item => 
        item.key === editingRecord.key ? updatedRecord : item
      ));
      
      message.success('评估完成');
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

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">安全风险分级清单</h2>
          <Space>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出
            </Button>
            <Button
              type="primary"
              icon={<UnorderedListOutlined />}
              onClick={handleGenerateControlList}
              disabled={selectedRowKeys.length === 0}
            >
              生成安全风险分级管控清单
            </Button>
          </Space>
        </div>
        
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title="风险评估"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="企业名称">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="id"
                label="编号"
                rules={[{ required: true, message: '请输入编号' }]}
              >
                <Input placeholder="请输入编号" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="风险点">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="危险源">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="mb-4 font-semibold">风险评估 (LEC评价法)</h4>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="likelihoodScore"
                  label="可能性 (L)"
                  rules={[{ required: true, message: '请输入可能性分值' }]}
                >
                  <InputNumber
                    min={1}
                    max={6}
                    placeholder="1-6分"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="exposureScore"
                  label="暴露频率 (E)"
                  rules={[{ required: true, message: '请输入暴露频率分值' }]}
                >
                  <InputNumber
                    min={1}
                    max={6}
                    placeholder="1-6分"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="consequenceScore"
                  label="后果严重性 (C)"
                  rules={[{ required: true, message: '请输入后果严重性分值' }]}
                >
                  <InputNumber
                    min={1}
                    max={6}
                    placeholder="1-6分"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>
            
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <div className="text-sm text-gray-600 mb-2">
                <strong>评分说明：</strong>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <div>• 可能性(L)：1-极不可能，2-很不可能，3-可能，4-很可能，5-极可能，6-必然</div>
                <div>• 暴露频率(E)：1-很少，2-偶尔，3-有时，4-经常，5-连续，6-持续</div>
                <div>• 后果严重性(C)：1-轻微，2-一般，3-严重，4-重大，5-灾难性，6-毁灭性</div>
              </div>
            </div>
          </div>

          <Form.Item dependencies={['likelihoodScore', 'exposureScore', 'consequenceScore']}>
            {({ getFieldValue }) => {
              const l = getFieldValue('likelihoodScore') || 0;
              const e = getFieldValue('exposureScore') || 0;
              const c = getFieldValue('consequenceScore') || 0;
              const score = l * e * c;
              const { level, color } = getRiskLevel(score);
              
              return (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">计算结果：</span>
                    <div className="flex items-center space-x-4">
                      <span>风险值: <strong>{score}</strong></span>
                      <Tag color={color} className="text-sm">{level}</Tag>
                    </div>
                  </div>
                </div>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default RiskGradingList;
