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
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined 
} from '@ant-design/icons';

const { Option } = Select;

function RiskPointDivision() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'RP001',
      enterpriseName: '某化工企业',
      riskPointName: '反应釜区域',
      location: '生产车间A区',
      riskLevel: '重大',
      status: '已评估',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'RP002',
      enterpriseName: '某机械制造企业',
      riskPointName: '焊接作业区',
      location: '生产车间B区',
      riskLevel: '较大',
      status: '待评估',
      createTime: '2024-01-16',
    },
    {
      key: '3',
      id: 'RP003',
      enterpriseName: '某建筑企业',
      riskPointName: '高空作业平台',
      location: '施工现场C区',
      riskLevel: '一般',
      status: '已评估',
      createTime: '2024-01-17',
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
      width: 200,
    },
    {
      title: '风险点名称',
      dataIndex: 'riskPointName',
      key: 'riskPointName',
      width: 200,
    },
    {
      title: '详细位置',
      dataIndex: 'location',
      key: 'location',
      width: 200,
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 120,
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
      width: 200,
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
            title="确定要删除这个风险点吗？"
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

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingRecord) {
        // 编辑
        setDataSource(dataSource.map(item => 
          item.key === editingRecord.key 
            ? { ...item, ...values }
            : item
        ));
        message.success('编辑成功');
      } else {
        // 新增
        const newRecord = {
          key: Date.now().toString(),
          id: `RP${String(dataSource.length + 1).padStart(3, '0')}`,
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
          <h2 className="text-xl font-semibold">风险点划分</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加风险点
          </Button>
        </div>
        
        <Table
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
        title={editingRecord ? '编辑风险点' : '添加风险点'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            riskLevel: '一般',
          }}
        >
          <Form.Item
            name="enterpriseName"
            label="企业名称"
            rules={[{ required: true, message: '请输入企业名称' }]}
          >
            <Select
              placeholder="请选择企业名称"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="某化工企业">某化工企业</Option>
              <Option value="某机械制造企业">某机械制造企业</Option>
              <Option value="某建筑企业">某建筑企业</Option>
              <Option value="某电力企业">某电力企业</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="riskPointName"
            label="风险点名称"
            rules={[{ required: true, message: '请输入风险点名称' }]}
          >
            <Input placeholder="请输入风险点名称" />
          </Form.Item>

          <Form.Item
            name="location"
            label="详细位置"
            rules={[{ required: true, message: '请输入详细位置' }]}
          >
            <Input placeholder="请输入详细位置" />
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
        </Form>
      </Modal>
    </div>
  );
}

export default RiskPointDivision;
