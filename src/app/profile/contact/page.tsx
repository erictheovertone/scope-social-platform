"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactUs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would send to support system
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ subject: "", message: "", email: "" });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const supportTopics = [
    { id: 'bug', label: 'Report a Bug', icon: '🐛' },
    { id: 'feature', label: 'Feature Request', icon: '💡' },
    { id: 'account', label: 'Account Issues', icon: '👤' },
    { id: 'trading', label: 'Trading Support', icon: '💰' },
    { id: 'other', label: 'Other', icon: '❓' }
  ];

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#333333]">
        <button 
          onClick={() => router.back()} 
          className="text-white text-lg"
        >
          ←
        </button>
        <h1 className="font-['IBM_Plex_Mono'] font-medium text-white text-[18px]">
          Contact Us
        </h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </div>
            <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[18px] mb-4 text-center">
              Message Sent!
            </h2>
            <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[14px] text-center">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Quick Support Topics */}
            <div className="mb-8">
              <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px] mb-4">
                Quick Help
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {supportTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleChange('subject', topic.label)}
                    className="p-4 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:bg-[#222222] transition-colors text-left"
                  >
                    <div className="text-2xl mb-2">{topic.icon}</div>
                    <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px]">
                      {topic.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] focus:border-[#FF0000] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] focus:border-[#FF0000] focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] resize-none focus:border-[#FF0000] focus:outline-none"
                  placeholder="Tell us more about your issue or question..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF0000] text-white py-4 rounded-lg font-['IBM_Plex_Mono'] font-medium text-[16px] hover:bg-[#CC0000] transition-colors"
              >
                Send Message
              </button>
            </form>

            {/* Additional Support */}
            <div className="mt-8 p-4 bg-[#1A1A1A] border border-[#333333] rounded-lg">
              <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px] mb-3">
                Other ways to reach us:
              </p>
              <div className="space-y-2">
                <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[11px]">
                  📧 support@scope.app
                </p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[11px]">
                  🐦 @ScopeSupport
                </p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[11px]">
                  ⏰ Response time: Usually within 24 hours
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
