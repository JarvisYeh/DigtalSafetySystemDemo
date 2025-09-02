import React, { useState } from 'react';
import { 
  Card, 
  Select, 
  Button, 
  message,
  Alert,
  Row,
  Col,
  Descriptions,
  Space
} from 'antd';
import { 
  SaveOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Option } = Select;

function IdentificationMethodSettings() {
  const [jhaMethod, setJhaMethod] = useState('LEC');
  const [scaMethod, setScaMethod] = useState('LEC');
  const [loading, setLoading] = useState(false);

  const evaluationMethods = [
    {
      key: 'LEC',
      name: 'LEC (作业条件危险性分析评价法)',
      description: '通过可能性(L)、暴露频率(E)、后果严重性(C)三个因素评估',
      applicableScenarios: ['一般作业环境', '常规危险源辨识', '标准化作业流程']
    },
    {
      key: 'LS',
      name: 'LS (风险矩阵分析方法)',
      description: '通过可能性(L)和严重性(S)两个维度构建风险矩阵',
      applicableScenarios: ['定性风险评估', '快速风险筛查', '管理层决策支持']
    },
    {
      key: 'MES',
      name: 'MES (风险程度分析法)',
      description: '通过暴露程度(M)、事故可能性(E)、后果严重性(S)评估',
      applicableScenarios: ['复杂作业环境', '高风险作业', '精细化风险管控']
    }
  ];

  const handleSave = async () => {
    if (jhaMethod !== scaMethod) {
      message.error('作业危害分析和安全检查分析必须使用相同的辨识评价方法');
      return;
    }

    setLoading(true);
    try {
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('辨识方法设置保存成功');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = () => {
    if (jhaMethod !== scaMethod) {
      setScaMethod(jhaMethod);
      message.success('已同步安全检查分析评价方法');
    } else {
      message.info('两个方法已经一致，无需同步');
    }
  };

  const getMethodInfo = (methodKey) => {
    return evaluationMethods.find(method => method.key === methodKey);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">辨识方法设置</h2>
          <Space>
            <Button
              icon={<SyncOutlined />}
              onClick={handleSync}
              disabled={jhaMethod === scaMethod}
            >
              同步方法
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={handleSave}
            >
              保存设置
            </Button>
          </Space>
        </div>

        <Alert
          message="重要说明"
          description="作业危害分析评价表和安全检查分析评价表必须使用相同的辨识评价方法，以确保系统正常使用。修改后将影响所有新的危险源辨识工作。"
          type="info"
          showIcon
          className="mb-6"
        />

        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Card title="作业危害分析评价表" className="h-full">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    选择辨识评价方法：
                  </label>
                  <Select
                    value={jhaMethod}
                    onChange={setJhaMethod}
                    className="w-full"
                    size="large"
                  >
                    {evaluationMethods.map(method => (
                      <Option key={method.key} value={method.key}>
                        {method.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {jhaMethod && (
                  <div className="mt-4">
                    <Descriptions
                      title="方法详情"
                      column={1}
                      size="small"
                      bordered
                    >
                      <Descriptions.Item label="方法名称">
                        {getMethodInfo(jhaMethod)?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="方法描述">
                        {getMethodInfo(jhaMethod)?.description}
                      </Descriptions.Item>
                      <Descriptions.Item label="适用场景">
                        <ul className="list-disc list-inside">
                          {getMethodInfo(jhaMethod)?.applicableScenarios.map((scenario, index) => (
                            <li key={index}>{scenario}</li>
                          ))}
                        </ul>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="安全检查分析评价表" className="h-full">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    选择辨识评价方法：
                  </label>
                  <Select
                    value={scaMethod}
                    onChange={setScaMethod}
                    className="w-full"
                    size="large"
                  >
                    {evaluationMethods.map(method => (
                      <Option key={method.key} value={method.key}>
                        {method.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {scaMethod && (
                  <div className="mt-4">
                    <Descriptions
                      title="方法详情"
                      column={1}
                      size="small"
                      bordered
                    >
                      <Descriptions.Item label="方法名称">
                        {getMethodInfo(scaMethod)?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="方法描述">
                        {getMethodInfo(scaMethod)?.description}
                      </Descriptions.Item>
                      <Descriptions.Item label="适用场景">
                        <ul className="list-disc list-inside">
                          {getMethodInfo(scaMethod)?.applicableScenarios.map((scenario, index) => (
                            <li key={index}>{scenario}</li>
                          ))}
                        </ul>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* 一致性检查 */}
        <div className="mt-6">
          {jhaMethod === scaMethod ? (
            <Alert
              message="方法一致性检查通过"
              description="作业危害分析和安全检查分析使用相同的评价方法，系统可以正常使用。"
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message="方法不一致警告"
              description="作业危害分析和安全检查分析使用了不同的评价方法，这可能导致系统功能异常。请点击"同步方法"按钮或手动调整为相同方法。"
              type="warning"
              showIcon
              action={
                <Button size="small" type="primary" onClick={handleSync}>
                  立即同步
                </Button>
              }
            />
          )}
        </div>

        {/* 使用说明 */}
        <Card title="使用说明" className="mt-6">
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong>1. 方法选择原则：</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>LEC方法：适用于大多数企业的标准化风险评估</li>
                <li>LS方法：适用于需要快速评估和决策的场景</li>
                <li>MES方法：适用于高风险行业和复杂作业环境</li>
              </ul>
            </div>
            <div>
              <strong>2. 注意事项：</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>两个评价表必须使用相同的方法，否则系统无法正常工作</li>
                <li>更改方法后，建议重新进行危险源辨识和风险评估</li>
                <li>如有疑问，请联系系统管理员</li>
              </ul>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}

export default IdentificationMethodSettings;
