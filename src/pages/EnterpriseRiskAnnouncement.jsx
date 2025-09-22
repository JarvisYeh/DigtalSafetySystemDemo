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
  Upload,
  Row,
  Col,
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  UploadOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Option } = Select;

function EnterpriseRiskAnnouncement() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'ERA001',
      enterpriseName: '某化工企业',
      mapName: '生产区域风险四色图',
      mapUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600',
      riskPoints: ['反应釜区域', '储罐区', '装卸区'],
      status: '已发布',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      id: 'ERA002',
      enterpriseName: '某机械制造企业',
      mapName: '车间风险分布图',
      mapUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600',
      riskPoints: ['焊接区', '机加工区', '装配区'],
      status: '已发布',
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
      width: 200,
    },
    {
      title: '四色图名称',
      dataIndex: 'mapName',
      key: 'mapName',
      width: 200,
    },
    {
      title: '风险点数量',
      dataIndex: 'riskPoints',
      key: 'riskPoints',
      width: 120,
      render: (points) => (
        <Tag color="blue">{points.length} 个</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已发布' ? 'green' : 'orange'}>{status}</Tag>
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
      width: 300,
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
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          >
            下载
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleView = (record) => {
    setPreviewImage(record.mapUrl);
    setPreviewVisible(true);
  };

  const handleDownload = (record) => {
    // 模拟下载
    const link = document.createElement('a');
    link.href = record.mapUrl;
    link.download = `${record.mapName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('下载成功');
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
          id: `ERA${String(dataSource.length + 1).padStart(3, '0')}`,
          ...values,
          mapUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600',
          riskPoints: ['新风险点1', '新风险点2'],
          status: '已发布',
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

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    listType: 'picture-card',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件!');
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('图片大小不能超过 10MB!');
      }
      return isImage && isLt10M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('上传成功');
      } else if (info.file.status === 'error') {
        message.error('上传失败');
      }
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">企业风险公告</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加
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
        title={editingRecord ? '编辑企业风险公告' : '添加企业风险公告'}
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
                name="id"
                label="编号"
                rules={[{ required: true, message: '请输入编号' }]}
              >
                <Input placeholder="请输入编号" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="mapName"
            label="四色图名称"
            rules={[{ required: true, message: '请输入四色图名称' }]}
          >
            <Input placeholder="请输入四色图名称" />
          </Form.Item>

          <Form.Item
            label="上传企业平面图"
            rules={[{ required: true, message: '请上传企业平面图' }]}
          >
            <Upload {...uploadProps}>
              <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer">
                <UploadOutlined className="text-2xl text-gray-400 mb-2" />
                <span className="text-gray-500">点击上传平面图</span>
              </div>
            </Upload>
            <div className="mt-2 text-sm text-gray-500">
              支持 JPG、PNG 格式，文件大小不超过 10MB
            </div>
          </Form.Item>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">风险四色图生成步骤：</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>上传企业平面图后，在图上标记风险区域</li>
              <li>为每个风险区域选择对应的风险点</li>
              <li>系统将根据风险等级自动生成四色标识：
                <div className="mt-2 flex space-x-4">
                  <span className="inline-flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-1"></div>
                    重大风险
                  </span>
                  <span className="inline-flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded mr-1"></div>
                    较大风险
                  </span>
                  <span className="inline-flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-1"></div>
                    一般风险
                  </span>
                  <span className="inline-flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-1"></div>
                    低风险
                  </span>
                </div>
              </li>
              <li>点击"生成风险四色图"完成制作</li>
            </ol>
          </div>
        </Form>
      </Modal>

      <Modal
        open={previewVisible}
        title="风险四色图预览"
        footer={[
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            下载
          </Button>,
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>
        ]}
        onCancel={() => setPreviewVisible(false)}
        width={900}
      >
        <div className="text-center">
          <Image
            src={previewImage}
            alt="风险四色图"
            style={{ maxWidth: '100%', maxHeight: '600px' }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default EnterpriseRiskAnnouncement;
