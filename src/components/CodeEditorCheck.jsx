import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function CodeEditorCheck({ expectedOutput }) {
  const [code, setCode] = useState(`using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello World!");
    }
}`);
  const [result, setResult] = useState('');
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    setResult('⏳ 正在运行中...');

    const data = {
      script: code,
      language: "csharp",
      versionIndex: "4",
      clientId: "d10c6b6c31ee7eb7eafe639b543f0ecf",
      clientSecret: "f47e425e1c2071d68b9c3869fdffcc440861b1c4b49c0af9652bd6398cd4bf3"
    };

    try {
      const res = await axios.post("https://api.jdoodle.com/v1/execute", data);
      const output = (res.data.output || '').trim();

      if (output === expectedOutput.trim()) {
        setResult(`✅ 正确输出：\n${output}`);
      } else {
        setResult(`❌ 输出错误\n【实际】：\n${output}\n【期望】：\n${expectedOutput}`);
      }
    } catch (error) {
      setResult("❌ 运行失败：" + error.message);
    }

    setRunning(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Editor
        height="300px"
        defaultLanguage="csharp"
        defaultValue={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />
      <br />
      <button
        onClick={handleRun}
        disabled={running}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        ▶️ 运行代码
      </button>
      <pre style={{ marginTop: '1rem', background: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
        {result}
      </pre>
    </div>
  );
}