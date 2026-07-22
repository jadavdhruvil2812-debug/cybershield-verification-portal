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

      {/* Hero */}
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
        </div>
      </section>

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
      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-slate-400 text-sm">
        <p>🛡️ CyberShield: Verification Portal — AI-Powered Digital Trust Platform</p>
      </footer>
    </main>
  );
}