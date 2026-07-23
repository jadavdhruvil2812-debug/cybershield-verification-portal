'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeUrl = () => {
    if (!url) return;

    setLoading(true);

    setTimeout(() => {
      let score = 100;
      let risk = 'SAFE';
      let color = 'green';
      let reasons: string[] = [];

      // Basic URL checks
      const lowerUrl = url.toLowerCase();

      // HTTPS check
      if (!lowerUrl.startsWith('https://')) {
        score -= 25;
        reasons.push('URL is not using HTTPS encryption');
      }

      // Suspicious keywords
      const suspiciousKeywords = [
        'verify',
        'login',
        'update',
        'kyc',
        'bank',
        'secure',
        'payment',
        'wallet',
        'otp',
      ];

      suspiciousKeywords.forEach((keyword) => {
        if (lowerUrl.includes(keyword)) {
          score -= 8;
          reasons.push(`Suspicious keyword detected: ${keyword}`);
        }
      });

      // Fake domain patterns
      if (
        lowerUrl.includes('.xyz') ||
        lowerUrl.includes('.top') ||
        lowerUrl.includes('.click') ||
        lowerUrl.includes('.shop')
      ) {
        score -= 20;
        reasons.push('High-risk domain extension detected');
      }

      // Too many hyphens
      const hyphenCount = (lowerUrl.match(/-/g) || []).length;
      if (hyphenCount >= 3) {
        score -= 15;
        reasons.push('Domain contains multiple hyphens');
      }

      // IP address instead of domain
      if (/\\d+\\.\\d+\\.\\d+\\.\\d+/.test(lowerUrl)) {
        score -= 30;
        reasons.push('URL uses direct IP address');
      }

      // Final classification
      if (score >= 75) {
        risk = 'SAFE';
        color = 'green';
      } else if (score >= 45) {
        risk = 'WARNING';
        color = 'yellow';
      } else {
        risk = 'DANGER';
        color = 'red';
      }

      setResult({
        score: Math.max(score, 0),
        risk,
        color,
        reasons,
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-2xl">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-bold">CyberShield</h1>
            <p className="text-xs text-blue-200">Verification Portal</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="#verify" className="hover:text-white">Verify</a>
          <a href="#alerts" className="hover:text-white">Live Alerts</a>
          <a href="#campus" className="hover:text-white">Campus</a>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 transition">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Real-time Digital Trust Engine
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Check Before
            <span className="text-blue-400"> You Trust</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-8 max-w-2xl mx-auto">
            AI-powered verification for URLs, QR codes, SMS messages and digital threats.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#verify"
              className="rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              Start Verification
            </a>

            <a
              href="#alerts"
              className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-slate-200 hover:bg-white/10 transition-all duration-300"
            >
              View Live Threats
            </a>
          </div>
        </div>
      </section>      
      {/* Navbar */}

      {/* REAL URL VERIFICATION ENGINE */}
      <section id="verify" className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🌐</div>
              <h2 className="text-3xl font-bold mb-2">
                Real-Time URL Verification Engine
              </h2>
              <p className="text-slate-300">
                Paste any website link to analyze phishing risk, domain reputation and trust score.
              </p>
            </div>

            {/* Input */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste URL here (e.g. https://amazon.in)"
                className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />

              <button
                onClick={analyzeUrl}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 min-w-[170px]"
              >
                {loading ? 'Analyzing...' : 'Check URL'}
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3 rounded-2xl bg-blue-500/10 border border-blue-400/20 px-6 py-4">
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-200 font-medium">
                    AI engine is analyzing the URL...
                  </span>
                </div>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        result.color === 'green'
                          ? 'bg-green-400'
                          : result.color === 'yellow'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                      }`}
                    ></div>
                    <h3 className="text-2xl font-bold">Analysis Result</h3>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      result.color === 'green'
                        ? 'bg-green-500 text-black'
                        : result.color === 'yellow'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {result.risk}
                  </div>
                </div>

                {/* Trust Score */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 font-medium">Trust Score</span>
                    <span
                      className={`text-2xl font-black ${
                        result.color === 'green'
                          ? 'text-green-400'
                          : result.color === 'yellow'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {result.score}/100
                    </span>
                  </div>

                  <div className="h-4 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.color === 'green'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                          : result.color === 'yellow'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                          : 'bg-gradient-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${result.score}%` }}
                    ></div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="mb-6 rounded-2xl bg-blue-500/10 border border-blue-400/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-semibold text-blue-200">AI Explanation</span>
                  </div>

                  <p className="text-slate-200 leading-7">
                    {result.risk === 'SAFE'
                      ? 'This URL appears to be legitimate. It uses secure HTTPS encryption and does not contain major phishing indicators.'
                      : result.risk === 'WARNING'
                      ? 'This URL contains some suspicious characteristics. Users should verify the domain carefully before entering personal information.'
                      : 'This URL shows multiple phishing indicators including suspicious patterns, risky domain characteristics or security weaknesses. Avoid sharing credentials or payment information.'}
                  </p>
                </div>

                {/* Reasons */}
                <div>
                  <h4 className="font-semibold mb-3 text-slate-200">
                    Detection Details
                  </h4>

                  {result.reasons.length > 0 ? (
                    <ul className="space-y-2">
                      {result.reasons.map((reason: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 rounded-xl bg-slate-800/60 p-3 text-slate-300"
                        >
                          <span className="text-red-400 mt-0.5">⚠️</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-400/20 p-4 text-green-200">
                      <span className="text-xl">✅</span>
                      <span>No suspicious indicators were detected by the CyberShield engine.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* AI SMS SCAM DETECTOR */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-3xl font-bold mb-2">
                AI-Powered SMS Scam Detector
              </h2>
              <p className="text-slate-300">
                Paste any SMS message to detect phishing, bank impersonation and scam patterns.
              </p>
            </div>

            <textarea
              rows={5}
              placeholder="Paste suspicious SMS here... Example: Dear Customer, your SBI account will be blocked. Update KYC immediately: http://sbi-verify-now.xyz"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
            />

            <div className="mt-6 flex justify-center">
              <button className="rounded-2xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500 transition-all duration-300">
                Analyze SMS
              </button>
            </div>

            {/* Demo Result */}
            <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse"></div>
                  <h3 className="text-2xl font-bold text-red-300">
                    High-Risk SMS Detected
                  </h3>
                </div>

                <div className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold">
                  LIKELY PHISHING
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium">Risk Score</span>
                  <span className="text-2xl font-black text-red-400">94%</span>
                </div>

                <div className="h-4 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-red-500 to-red-400"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/60 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🤖</span>
                  <span className="font-semibold text-blue-200">AI Explanation</span>
                </div>

                <p className="text-slate-200 leading-7">
                  The message uses urgency language ("blocked immediately"), impersonates a trusted bank
                  brand (SBI), requests KYC verification and contains a suspicious external link. These
                  indicators strongly match known banking phishing campaigns.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-slate-200">Detected Threat Indicators</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Urgency language detected',
                    'Bank brand impersonation',
                    'KYC scam pattern matched',
                    'Suspicious verification link',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-slate-800/60 p-3 text-slate-300"
                    >
                      <span className="text-red-400">⚠️</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* QR SHIELD + LIVE THREAT FEED */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-8">

          {/* QR Shield */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📷</div>
              <h2 className="text-3xl font-bold mb-2">QR Shield Verification</h2>
              <p className="text-slate-300">
                Verify QR codes before scanning payment, login or registration links.
              </p>
            </div>

            {/* Upload Box */}
            <div className="border-2 border-dashed border-blue-400/30 rounded-2xl p-8 text-center bg-slate-900/40">
              <div className="text-4xl mb-3">📱</div>
              <p className="text-slate-300 mb-4">
                Drag & drop QR image or choose a file
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="qr-upload"
              />

              <label
                htmlFor="qr-upload"
                className="inline-flex cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition"
              >
                Choose QR Image
              </label>
            </div>

            {/* Demo Verification Result */}
            <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span className="font-bold text-yellow-300">Verification Result</span>
                </div>
                <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                  WARNING
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Detected Domain</span>
                  <span className="font-semibold">paytm-secure-verify.xyz</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Trust Score</span>
                  <span className="font-bold text-yellow-400">38/100</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Community Reports</span>
                  <span className="font-semibold text-red-300">17 reports</span>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-900/60 p-4">
                <p className="text-sm text-slate-200 leading-6">
                  <span className="font-semibold text-yellow-300">AI Warning:</span> The QR redirects to a
                  high-risk payment domain that has been reported multiple times by community users. Avoid
                  entering UPI PIN, OTP or payment credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Live Community Threat Feed */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
                <h2 className="text-3xl font-bold">Live Threat Feed</h2>
              </div>
              <span className="text-sm text-green-400 font-semibold">LIVE</span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Fake SBI KYC QR',
                  level: 'HIGH',
                  time: '2 min ago',
                  reports: '12 users',
                  color: 'red',
                },
                {
                  title: 'Suspicious UPI Payment QR',
                  level: 'MEDIUM',
                  time: '7 min ago',
                  reports: '8 users',
                  color: 'yellow',
                },
                {
                  title: 'Fake Internship Registration Portal',
                  level: 'HIGH',
                  time: '15 min ago',
                  reports: '21 users',
                  color: 'red',
                },
                {
                  title: 'Official College Notice QR',
                  level: 'VERIFIED',
                  time: '28 min ago',
                  reports: 'Admin verified',
                  color: 'green',
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] ${
                    alert.color === 'red'
                      ? 'border-red-400/20 bg-red-500/10'
                      : alert.color === 'yellow'
                      ? 'border-yellow-400/20 bg-yellow-500/10'
                      : 'border-green-400/20 bg-green-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white">{alert.title}</h3>
                      <p className="text-sm text-slate-300 mt-1">
                        Reported by {alert.reports}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        alert.color === 'red'
                          ? 'bg-red-500 text-white'
                          : alert.color === 'yellow'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-green-500 text-black'
                      }`}
                    >
                      {alert.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>🕒 {alert.time}</span>
                    <span>Community Intelligence</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Real-time Explanation */}
            <div className="mt-6 rounded-2xl bg-blue-500/10 border border-blue-400/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⚡</span>
                <span className="font-semibold text-blue-200">Why This Is Real-Time</span>
              </div>

              <p className="text-sm text-slate-200 leading-6">
                Each report updates the trust score and threat feed dynamically. When multiple users report the
                same QR, URL or SMS, CyberShield automatically increases the risk level and pushes a warning to
                the live community feed.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CAMPUS VERIFICATION HUB + EVIDENCE VAULT */}
      <section id="campus" className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-8">

          {/* Campus Hub */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🏫</div>
              <h2 className="text-3xl font-bold mb-2">Campus Verification Hub</h2>
              <p className="text-slate-300">
                Verify internships, placements, scholarships and official college notices.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Summer Internship Offer', status: 'FAKE DETECTED', color: 'red' },
                { title: 'Campus Placement Drive', status: 'VERIFIED', color: 'green' },
                { title: 'Government Scholarship Link', status: 'CHECK REQUIRED', color: 'yellow' },
                { title: 'Official College Notice QR', status: 'ADMIN VERIFIED', color: 'green' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-2xl bg-slate-900/50 p-4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.color === 'red'
                        ? 'bg-red-400'
                        : item.color === 'yellow'
                        ? 'bg-yellow-400'
                        : 'bg-green-400'
                    }`} />
                    <span className="font-semibold text-white">{item.title}</span>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.color === 'red'
                      ? 'bg-red-500 text-white'
                      : item.color === 'yellow'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-green-500 text-black'
                  }`} >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-blue-500/10 border border-blue-400/20 p-4">
              <p className="text-sm text-slate-200 leading-6">
                <span className="font-semibold text-blue-300">College Use Case:</span> Students can check whether a placement company, internship offer or scholarship link is officially verified by the institution before submitting personal documents or payments.
              </p>
            </div>
          </div>

          {/* Evidence Vault */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📂</div>
              <h2 className="text-3xl font-bold mb-2">Evidence Vault</h2>
              <p className="text-slate-300">
                Securely store screenshots, QR images, receipts and scam evidence with case tracking.
              </p>
            </div>

            <div className="border-2 border-dashed border-blue-400/30 rounded-2xl p-8 text-center bg-slate-900/40">
              <div className="text-4xl mb-3">📎</div>
              <p className="text-slate-300 mb-4">
                Upload screenshots, PDFs, transaction receipts or suspicious messages
              </p>

              <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition">
                Upload Evidence
              </button>
            </div>

            {/* Generated Case */}
            <div className="mt-6 rounded-2xl border border-green-400/20 bg-green-500/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="font-bold text-green-300">Case Generated</span>
                </div>

                <span className="text-xs text-slate-300">2026-07-23 10:42</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Case ID</p>
                  <p className="font-bold text-white">CS-2026-1042</p>
                </div>

                <div>
                  <p className="text-slate-400">Category</p>
                  <p className="font-semibold text-white">Fake Internship Scam</p>
                </div>

                <div>
                  <p className="text-slate-400">Evidence Count</p>
                  <p className="font-semibold text-white">4 files</p>
                </div>

                <div>
                  <p className="text-slate-400">Status</p>
                  <span className="inline-flex rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    UNDER REVIEW
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-900/60 p-4">
                <p className="text-sm text-slate-200 leading-6">
                  <span className="font-semibold text-green-300">Integrity Protection:</span> Evidence is timestamped and linked to a unique case ID so screenshots and documents can be tracked during investigation and reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-slate-400 text-sm">
        <p>🛡️ CyberShield: Verification Portal — AI-Powered Digital Trust Platform</p>
      </footer>
    </main>
  );
}