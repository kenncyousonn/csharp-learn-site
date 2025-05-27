import React, { useState } from 'react';

export default function GradeCheckerLesson() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const checkCode = () => {
    const mustHave = [
      'Console.ReadLine()',
      'if (score >= 90 && score <= 100)',
      'grade = "S"',
      'Console.WriteLine($"成绩为'
    ];

    const missing = mustHave.filter(req => !code.includes(req));
    if (missing.length === 0) {
      setResult('✅ 恭喜！你的代码逻辑正确，通过练习。');
    } else {
      setResult(`❌ 缺少关键代码：${missing.join(', ')}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧪 成绩等级判断练习</h1>
      <p>请写出一个程序，根据输入的 0~100 分数判断等级：</p>
      <ul>
        <li>90~100 → S</li>
        <li>80~89 → A</li>
        <li>70~79 → B</li>
        <li>60~69 → C</li>
        <li>&lt;60 → 不及格</li>
      </ul>

      <textarea
        rows={18}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="请在此输入你的 C# 代码..."
        style={{ fontFamily: 'monospace', fontSize: '14px' }}
      />

      <br /><br />
      <button onClick={checkCode} style={{ padding: '8px 20px', fontSize: '16px' }}>
        检查代码
      </button>

      <div style={{ marginTop: '20px', fontWeight: 'bold', color: result.startsWith('✅') ? 'green' : 'red' }}>
        {result}
      </div>
    </div>
  );
}
