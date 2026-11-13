import React, { useState, useEffect, useRef } from 'react';

export default function SyedAIApp() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'আসসালামু আলাইকুম! আমি সৈয়দ এআই। আপনার দিনটি কেমন যাচ্ছে বলুন?' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ১. বাংলা ভয়েস রিকগনিশন (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('আপনার ব্রাউজার ভয়েস রিকগনিশন সমর্থন করে না। দয়া করে গুগল ক্রোম ব্যবহার করুন।');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD'; // বাংলা ভাষা সেট করা
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      handleSendMessage(speechToText);
    };

    recognition.start();
  };

  // ২. মানুষের মতো কন্ঠস্বর ও আবেগ প্রকাশ (Text-to-Speech)
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // আগের কথা বন্ধ করতে
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95; // কিছুটা স্বাভাবিক ও ধীর গতি
      utterance.pitch = 1.0; // মানুষের কণ্ঠের সুরের মতো

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // ৩. ChatGPT-এর মতো বুদ্ধিমত্তা ও সহানুভূতিশীল রেসপন্স জেনারেট করা
  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const newMessages = [...messages, { role: 'user', content: messageText }];
    setMessages(newMessages);
    setInput('');

    // এখানে চ্যাটজিপিটি বা এআই রেসপন্স লজিক কাজ করবে
    setTimeout(() => {
      let aiReply = "আপনার কথাটি আমি বুঝতে পেরেছি। বলুন, এ বিষয়ে আর কীভাবে সাহায্য করতে পারি?";
      
      // সাধারণ কিছু আবেগ ও অনুভূতির উত্তর হ্যান্ডেল করা
      if (messageText.includes('কেমন আছো') || messageText.includes('কেমন আসিস')) {
        aiReply = "আলহামদুলিল্লাহ, আপনার সাথে কথা বলে খুব ভালো লাগছে। আপনি কেমন আছেন বলুন?";
      } else if (messageText.includes('দুঃখিত') || messageText.includes('মন খারাপ')) {
        aiReply = "আপনার মন খারাপ শুনে আমারও খুব খারাপ লাগছে। একটু খুলে বলুন না, কী হয়েছে? আমি সবসময় আপনার পাশে আছি।";
      }

      setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
      speakResponse(aiReply);
    }, 1000);
  };

  // ৪. ওয়েক-ওয়ার্ড লিসেনার ("Hey Syed" ডিটেক্ট করার জন্য ব্যাকগ্রাউন্ড লজিক)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const wakeWordRecognition = new SpeechRecognition();
      wakeWordRecognition.lang = 'en-US';
      wakeWordRecognition.continuous = true;
      wakeWordRecognition.interimResults = true;

      wakeWordRecognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript.toLowerCase();
        
        // "Hey Syed" শুনলেই অ্যাপ অ্যাক্টিভ হয়ে ভয়েস রিকগনিশন শুরু করবে
        if (transcript.includes('hey syed') || transcript.includes('হেই সৈয়দ')) {
          startListening();
        }
      };

      try {
        wakeWordRecognition.start();
      } catch (e) {
        console.log('Wake-word running notice:', e);
      }
    }
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', color: '#38bdf8' }}>Syed AI - আপনার অনুভূতি ও সঙ্গী</h2>
      
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #334155', padding: '15px', borderRadius: '8px', marginBottom: '15px', background: '#1e293b' }}>
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

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="এখানে কিছু লিখুন বা বলুন..." 
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
        />
        <button 
          onClick={() => handleSendMessage()} 
          style={{ padding: '12px 20px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          পাঠান
        </button>
        <button 
          onClick={startListening} 
          style={{ padding: '12px 20px', background: isListening ? '#dc2626' : '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {isListening ? 'শুনছি...' : '🎤 বলুন'}
        </button>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
        {isSpeaking ? '🗣️ সৈয়দ কথা বলছে...' : '💡 টিপস: "Hey Syed" বললেও এটি অটোমেটিক শুনতে শুরু করবে।'}
      </p>
    </div>
  );
      }
