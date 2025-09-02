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
  Popconfirm,
  Tag,
  Tabs,
  Checkbox,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExportOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

function HazardIdentification() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'HI001',
      enterpriseName: '某化工企业',
      riskPoint: '反应釜区域',
      hazardSource: '高温高压反应',
      hazardType: '物理性危害',
      possibleAccident: '爆炸、烫伤',
      riskLevel: '重大',
      status: '已辨识',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'HI002',
      enterpriseName: '某机械制造企业',
      riskPoint: '焊接作业区',
      hazardSource: '电弧焊接',
      hazardType: '物理性危害',
      possibleAccident: '触电、火灾',
      riskLevel: '较大',
      status: '待评估',
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
      title: '危害类型',
      dataIndex: 'hazardType',
      key: 'hazardType',
      width: 120,
    },
    {
      title: '可能发生的事故',
      dataIndex: 'possibleAccident',
      key: 'possibleAccident',
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
        <Tag color={status === '已辨识' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个危险源吗？"
            onConfirm={() => handleDelete(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
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

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter(item => item.key !== key));
    message.success('删除成功');
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的记录');
      return;
    }
    setDataSource(dataSource.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    message.success('批量删除成功');
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  const handleGenerateRiskList = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要生成清单的记录');
      return;
    }
    message.success('生成安全风险分级清单成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingRecord) {
        setDataSource(dataSource.map(item => 
          item.key === editingRecord.key 
            ? { ...item, ...values }
            : item
        ));
        message.success('编辑成功');
      } else {
        const newRecord = {
          key: Date.now().toString(),
          id: `HI${String(dataSource.length + 1).padStart(3, '0')}`,
          ...values,
          status: '待评估',
          createTime: new Date().toISOString().split('T')[0],
        };
        setDataSource([...dataSource, newRecord]);
        message.success('添加成功');
      }
      
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
          <h2 className="text-xl font-semibold">危险源辨识</h2>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              添加
            </Button>
            <Button
              danger
              onClick={handleBatchDelete}
              disabled={selectedRowKeys.length === 0}
            >
              批量删除
            </Button>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出
            </Button>
            <Button
              type="primary"
              icon={<UnorderedListOutlined />}
              onClick={handleGenerateRiskList}
              disabled={selectedRowKeys.length === 0}
            >
              生成安全分级清单
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
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑危险源' : '添加危险源'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            hazardType: '物理性危害',
            riskLevel: '一般',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="enterpriseName"
                label="企业名称"
                rules={[{ required: true, message: '请选择企业名称' }]}
              >
                <Select placeholder="请选择企业名称">
                  <Option value="某化工企业">某化工企业</Option>
                  <Option value="某机械制造企业">某机械制造企业</Option>
                  <Option value="某建筑企业">某建筑企业</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="riskPoint"
                label="风险点"
                rules={[{ required: true, message: '请输入风险点' }]}
              >
                <Input placeholder="请输入风险点" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hazardSource"
                label="危险源"
                rules={[{ required: true, message: '请输入危险源' }]}
              >
                <Input placeholder="请输入危险源" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hazardType"
                label="危害类型"
                rules={[{ required: true, message: '请选择危害类型' }]}
              >
                <Select placeholder="请选择危害类型">
                  <Option value="物理性危害">物理性危害</Option>
                  <Option value="化学性危害">化学性危害</Option>
                  <Option value="生物性危害">生物性危害</Option>
                  <Option value="心理性危害">心理性危害</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="possibleAccident"
            label="可能发生的事故"
            rules={[{ required: true, message: '请输入可能发生的事故' }]}
          >
            <TextArea rows={3} placeholder="请输入可能发生的事故" />
          </Form.Item>

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

          <Tabs defaultActiveKey="1">
            <TabPane tab="作业危害分析" key="1">
              <div className="space-y-4">
                <h4>选择作业危害分析项目：</h4>
                <Checkbox.Group>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="高温作业">高温作业</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="高压作业">高压作业</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="有毒有害">有毒有害</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="易燃易爆">易燃易爆</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="机械伤害">机械伤害</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="电气伤害">电气伤害</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </TabPane>
            <TabPane tab="安全检查分析" key="2">
              <div className="space-y-4">
                <h4>选择安全检查分析项目：</h4>
                <Checkbox.Group>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="设备检查">设备检查</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="环境检查">环境检查</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="人员检查">人员检查</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="管理检查">管理检查</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="应急检查">应急检查</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="培训检查">培训检查</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
}

export default HazardIdentification;
