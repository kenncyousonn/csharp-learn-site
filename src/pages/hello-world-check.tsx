import React, { useState } from 'react';

export default function HelloWorldCheck() {
  const [code, setCode] = useState<string>(`using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello World!");\n  }\n}`);
  const [result, setResult] = useState<string>('还未检测');

  const expectedOutput = "Hello World!";

  const fakeCompile = () => {
    // 模拟运行结果（仅演示用）
    if (
      code.includes('Console.WriteLine') &&
      code.includes('"Hello World!"')
    ) {
      setResult('✅ 正确输出，练习通过！');
    } else {
      setResult('❌ 输出不正确，请检查是否正确使用 Console.WriteLine("Hello World!")');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hello World! 输出练习</h1>
      <p>请用 C# 写出输出 Hello World 的代码：</p>
      <textarea
        rows={12}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ fontFamily: 'monospace', fontSize: '14px' }}
      />
      <br /><br />
      <button onClick={fakeCompile} style={{ padding: '10px 20px', fontSize: '16px' }}>
        点击检查
      </button>
      <div style={{ marginTop: '1rem', fontWeight: 'bold', color: result.startsWith('✅') ? 'green' : 'red' }}>
        {result}
      </div>
    </div>
  );
}