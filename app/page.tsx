'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [sms, setSms] = useState('');
  const [smsResult, setSmsResult] = useState<any>(null);

  const analyzeUrl = () => {
    if (!url) return;

    setLoading(true);

    setTimeout(() => {
      const suspiciousKeywords = [
        'login',
        'verify',
        'bank',
        'payment',
        'otp',
        'kyc',
      ];

      let score = 100;
      const detected: string[] = [];

      if (!url.startsWith('https://')) {
        score -= 30;
        detected.push('URL is not using HTTPS encryption');
      }

      suspiciousKeywords.forEach((word) => {
        if (url.toLowerCase().includes(word)) {
          score -= 15;
          detected.push(`Suspicious keyword detected: ${word}`);
        }
      });

      if (
        url.includes('.xyz') ||
        url.includes('.top') ||
        url.includes('.click')
      ) {
        score -= 25;
        detected.push('High-risk domain extension detected');
      }

      let status = 'SAFE';
      let color = 'green';

      if (score < 40) {
        status = 'DANGER';
        color = 'red';
      } else if (score < 70) {
        status = 'WARNING';
        color = 'yellow';
      }

      setResult({
        score: Math.max(score, 0),
        status,
        color,
        detected,
      });

      setLoading(false);
    }, 1200);
  };

  const analyzeSms = () => {
    if (!sms.trim()) return;

    const text = sms.toLowerCase();
    let score = 0;
    const threats: string[] = [];

    if (
      text.includes('urgent') ||
      text.includes('immediately') ||
      text.includes('blocked')
    ) {
      score += 25;
      threats.push('Urgency language detected');
    }

    if (
      text.includes('sbi') ||
      text.includes('hdfc') ||
      text.includes('icici') ||
      text.includes('axis') ||
      text.includes('bank')
    ) {
      score += 25;
      threats.push('Bank brand impersonation');
    }

    if (text.includes('kyc') || text.includes('otp')) {
      score += 25;
      threats.push('KYC/OTP scam pattern matched');
    }

    if (
      text.includes('http://') ||
      text.includes('.xyz') ||
      text.includes('.top') ||
      text.includes('.click')
    ) {
      score += 25;
      threats.push('Suspicious verification link');
    }

    const finalScore = Math.min(score, 100);

    let level = 'SAFE';
    let color = 'green';

    if (finalScore >= 70) {
      level = 'LIKELY PHISHING';
      color = 'red';
    } else if (finalScore >= 30) {
      level = 'SUSPICIOUS';
      color = 'yellow';
    }

    setSmsResult({
      score: finalScore,
      level,
      color,
      threats,
    });
  };

  const threatFeed = [
    {
      title: 'Fake SBI KYC QR',
      severity: 'HIGH',
      time: '2 min ago',
      reports: 12,
    },
    {
      title: 'Suspicious UPI Payment QR',
      severity: 'MEDIUM',
      time: '7 min ago',
      reports: 8,
    },
    {
      title: 'Fake Internship Registration Portal',
      severity: 'HIGH',
      time: '15 min ago',
      reports: 21,
    },
    {
      title: 'Official College Notice QR',
      severity: 'VERIFIED',
      time: '28 min ago',
      reports: 'Admin verified',
    },
  ];

  return (
    <main className='min-h-screen bg-[#071021] text-white'>
      {/* Navbar */}
      <nav className='flex items-center justify-between px-6 py-4 border-b border-white/10'>
        <div className='flex items-center gap-3'>
          <div className='text-2xl'>🛡️</div>
          <div>
            <h1 className='font-bold text-lg'>CyberShield</h1>
            <p className='text-xs text-slate-400'>Verification Portal</p>
          </div>
        </div>

        <div className='hidden md:flex items-center gap-8 text-sm'>
          <a href='#verify' className='hover:text-blue-300 transition'>
            Verify
          </a>
          <a href='#alerts' className='hover:text-blue-300 transition'>
            Live Alerts
          </a>
          <a href='#campus' className='hover:text-blue-300 transition'>
            Campus
          </a>
          <button className='rounded-xl bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500 transition'>
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className='px-6 py-16 md:py-24 text-center'>
        <div className='mx-auto max-w-4xl'>
          <div className='inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6'>
            <span className='h-2 w-2 rounded-full bg-blue-400 animate-pulse'></span>
            Real-time Digital Trust Engine
          </div>

          <h1 className='text-4xl md:text-6xl font-black leading-tight mb-6'>
            Check Before You Trust
          </h1>

          <p className='text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-8'>
            AI-powered verification for URLs, QR codes, SMS messages and
            digital threats.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <a
              href='#verify'
              className='rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 transition-all duration-300'
            >
              Start Verification
            </a>

            <a
              href='#alerts'
              className='rounded-2xl border border-white/15 px-8 py-4 font-semibold hover:bg-white/5 transition-all duration-300'
            >
              View Live Threats
            </a>
          </div>
        </div>
      </section>

      {/* URL Verification */}
      <section id='verify' className='px-6 pb-12'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='text-3xl'>🌐</div>
            <div>
              <h2 className='text-2xl font-bold'>
                Real-Time URL Verification Engine
              </h2>
              <p className='text-slate-300'>
                Paste any website link to analyze phishing risk, domain
                reputation and trust score.
              </p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-4'>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Paste URL here (e.g. https://amazon.in)'
              className='flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
            />

            <button
              onClick={analyzeUrl}
              disabled={loading}
              className='rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 disabled:opacity-60 transition-all duration-300'
            >
              {loading ? 'Analyzing...' : 'Check URL'}
            </button>
          </div>

          {result && (
            <div className='mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6'>
              <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-6'>
                <div className='flex items-center gap-4'>
                  <div
                    className={`h-4 w-4 rounded-full ${
                      result.color === 'green'
                        ? 'bg-green-400'
                        : result.color === 'yellow'
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                    }`}
                  ></div>

                  <div>
                    <h3 className='text-2xl font-bold'>{result.status}</h3>
                    <p className='text-slate-400'>Trust classification result</p>
                  </div>
                </div>

                <div className='text-center'>
                  <div className='text-4xl font-black'>{result.score}</div>
                  <div className='text-sm text-slate-400'>Trust Score</div>
                </div>
              </div>

              <div className='mb-6'>
                <div className='h-3 rounded-full bg-slate-700 overflow-hidden'>
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.color === 'green'
                        ? 'bg-green-500'
                        : result.color === 'yellow'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              <div className='space-y-3'>
                {result.detected.length > 0 ? (
                  result.detected.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className='flex items-center gap-3 rounded-xl bg-slate-800/60 p-3 text-slate-300'
                    >
                      <span className='text-red-400'>⚠️</span>
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-400/20 p-4 text-green-200'>
                    <span className='text-xl'>✅</span>
                    <span>No suspicious indicators detected.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SMS Detector */}
      <section className='px-6 pb-12'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='text-3xl'>📱</div>
            <div>
              <h2 className='text-2xl font-bold'>
                AI-Powered SMS Scam Detector
              </h2>
              <p className='text-slate-300'>
                Paste any SMS message to detect phishing, bank impersonation and
                scam patterns.
              </p>
            </div>
          </div>

          <div className='space-y-4'>
            <textarea
              rows={5}
              value={sms}
              onChange={(e) => setSms(e.target.value)}
              placeholder='Paste suspicious SMS here... Example: Dear Customer, your SBI account will be blocked. Update KYC immediately: http://sbi-verify-now.xyz'
              className='w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none'
            />

            <button
              onClick={analyzeSms}
              className='rounded-2xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500 transition-all duration-300'
            >
              Analyze SMS
            </button>
          </div>

          {smsResult && (
            <div className='mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-2xl font-bold'>SMS Analysis Result</h3>

                <div
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    smsResult.color === 'green'
                      ? 'bg-green-500 text-black'
                      : smsResult.color === 'yellow'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {smsResult.level}
                </div>
              </div>

              <div className='mb-6'>
                <div className='flex justify-between mb-2'>
                  <span className='text-slate-300'>Risk Score</span>
                  <span className='font-bold text-2xl'>
                    {smsResult.score}%
                  </span>
                </div>

                <div className='h-4 rounded-full bg-slate-700 overflow-hidden'>
                  <div
                    className={`h-full transition-all duration-700 ${
                      smsResult.color === 'green'
                        ? 'bg-green-500'
                        : smsResult.color === 'yellow'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${smsResult.score}%` }}
                  />
                </div>
              </div>

              <div className='space-y-3'>
                {smsResult.threats.length > 0 ? (
                  smsResult.threats.map((threat: string, index: number) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 rounded-xl bg-slate-800/60 p-3 text-slate-300'
                    >
                      <span className='text-red-400'>⚠️</span>
                      <span>{threat}</span>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-400/20 p-4 text-green-200'>
                    <span className='text-xl'>✅</span>
                    <span>No scam indicators detected.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* QR Section */}
      <section className='px-6 pb-12'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='text-3xl'>📷</div>
            <div>
              <h2 className='text-2xl font-bold'>QR Shield Verification</h2>
              <p className='text-slate-300'>
                Verify QR codes before scanning payment, login or registration
                links.
              </p>
            </div>
          </div>

          <div className='border-2 border-dashed border-blue-400/30 rounded-2xl p-10 text-center bg-slate-900/40'>
            <div className='text-5xl mb-4'>📱</div>
            <p className='text-slate-300 mb-4'>
              Drag & drop QR image or choose a file
            </p>

            <button className='rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition'>
              Choose QR Image
            </button>
          </div>

          <div className='mt-8 rounded-2xl border border-red-400/20 bg-red-500/10 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold text-red-300'>
                Verification Result
              </h3>
              <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white'>
                WARNING
              </span>
            </div>

            <div className='grid md:grid-cols-3 gap-4 mb-4'>
              <div>
                <p className='text-slate-400 text-sm'>Detected Domain</p>
                <p className='font-semibold'>paytm-secure-verify.xyz</p>
              </div>

              <div>
                <p className='text-slate-400 text-sm'>Trust Score</p>
                <p className='font-semibold'>38/100</p>
              </div>

              <div>
                <p className='text-slate-400 text-sm'>Community Reports</p>
                <p className='font-semibold'>17 reports</p>
              </div>
            </div>

            <p className='text-red-200 leading-7'>
              AI Warning: The QR redirects to a high-risk payment domain that
              has been reported multiple times by community users. Avoid
              entering UPI PIN, OTP or payment credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Threat Feed */}
      <section id='alerts' className='px-6 pb-20'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <span className='rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white'>
                  LIVE
                </span>
                <h2 className='text-2xl font-bold'>Live Threat Feed</h2>
              </div>

              <p className='text-slate-300'>
                Real-time community intelligence from reported URLs, QR codes
                and scam campaigns.
              </p>
            </div>
          </div>

          <div className='space-y-4'>
            {threatFeed.map((item, index) => (
              <div
                key={index}
                className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-slate-900/50 p-5 border border-white/5'
              >
                <div className='flex items-start gap-4'>
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      item.severity === 'HIGH'
                        ? 'bg-red-400'
                        : item.severity === 'MEDIUM'
                        ? 'bg-yellow-400'
                        : 'bg-green-400'
                    }`}
                  />

                  <div>
                    <h3 className='font-bold text-lg'>{item.title}</h3>
                    <p className='text-sm text-slate-400'>
                      Reported by {item.reports} users
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.severity === 'HIGH'
                        ? 'bg-red-500 text-white'
                        : item.severity === 'MEDIUM'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-500 text-black'
                    }`}
                  >
                    {item.severity}
                  </span>

                  <span className='text-sm text-slate-400'>🕒 {item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 rounded-2xl bg-blue-500/10 border border-blue-400/20 p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='text-2xl'>⚡</div>
              <h3 className='text-xl font-bold text-blue-200'>
                Why This Is Real-Time
              </h3>
            </div>

            <p className='text-slate-200 leading-7'>
              Each report updates the trust score and threat feed dynamically.
              When multiple users report the same QR, URL or SMS, CyberShield
              automatically increases the risk level and pushes a warning to the
              live community feed.
            </p>
          </div>
        </div>
      </section>

      {/* Campus + Evidence */}
      <section id='campus' className='px-6 pb-20'>
        <div className='mx-auto max-w-6xl grid lg:grid-cols-2 gap-8'>
          <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl'>
            <div className='text-center mb-8'>
              <div className='text-5xl mb-4'>🏫</div>
              <h2 className='text-3xl font-bold mb-2'>
                Campus Verification Hub
              </h2>
              <p className='text-slate-300'>
                Verify internships, placements, scholarships and official
                college notices.
              </p>
            </div>

            <div className='space-y-4'>
              {[
                {
                  title: 'Summer Internship Offer',
                  status: 'FAKE DETECTED',
                  color: 'red',
                },
                {
                  title: 'Campus Placement Drive',
                  status: 'VERIFIED',
                  color: 'green',
                },
                {
                  title: 'Government Scholarship Link',
                  status: 'CHECK REQUIRED',
                  color: 'yellow',
                },
                {
                  title: 'Official College Notice QR',
                  status: 'ADMIN VERIFIED',
                  color: 'green',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-2xl bg-slate-900/50 p-4 border border-white/5'
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.color === 'red'
                          ? 'bg-red-400'
                          : item.color === 'yellow'
                          ? 'bg-yellow-400'
                          : 'bg-green-400'
                      }`}
                    />

                    <span className='font-semibold text-white'>
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.color === 'red'
                        ? 'bg-red-500 text-white'
                        : item.color === 'yellow'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-500 text-black'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl'>
            <div className='text-center mb-8'>
              <div className='text-5xl mb-4'>📂</div>
              <h2 className='text-3xl font-bold mb-2'>Evidence Vault</h2>
              <p className='text-slate-300'>
                Securely store screenshots, QR images, receipts and scam
                evidence with case tracking.
              </p>
            </div>

            <div className='border-2 border-dashed border-blue-400/30 rounded-2xl p-8 text-center bg-slate-900/40'>
              <div className='text-4xl mb-3'>📎</div>
              <p className='text-slate-300 mb-4'>
                Upload screenshots, PDFs, transaction receipts or suspicious
                messages
              </p>

              <button className='rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition'>
                Upload Evidence
              </button>
            </div>

            <div className='mt-6 rounded-2xl border border-green-400/20 bg-green-500/10 p-5'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-3 h-3 rounded-full bg-green-400 animate-pulse'></div>
                  <span className='font-bold text-green-300'>
                    Case Generated
                  </span>
                </div>

                <span className='text-xs text-slate-300'>
                  2026-07-23 10:42
                </span>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='text-slate-400'>Case ID</p>
                  <p className='font-bold text-white'>CS-2026-1042</p>
                </div>

                <div>
                  <p className='text-slate-400'>Category</p>
                  <p className='font-semibold text-white'>
                    Fake Internship Scam
                  </p>
                </div>

                <div>
                  <p className='text-slate-400'>Evidence Count</p>
                  <p className='font-semibold text-white'>4 files</p>
                </div>

                <div>
                  <p className='text-slate-400'>Status</p>
                  <span className='inline-flex rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black'>
                    UNDER REVIEW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-white/10 px-6 py-8 text-center text-slate-400'>
        <p>
          🛡️ <strong>CyberShield: Verification Portal</strong> — AI-Powered
          Digital Trust Platform
        </p>
      </footer>
    </main>
  );
}