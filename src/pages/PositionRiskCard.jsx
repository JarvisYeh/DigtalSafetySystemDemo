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
  Col,
  Upload
} from 'antd';
import { 
  EditOutlined, 
  ExportOutlined,
  AuditOutlined,
  EyeOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

function PositionRiskCard() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'PRC001',
      enterpriseName: '某化工企业',
      position: '反应釜操作工',
      workScene: '反应釜区域操作',
      hazardFactors: '高温、高压、有毒气体',
      controlMeasures: '穿戴防护用品，定期检查设备，遵守操作规程',
      emergencyMeasures: '发生泄漏立即撤离，启动应急预案，通知相关人员',
      safetySign: '禁止烟火、必须戴防护用品',
      status: '已生成',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'PRC002',
      enterpriseName: '某机械制造企业',
      position: '焊接工',
      workScene: '焊接作业区操作',
      hazardFactors: '电弧辐射、有害气体、火花飞溅',
      controlMeasures: '佩戴防护面罩，确保通风良好，清理周围可燃物',
      emergencyMeasures: '发生火灾立即断电，使用灭火器扑救，疏散人员',
      safetySign: '必须戴防护用品、注意通风',
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
      title: '作业场景',
      dataIndex: 'workScene',
      key: 'workScene',
      width: 150,
    },
    {
      title: '危险因素',
      dataIndex: 'hazardFactors',
      key: 'hazardFactors',
      width: 200,
      ellipsis: true,
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
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
      title: '岗位风险告知卡详情',
      width: 800,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-red-600 mb-4">
              岗位风险告知卡
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
                <div><strong>作业场景：</strong>{record.workScene}</div>
              </Col>
            </Row>
          </div>
          
          <div className="space-y-3">
            <div>
              <strong className="text-red-600">危险因素：</strong>
              <div className="mt-2 p-3 bg-red-50 rounded border-l-4 border-red-400">
                {record.hazardFactors}
              </div>
            </div>
            
            <div>
              <strong className="text-blue-600">管控措施：</strong>
              <div className="mt-2 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                {record.controlMeasures}
              </div>
            </div>
            
            <div>
              <strong className="text-orange-600">应急措施：</strong>
              <div className="mt-2 p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                {record.emergencyMeasures}
              </div>
            </div>
            
            <div>
              <strong className="text-green-600">安全标志：</strong>
              <div className="mt-2 p-3 bg-green-50 rounded border-l-4 border-green-400">
                {record.safetySign}
              </div>
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

  const handleGenerateInspectionTable = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要生成排查表的记录');
      return;
    }
    message.success('生成岗位风险管控排查表成功');
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

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">岗位风险告知卡</h2>
          <Space>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              导出
            </Button>
            <Button
              type="primary"
              icon={<AuditOutlined />}
              onClick={handleGenerateInspectionTable}
              disabled={selectedRowKeys.length === 0}
            >
              生成岗位风险管控排查表
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
        title="编辑岗位风险告知卡"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={loading}
        width={800}
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
              <Form.Item
                name="position"
                label="岗位名称"
                rules={[{ required: true, message: '请输入岗位名称' }]}
              >
                <Input placeholder="请输入岗位名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="workScene"
                label="作业场景"
                rules={[{ required: true, message: '请输入作业场景' }]}
              >
                <Input placeholder="请输入作业场景" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="hazardFactors"
            label="危险因素"
            rules={[{ required: true, message: '请输入危险因素' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入危险因素，可以从安全风险分级管控清单中调取"
            />
          </Form.Item>

          <Form.Item
            name="controlMeasures"
            label="管控措施"
            rules={[{ required: true, message: '请输入管控措施' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入管控措施，可以从安全风险分级管控清单中调取"
            />
          </Form.Item>

          <Form.Item
            name="emergencyMeasures"
            label="应急措施"
            rules={[{ required: true, message: '请输入应急措施' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入应急措施，可以从安全风险分级管控清单中调取"
            />
          </Form.Item>

          <Form.Item
            name="safetySign"
            label="安全标志"
            rules={[{ required: true, message: '请输入安全标志' }]}
          >
            <Input placeholder="请输入安全标志要求" />
          </Form.Item>

          <Form.Item label="上传安全标志图片">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PositionRiskCard;
