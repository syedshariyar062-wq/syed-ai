import React, { useState } from 'react';

export default function SyedAIApp() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'আসসালামু আলাইকুম! আমি সৈয়দ এআই। আপনার কি সেবা করতে পারি?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (textToSend) => {
    const messageText = (textToSend || input).trim();
    if (!messageText) return;

    // নতুন ইউজার মেসেজ চ্যাটে যোগ করা
    const newMessages = [...messages, { role: 'user', content: messageText }];
    setMessages(newMessages);
    setInput('');

    // এআই-এর নিজস্ব লজিক দিয়ে উত্তর ঠিক করা
    setTimeout(() => {
      let aiReply = "আপনার কথাটি আমি বুঝতে পেরেছি। বলুন, এ বিষয়ে আর কীভাবে সাহায্য করতে পারি?";
      
      const lowerText = messageText.toLowerCase();

      if (lowerText.includes('কে বানিয়েছে') || lowerText.includes('কে তৈরি করেছে') || lowerText.includes('create') || lowerText.includes('maker') || lowerText.includes('banise')) {
        aiReply = "আমাকে তৈরি করেছেন আমার ক্রিয়েটর, সৈয়দ!";
      } else if (lowerText.includes('কেমন আছো') || lowerText.includes('কেমন আসিস')) {
        aiReply = "আলহামদুলিল্লাহ, আপনার সাথে কথা বলে খুব ভালো লাগছে। আপনি কেমন আছেন বলুন?";
      } else if (lowerText.includes('দুঃখিত') || lowerText.includes('মন খারাপ')) {
        aiReply = "আপনার মন খারাপ শুনে আমারও খুব খারাপ লাগছে। একটু খুলে বলুন না, কী হয়েছে? আমি সবসময় আপনার পাশে আছি।";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    }, 500);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', background: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#38bdf8' }}>Syed AI - আপনার অনুভূতি ও সৃষ্টি</h2>

      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #334155', padding: '15px', borderRadius: '8px', background: '#1e293b' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 15px',
              borderRadius: '15px',
              background: msg.role === 'user' ? '#0284c7' : '#334155',
              color: '#fff',
              maxWidth: '80%'
            }}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="এখানে কিছু বা টাইপ করুন..."
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
        />
        <button
          onClick={() => handleSendMessage()}
          style={{ padding: '12px 20px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          পাঠান
        </button>
      </div>
    </div>
  );
                }
