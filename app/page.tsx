'use client';

import { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Globe,
  MessageSquare,
  QrCode,
  Upload,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
  Search,
  Lock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [urlResult, setUrlResult] = useState<{ score: number; status: string; breakdown: string[] } | null>(null);
  const [isAnalyzingUrl, setIsAnalyzingUrl] = useState(false);

  const [sms, setSms] = useState('');
  const [smsResult, setSmsResult] = useState<{ score: number; level: string; detectedKeywords: string[] } | null>(null);

  const [qrResult, setQrResult] = useState<{ decoded: string; score: number; status: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'url' | 'sms' | 'qr'>('url');

  // URL Checker Logic
  const checkUrl = () => {
    if (!url) return;
    setIsAnalyzingUrl(true);

    setTimeout(() => {
      let score = 100;
      const text = url.toLowerCase();
      const breakdown: string[] = [];

      if (!text.startsWith('https://')) {
        score -= 30;
        breakdown.push('Missing secure protocol (HTTPS)');
      }
      if (text.includes('verify')) {
        score -= 20;
        breakdown.push('Contains credential harvesting keyword "verify"');
      }
      if (text.includes('kyc')) {
        score -= 20;
        breakdown.push('Contains sensitive keyword "kyc"');
      }
      if (text.includes('.xyz') || text.includes('.top')) {
        score -= 30;
        breakdown.push('High-risk top-level domain extension');
      }

      setUrlResult({
        score: Math.max(score, 0),
        status: score < 40 ? 'DANGER' : score < 70 ? 'WARNING' : 'SAFE',
        breakdown: breakdown.length > 0 ? breakdown : ['No critical security flags detected.'],
      });
      setIsAnalyzingUrl(false);
    }, 600);
  };

  // SMS Analysis Logic
  const analyzeSms = () => {
    if (!sms) return;

    const text = sms.toLowerCase();
    let score = 0;
    const detectedKeywords: string[] = [];

    if (text.includes('blocked') || text.includes('urgent')) {
      score += 25;
      detectedKeywords.push('Urgency tactic');
    }
    if (text.includes('sbi') || text.includes('bank')) {
      score += 25;
      detectedKeywords.push('Financial institution targeting');
    }
    if (text.includes('kyc') || text.includes('otp')) {
      score += 25;
      detectedKeywords.push('Sensitive info request (KYC/OTP)');
    }
    if (text.includes('http://') || text.includes('.xyz')) {
      score += 25;
      detectedKeywords.push('Unverified link format');
    }

    setSmsResult({
      score,
      level: score >= 70 ? 'LIKELY PHISHING' : score >= 30 ? 'SUSPICIOUS' : 'SAFE',
      detectedKeywords,
    });
  };

  // QR Decoder & Analysis
  const analyzeQr = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.src = objectUrl;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        const data = code.data.toLowerCase();
        let score = 100;

        if (data.includes('upi://')) score -= 30;
        if (data.includes('verify')) score -= 30;
        if (data.includes('.xyz')) score -= 40;

        setQrResult({
          decoded: code.data,
          score: Math.max(score, 0),
          status: score < 40 ? 'WARNING' : score < 70 ? 'SUSPICIOUS' : 'SAFE',
        });
      } else {
        setQrResult({
          decoded: 'No valid QR code pattern detected',
          score: 0,
          status: 'INVALID',
        });
      }

      URL.revokeObjectURL(objectUrl);
    };
  };

  const threatFeed = [
    { title: 'Fake SBI KYC QR Code', level: 'HIGH RISK', type: 'Phishing' },
    { title: 'Suspicious UPI Payment Redirect', level: 'HIGH RISK', type: 'Scam' },
    { title: 'Fake Internship Portal (.xyz domain)', level: 'MEDIUM RISK', type: 'Spoofing' },
    { title: 'Unofficial College Examination Notice', level: 'MEDIUM RISK', type: 'Fake Doc' },
  ];

  return (
    <main className="min-h-screen bg-[#070d19] text-slate-100 selection:bg-blue-500 selection:text-white font-sans relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#070d19]/80 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide">
                Cyber<span className="text-blue-400">Shield</span>
              </h1>
              <p className="text-xs text-slate-400">Digital Trust Verification Engine</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all border border-blue-400/30"
          >
            Access Portal
          </motion.button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-6 pt-16 pb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300 mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            AI-Driven Real-Time Threat Analysis
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Verify Before You Click or Scan
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Protect your digital identity against phishing URLs, malicious QR codes, scam SMS messages, and unauthorized campus notices.
          </p>

          {/* QUICK SELECTOR TABS */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 mb-8 backdrop-blur-lg">
            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'url' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" /> URL Scan
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'sms' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> SMS Analysis
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'qr' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" /> QR Inspector
            </button>
          </div>
        </motion.div>
      </section>

      {/* SCANNING TOOLS CONTAINER */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {/* URL CHECKER */}
          {activeTab === 'url' && (
            <motion.div
              key="url-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Real-Time URL Engine</h2>
                  <p className="text-sm text-slate-400">Scan links for domain reputation and credential phishing risks.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste website URL (e.g., https://example.com)..."
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-12 pr-4 py-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkUrl}
                  disabled={isAnalyzingUrl}
                  className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                >
                  {isAnalyzingUrl ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Verify Link'
                  )}
                </motion.button>
              </div>

              {urlResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 rounded-2xl bg-slate-950/80 p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {urlResult.status === 'SAFE' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {urlResult.status === 'WARNING' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                      {urlResult.status === 'DANGER' && <ShieldAlert className="w-5 h-5 text-red-400" />}
                      <span className="text-lg font-bold tracking-wide">{urlResult.status}</span>
                    </div>

                    <div className="text-2xl font-black">{urlResult.score}/100</div>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        urlResult.score > 70 ? 'bg-emerald-500' : urlResult.score > 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${urlResult.score}%` }}
                    />
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-300">Analysis Breakdown:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {urlResult.breakdown.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* SMS DETECTOR */}
          {activeTab === 'sms' && (
            <motion.div
              key="sms-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">SMS & Message Detector</h2>
                  <p className="text-sm text-slate-400">Detect social engineering and urgent scam patterns.</p>
                </div>
              </div>

              <textarea
                rows={4}
                value={sms}
                onChange={(e) => setSms(e.target.value)}
                placeholder="Paste suspicious text message or email content here..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={analyzeSms}
                className="mt-4 w-full sm:w-auto rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25"
              >
                Analyze SMS Content
              </motion.button>

              {smsResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 rounded-2xl bg-slate-950/80 p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{smsResult.level}</h3>
                    <span className="text-2xl font-black text-indigo-400">{smsResult.score}% Risk</span>
                  </div>

                  {smsResult.detectedKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {smsResult.detectedKeywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                          ⚠️ {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* QR INSPECTOR */}
          {activeTab === 'qr' && (
            <motion.div
              key="qr-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">QR Shield Verification</h2>
                  <p className="text-sm text-slate-400">Decode hidden QR payloads to prevent payment and credential scams.</p>
                </div>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-8 text-center bg-slate-950/40 cursor-pointer transition-all group"
              >
                <div className="p-4 w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <p className="text-slate-200 font-medium mb-1">Click to upload or drag QR screenshot</p>
                <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP formats</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={analyzeQr}
                  className="hidden"
                />
              </div>

              {qrResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 rounded-2xl bg-slate-950/80 p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-slate-400">Payload Analysis Result</span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                      {qrResult.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Decoded Payload Content:</p>
                      <p className="font-mono text-sm break-all text-slate-200 bg-slate-900 p-3 rounded-xl border border-white/5 mt-1">
                        {qrResult.decoded}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Safety Score:</span>
                      <span className="font-bold text-slate-200">{qrResult.score}/100</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* LIVE THREAT FEED */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="text-xl font-bold">Live Threat Feed</h2>
            </div>
            <span className="text-xs text-slate-500">Updated in real time</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {threatFeed.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-slate-950/50 p-4 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-sm text-slate-200">{item.title}</h3>
                  <span className="text-xs text-slate-500">{item.type}</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                  {item.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS HUB & EVIDENCE VAULT */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* CAMPUS VERIFICATION HUB */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Campus Verification Hub</h2>
            </div>

            <div className="space-y-3">
              {[
                'Summer Internship Offer Letters',
                'Official Campus Drive Notices',
                'Government Scholarship Portals',
                'Official Fee Payment Gateways',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-slate-950/50 p-3.5 border border-white/5"
                >
                  <span className="text-sm font-medium text-slate-300">{item}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EVIDENCE VAULT */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Evidence Vault</h2>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Securely store evidence receipts and screenshots to assist cyber awareness reporting.
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <div>
                  <p className="text-slate-500">Case Identifier</p>
                  <p className="font-mono font-bold text-slate-200">CS-2026-1042</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  UNDER REVIEW
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>CyberShield Platform — Digital Trust Engine</span>
          </div>
          <p>© 2026 All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}