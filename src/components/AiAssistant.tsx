/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, GraduationCap, History, AlertTriangle, ShieldAlert, BadgeAlert, Clock } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantProps {
  initialMessage?: string;
}

export default function AiAssistant({ initialMessage }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: initialMessage || 'Вітаю! Я ваш інтелектуальний помічник Харківського метрополітену. Буду радий підказати вам оптимальні маршрути, розповісти про укриття під час повітряної тривоги або пояснити, де діє унікальна підземна «Метрошкола». Чим можу допомогти вам сьогодні?',
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);
    setErrorMessage(null);

    try {
      // Proxy call to server-side Gemini API
      const updatedMessagesForServer = [...messages, userMsg];
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedMessagesForServer })
      });

      if (!response.ok) {
        throw new Error('Не вдалося отримати відповідь від помічника.');
      }

      const data = await response.json();

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.text || 'Вибачте, сталася помилка з обробкою запиту.',
        timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (err: any) {
      console.error(err);
      setIsTyping(false);
      setErrorMessage('Не вдалося завантажити відповідь. Спробуйте пізніше або перевірте Secrets конфігурацію.');
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  const quickPrompts = [
    { text: 'Де працює Метрошкола?', icon: <GraduationCap size={13} className="text-amber-500" /> },
    { text: 'Яка найглибша станція?', icon: <History size={13} className="text-blue-500" /> },
    { text: 'Як їхати під час тривоги?', icon: <ShieldAlert size={13} className="text-emerald-500" /> },
    { text: 'Які нещодавні перейменування?', icon: <Clock size={13} className="text-rose-500" /> }
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex flex-col h-[520px]" id="ai-assistant-root">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3" id="ai-header">
        <div className="flex items-center space-x-2">
          <div className="p-1 px-2.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs flex items-center space-x-1 animate-pulse">
            <Sparkles size={13} />
            <span>AI</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800" id="ai-assistant-title">Метро-Помічник</h3>
            <p className="text-[11px] text-gray-400 font-medium">Розумний супутник харківського пасажира</p>
          </div>
        </div>
        <span className="text-[9px] bg-gray-100 text-gray-400 font-mono px-2 py-0.5 rounded">Модель: gemini-3.5-flash</span>
      </div>

      {/* Messages Box */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 scrollbar-thin text-xs" id="ai-messages-box">
        {messages.map((m) => (
          <div 
            key={m.id}
            id={`chat-bubble-${m.id}`}
            className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
          >
            <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
              m.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none shadow-xs' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200/50'
            }`}>
              {m.text}
            </div>
            <span className="text-[9px] text-gray-400 font-mono mt-0.5 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start max-w-[85%]" id="assistant-typing-indicator">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200/50 flex items-center space-x-1.5 font-medium">
              <span className="text-xs text-gray-500 select-none">Помічник пише відповідь</span>
              <span className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              </span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-[11px] font-medium" id="assistant-error-indicator-div">
            {errorMessage}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts list */}
      {messages.length < 3 && !isTyping && (
        <div className="py-2 space-y-1 border-t border-gray-50 my-2" id="quick-questions-panel">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Швидкі запитання:</p>
          <div className="flex flex-wrap gap-1.5" id="quick-questions-wrapper">
            {quickPrompts.map((q, idx) => (
              <button
                key={`q-${idx}`}
                onClick={() => handleQuickQuestion(q.text)}
                id={`quick-question-btn-${idx}`}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 text-[11px] font-medium cursor-pointer transition-all hover:scale-[1.01]"
              >
                {q.icon}
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Action Panel */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(userInput); }} 
        className="mt-2 pt-2 border-t border-gray-100 flex items-center space-x-2 shrink-0"
        id="ai-input-form"
      >
        <input
          id="ai-query-input"
          type="text"
          placeholder="Спитайте щось у помічника (напр. Як діє метро під час тривоги?)..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isTyping}
          className="flex-1 text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400"
        />
        <button
          id="ai-send-button"
          type="submit"
          disabled={isTyping || !userInput.trim()}
          className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-all shrink-0 cursor-pointer shadow-xs"
          title="Надіслати"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
