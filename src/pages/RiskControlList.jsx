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
  Row,
  Col
} from 'antd';
import { 
  EditOutlined, 
  ExportOutlined,
  IdcardOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

function RiskControlList() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'RCL001',
      enterpriseName: '某化工企业',
      riskPoint: '反应釜区域',
      hazardSource: '高温高压反应',
      riskLevel: '重大',
      controlMeasures: '安装温度压力监控系统，设置安全阀，定期检查维护',
      controlLevel: '企业级',
      responsiblePerson: '张三',
      status: '已制定',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'RCL002',
      enterpriseName: '某机械制造企业',
      riskPoint: '焊接作业区',
      hazardSource: '电弧焊接',
      riskLevel: '较大',
      controlMeasures: '配备防护用品，设置通风设备，定期安全培训',
      controlLevel: '车间级',
      responsiblePerson: '李四',
      status: '已制定',
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
      title: '管控层级',
      dataIndex: 'controlLevel',
      key: 'controlLevel',
      width: 100,
      render: (level) => {
        const colorMap = {
          '企业级': 'red',
          '车间级': 'orange',
          '班组级': 'green',
          '岗位级': 'blue',
        };
        return <Tag color={colorMap[level]}>{level}</Tag>;
      },
    },
    {
      title: '责任人',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已制定' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
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
      title: '风险管控清单详情',
      width: 700,
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
              <div>
                <strong>风险等级：</strong>
                <Tag color={record.riskLevel === '重大' ? 'red' : record.riskLevel === '较大' ? 'orange' : 'green'} className="ml-2">
                  {record.riskLevel}
                </Tag>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <strong>管控层级：</strong>
                <Tag color={record.controlLevel === '企业级' ? 'red' : record.controlLevel === '车间级' ? 'orange' : 'green'} className="ml-2">
                  {record.controlLevel}
                </Tag>
              </div>
            </Col>
          </Row>
          <div>
            <strong>管控措施：</strong>
            <div className="mt-2 p-3 bg-gray-50 rounded">{record.controlMeasures}</div>
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <div><strong>责任人：</strong>{record.responsiblePerson}</div>
            </Col>
            <Col span={12}>
              <div><strong>创建时间：</strong>{record.createTime}</div>
            </Col>
          </Row>
        </div>
      ),
    });
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  const handleGenerateRiskCard = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要生成告知卡的记录');
      return;
    }
    message.success('生成岗位风险告知卡成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDataSource(dataSource.map(item => 
        item.key === editingRecord.key 
          ? { ...item, ...values }
          : item
      ));
      
      message.success('编辑成功');
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
          <h2 className="text-xl font-semibold">安全风险分级管控清单</h2>
          <Space>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出
            </Button>
            <Button
              type="primary"
              icon={<IdcardOutlined />}
              onClick={handleGenerateRiskCard}
              disabled={selectedRowKeys.length === 0}
            >
              生成岗位风险告知卡
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
          scroll={{ x: 1300 }}
        />
      </Card>

      <Modal
        title="编辑管控清单"
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
              <Form.Item
                name="id"
                label="编号"
                rules={[{ required: true, message: '请输入编号' }]}
              >
                <Input placeholder="请输入编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="企业名称">
                <Input disabled />
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

          <Form.Item
            name="controlMeasures"
            label="管控措施"
            rules={[{ required: true, message: '请输入管控措施' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="请输入管控措施，可以修改为适合的管控措施"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="responsiblePerson"
                label="管控责任人"
                rules={[{ required: true, message: '请输入责任人' }]}
              >
                <Input placeholder="请输入责任人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="管控层级">
                <Select disabled>
                  <Option value="企业级">企业级</Option>
                  <Option value="车间级">车间级</Option>
                  <Option value="班组级">班组级</Option>
                  <Option value="岗位级">岗位级</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default RiskControlList;
