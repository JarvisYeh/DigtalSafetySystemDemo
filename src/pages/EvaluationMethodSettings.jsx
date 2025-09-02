import React, { useState } from 'react';
import { 
  Card, 
  Radio, 
  Button, 
  message,
  Descriptions,
  Alert,
  Space,
  Modal
} from 'antd';
import { 
  SaveOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

function EvaluationMethodSettings() {
  const [selectedMethod, setSelectedMethod] = useState('LEC');
  const [loading, setLoading] = useState(false);

  const evaluationMethods = [
    {
      key: 'LEC',
      name: 'LEC (作业条件危险性分析评价法)',
      description: '通过可能性(L)、暴露频率(E)、后果严重性(C)三个因素的乘积来评估风险等级',
      formula: '风险值 = L × E × C',
      advantages: [
        '简单易用，便于理解和操作',
        '适用于大多数作业场所的风险评估',
        '能够量化风险等级，便于比较'
      ],
      riskLevels: [
        { range: '≥20', level: '重大风险', color: '#ff4d4f' },
        { range: '15-19', level: '较大风险', color: '#faad14' },
        { range: '5-14', level: '一般风险', color: '#52c41a' },
        { range: '<5', level: '低风险', color: '#1890ff' }
      ]
    },
    {
      key: 'LS',
      name: 'LS (风险矩阵分析方法)',
      description: '通过可能性(L)和严重性(S)两个维度构建风险矩阵来评估风险等级',
      formula: '风险等级 = 可能性等级 × 严重性等级',
      advantages: [
        '直观的矩阵形式，易于理解',
        '适用于定性风险评估',
        '便于风险的可视化展示'
      ],
      riskLevels: [
        { range: '16-25', level: '重大风险', color: '#ff4d4f' },
        { range: '11-15', level: '较大风险', color: '#faad14' },
        { range: '6-10', level: '一般风险', color: '#52c41a' },
        { range: '1-5', level: '低风险', color: '#1890ff' }
      ]
    },
    {
      key: 'MES',
      name: 'MES (风险程度分析法)',
      description: '通过人员暴露于危险环境的频繁程度(M)、事故发生的可能性(E)、发生事故可能造成的后果(S)来评估',
      formula: '风险值 = M × E × S',
      advantages: [
        '考虑因素全面，评估结果准确',
        '适用于复杂作业环境的风险评估',
        '能够细化风险控制措施'
      ],
      riskLevels: [
        { range: '≥70', level: '重大风险', color: '#ff4d4f' },
        { range: '20-69', level: '较大风险', color: '#faad14' },
        { range: '5-19', level: '一般风险', color: '#52c41a' },
        { range: '<5', level: '低风险', color: '#1890ff' }
      ]
    }
  ];

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('评价方法设置保存成功');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const showMethodDetail = (method) => {
    Modal.info({
      title: method.name,
      width: 700,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">方法描述：</h4>
            <p className="text-gray-600">{method.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">计算公式：</h4>
            <div className="bg-blue-50 p-3 rounded font-mono text-blue-700">
              {method.formula}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">方法优势：</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {method.advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">风险等级划分：</h4>
            <div className="space-y-2">
              {method.riskLevels.map((level, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: level.color }}
                  ></div>
                  <span className="font-medium">{level.level}</span>
                  <span className="text-gray-500">({level.range})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    });
  };

  const currentMethod = evaluationMethods.find(method => method.key === selectedMethod);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">评价方法设置</h2>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={handleSave}
          >
            保存设置
          </Button>
        </div>

        <Alert
          message="重要提示"
          description="评价方法的更改将影响所有新的风险评估，已有的评估结果不会自动更新。建议在系统初始化时设置，后续尽量不要更改。"
          type="warning"
          showIcon
          className="mb-6"
        />

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">选择评价方法：</h3>
            <Radio.Group 
              value={selectedMethod} 
              onChange={handleMethodChange}
              className="w-full"
            >
              <div className="space-y-4">
                {evaluationMethods.map(method => (
                  <div key={method.key} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Radio value={method.key} className="mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{method.name}</h4>
                          <p className="text-gray-600 mt-1">{method.description}</p>
                          <div className="mt-2 text-sm text-blue-600">
                            计算公式: {method.formula}
                          </div>
                        </div>
                      </div>
                      <Button
                        type="link"
                        icon={<InfoCircleOutlined />}
                        onClick={() => showMethodDetail(method)}
                      >
                        详细信息
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Radio.Group>
          </div>

          {currentMethod && (
            <Card title="当前选择方法详情" className="bg-blue-50">
              <Descriptions column={1} bordered>
                <Descriptions.Item label="方法名称">
                  {currentMethod.name}
                </Descriptions.Item>
                <Descriptions.Item label="计算公式">
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {currentMethod.formula}
                  </code>
                </Descriptions.Item>
                <Descriptions.Item label="风险等级划分">
                  <div className="space-y-2">
                    {currentMethod.riskLevels.map((level, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: level.color }}
                        ></div>
                        <span className="font-medium">{level.level}</span>
                        <span className="text-gray-500">({level.range})</span>
                      </div>
                    ))}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="适用场景">
                  <ul className="list-disc list-inside space-y-1">
                    {currentMethod.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
}

export default EvaluationMethodSettings;
