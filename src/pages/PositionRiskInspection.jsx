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
  EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

function PositionRiskInspection() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'PRI001',
      enterpriseName: '某化工企业',
      position: '反应釜操作工',
      workStep: '开启反应釜',
      hazardSource: '高温高压',
      inspector: '张三',
      inspectionMethod: '目视检查',
      inspectionCycle: '每天',
      status: '已生成',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'PRI002',
      enterpriseName: '某机械制造企业',
      position: '焊接工',
      workStep: '电弧焊接',
      hazardSource: '电弧辐射',
      inspector: '李四',
      inspectionMethod: '测试检查',
      inspectionCycle: '每周',
      status: '已生成',
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
      title: '岗位名称',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '作业步骤',
      dataIndex: 'workStep',
      key: 'workStep',
      width: 120,
    },
    {
      title: '危险源',
      dataIndex: 'hazardSource',
      key: 'hazardSource',
      width: 120,
    },
    {
      title: '排查人',
      dataIndex: 'inspector',
      key: 'inspector',
      width: 100,
    },
    {
      title: '排查方法',
      dataIndex: 'inspectionMethod',
      key: 'inspectionMethod',
      width: 100,
      render: (method) => (
        <Tag color={method === '目视检查' ? 'blue' : 'green'}>{method}</Tag>
      ),
    },
    {
      title: '排查周期',
      dataIndex: 'inspectionCycle',
      key: 'inspectionCycle',
      width: 100,
      render: (cycle) => {
        const colorMap = {
          '每天': 'red',
          '每周': 'orange',
          '每月': 'green',
        };
        return <Tag color={colorMap[cycle]}>{cycle}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已生成' ? 'green' : 'orange'}>{status}</Tag>
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
      title: '岗位风险管控排查表详情',
      width: 700,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-blue-600 mb-4">
              岗位风险管控排查表
            </h3>
            <Row gutter={16}>
              <Col span={12}>
                <div><strong>编号：</strong>{record.id}</div>
              </Col>
              <Col span={12}>
                <div><strong>企业名称：</strong>{record.enterpriseName}</div>
              </Col>
            </Row>
            <Row gutter={16} className="mt-3">
              <Col span={12}>
                <div><strong>岗位名称：</strong>{record.position}</div>
              </Col>
              <Col span={12}>
                <div><strong>作业步骤：</strong>{record.workStep}</div>
              </Col>
            </Row>
          </div>
          
          <div className="space-y-3">
            <Row gutter={16}>
              <Col span={12}>
                <div><strong>危险源：</strong>{record.hazardSource}</div>
              </Col>
              <Col span={12}>
                <div><strong>排查人：</strong>{record.inspector}</div>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <strong>排查方法：</strong>
                  <Tag color={record.inspectionMethod === '目视检查' ? 'blue' : 'green'} className="ml-2">
                    {record.inspectionMethod}
                  </Tag>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <strong>排查周期：</strong>
                  <Tag color={record.inspectionCycle === '每天' ? 'red' : record.inspectionCycle === '每周' ? 'orange' : 'green'} className="ml-2">
                    {record.inspectionCycle}
                  </Tag>
                </div>
              </Col>
            </Row>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
              <strong>排查要点：</strong>
              <ul className="mt-2 ml-4 list-disc">
                <li>检查设备运行状态是否正常</li>
                <li>确认安全防护设施是否完好</li>
                <li>验证操作人员是否按规程作业</li>
                <li>核实应急设备是否可用</li>
              </ul>
            </div>
          </div>
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
          <h2 className="text-xl font-semibold">岗位风险管控排查表</h2>
          <Space>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出
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
        title="编辑岗位风险管控排查表"
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
              <Form.Item label="岗位名称">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="workStep"
                label="作业步骤"
                rules={[{ required: true, message: '请输入作业步骤' }]}
              >
                <Input placeholder="请输入作业步骤" />
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
                <Input placeholder="从安全风险分级管控清单中调取" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="inspector"
                label="排查人"
                rules={[{ required: true, message: '请输入排查人' }]}
              >
                <Input placeholder="请输入排查人姓名" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inspectionMethod"
                label="排查方法"
                rules={[{ required: true, message: '请选择排查方法' }]}
              >
                <Select placeholder="请选择排查方法">
                  <Option value="目视检查">目视检查</Option>
                  <Option value="测试检查">测试检查</Option>
                  <Option value="仪器检测">仪器检测</Option>
                  <Option value="综合检查">综合检查</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="inspectionCycle"
                label="排查周期"
                rules={[{ required: true, message: '请选择排查周期' }]}
              >
                <Select placeholder="请选择排查周期">
                  <Option value="每天">每天</Option>
                  <Option value="每周">每周</Option>
                  <Option value="每月">每月</Option>
                  <Option value="每季度">每季度</Option>
                  <Option value="每年">每年</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default PositionRiskInspection;
