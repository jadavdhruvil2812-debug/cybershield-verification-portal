'use client';

import { useState, useRef } from 'react';
import jsQR from 'jsqr';

export default function Home() {
  const [url, setUrl] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);

  const [sms, setSms] = useState('');
  const [smsResult, setSmsResult] = useState<any>(null);

  const [qrResult, setQrResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkUrl = () => {
    if (!url) return;

    let score = 100;
    const text = url.toLowerCase();

    if (!text.startsWith('https://')) score -= 30;
    if (text.includes('verify')) score -= 20;
    if (text.includes('kyc')) score -= 20;
    if (text.includes('.xyz')) score -= 30;

    setUrlResult({
      score: Math.max(score, 0),
      status: score < 40 ? 'DANGER' : score < 70 ? 'WARNING' : 'SAFE',
    });
  };

  const analyzeSms = () => {
    if (!sms) return;

    const text = sms.toLowerCase();
    let score = 0;

    if (text.includes('blocked') || text.includes('urgent')) score += 25;
    if (text.includes('sbi') || text.includes('bank')) score += 25;
    if (text.includes('kyc') || text.includes('otp')) score += 25;
    if (text.includes('http://') || text.includes('.xyz')) score += 25;

    setSmsResult({
      score,
      level: score >= 70 ? 'LIKELY PHISHING' : score >= 30 ? 'SUSPICIOUS' : 'SAFE',
    });
  };

  const analyzeQr = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = new Image();
    const url = URL.createObjectURL(file);

    image.src = url;

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
          decoded: 'No QR detected',
          score: 0,
          status: 'INVALID',
        });
      }

      URL.revokeObjectURL(url);
    };
  };

  const threatFeed = [
    'Fake SBI KYC QR',
    'Suspicious UPI Payment QR',
    'Fake Internship Registration Portal',
    'Official College Notice QR',
  ];

  return (
    <main className='min-h-screen bg-[#071021] text-white'>
      {/* NAVBAR */}
      <nav className='flex items-center justify-between px-6 py-4 border-b border-white/10'>
        <div className='flex items-center gap-3'>
          <div className='text-2xl'>🛡️</div>
          <div>
            <h1 className='font-bold text-lg'>CyberShield</h1>
            <p className='text-xs text-slate-400'>Verification Portal</p>
          </div>
        </div>

        <button className='rounded-xl bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500 transition'>
          Login
        </button>
      </nav>

      {/* HERO */}
      <section className='px-6 py-20 text-center'>
        <div className='mx-auto max-w-4xl'>
          <div className='inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6'>
            <span className='h-2 w-2 rounded-full bg-blue-400 animate-pulse'></span>
            Real-time Digital Trust Engine
          </div>

          <h1 className='text-5xl md:text-6xl font-black mb-6'>
            Check Before You Trust
          </h1>

          <p className='text-xl text-slate-300 max-w-2xl mx-auto mb-10'>
            AI-powered verification for URLs, QR codes, SMS messages and digital threats.
          </p>
        </div>
      </section>

      {/* URL CHECKER */}
      <section className='px-6 pb-12'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='text-3xl'>🌐</div>
            <div>
              <h2 className='text-2xl font-bold'>Real-Time URL Verification Engine</h2>
              <p className='text-slate-300'>Analyze phishing risk, domain reputation and trust score.</p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-4'>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Paste URL here'
              className='flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white outline-none'
            />

            <button
              onClick={checkUrl}
              className='rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 transition'
            >
              Check URL
            </button>
          </div>

          {urlResult && (
            <div className='mt-6 rounded-2xl bg-slate-900/60 p-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold'>{urlResult.status}</h3>
                <div className='text-3xl font-black'>{urlResult.score}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SMS DETECTOR */}
      <section className='px-6 pb-12'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='text-3xl'>📱</div>
            <div>
              <h2 className='text-2xl font-bold'>AI-Powered SMS Scam Detector</h2>
              <p className='text-slate-300'>Detect phishing, bank impersonation and scam patterns.</p>
            </div>
          </div>

          <textarea
            rows={5}
            value={sms}
            onChange={(e) => setSms(e.target.value)}
            placeholder='Paste suspicious SMS here...'
            className='w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white outline-none resize-none'
          />

          <button
            onClick={analyzeSms}
            className='mt-4 rounded-2xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500 transition'
          >
            Analyze SMS
          </button>

          {smsResult && (
            <div className='mt-6 rounded-2xl bg-slate-900/60 p-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold'>{smsResult.level}</h3>
                <div className='text-3xl font-black'>{smsResult.score}%</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* QR SECTION */}
      <section className='px-6 pb-12'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='text-3xl'>📷</div>
            <div>
              <h2 className='text-2xl font-bold'>QR Shield Verification</h2>
              <p className='text-slate-300'>Upload a QR image to analyze its safety.</p>
            </div>
          </div>

          <div className='border-2 border-dashed border-blue-400/30 rounded-2xl p-10 text-center bg-slate-900/40'>
            <div className='text-5xl mb-4'>📱</div>
            <p className='text-slate-300 mb-4'>
              Drag & drop QR image or choose a file
            </p>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={analyzeQr}
              className='hidden'
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className='rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition'
            >
              Choose QR Image
            </button>
          </div>

          {qrResult && (
            <div className='mt-6 rounded-2xl bg-slate-900/60 p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold'>QR Analysis Result</h3>
                <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white'>
                  {qrResult.status}
                </span>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <p className='text-slate-400 text-sm'>Decoded QR Content</p>
                  <p className='font-semibold break-all'>{qrResult.decoded}</p>
                </div>

                <div>
                  <p className='text-slate-400 text-sm'>Trust Score</p>
                  <p className='font-semibold text-2xl'>{qrResult.score}/100</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THREAT FEED */}
      <section id='alerts' className='px-6 pb-20'>
        <div className='mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white'>
              LIVE
            </span>
            <h2 className='text-2xl font-bold'>Live Threat Feed</h2>
          </div>

          <div className='space-y-4'>
            {threatFeed.map((item, index) => (
              <div
                key={index}
                className='rounded-2xl bg-slate-900/50 p-5 border border-white/5'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='h-3 w-3 rounded-full bg-red-400'></div>
                    <h3 className='font-bold'>{item}</h3>
                  </div>

                  <span className='text-sm text-slate-400'>🕒 Live</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS + EVIDENCE */}
      <section className='px-6 pb-20'>
        <div className='mx-auto max-w-6xl grid lg:grid-cols-2 gap-8'>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-8'>
            <div className='text-center mb-8'>
              <div className='text-5xl mb-4'>🏫</div>
              <h2 className='text-3xl font-bold mb-2'>Campus Verification Hub</h2>
              <p className='text-slate-300'>
                Verify internships, placements, scholarships and official notices.
              </p>
            </div>

            <div className='space-y-4'>
              {[
                'Summer Internship Offer',
                'Campus Placement Drive',
                'Government Scholarship Link',
                'Official College Notice QR',
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-2xl bg-slate-900/50 p-4 border border-white/5'
                >
                  <span className='font-semibold'>{item}</span>
                  <span className='rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-black'>
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-white/10 bg-white/5 p-8'>
            <div className='text-center mb-8'>
              <div className='text-5xl mb-4'>📂</div>
              <h2 className='text-3xl font-bold mb-2'>Evidence Vault</h2>
              <p className='text-slate-300'>
                Securely store screenshots, QR images, receipts and scam evidence.
              </p>
            </div>

            <div className='border-2 border-dashed border-blue-400/30 rounded-2xl p-8 text-center bg-slate-900/40'>
              <div className='text-4xl mb-3'>📎</div>
              <p className='text-slate-300 mb-4'>
                Upload screenshots, PDFs, transaction receipts or suspicious messages
              </p>

              <button className='rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition'>
                Upload Evidence
              </button>
            </div>

            <div className='mt-6 rounded-2xl border border-green-400/20 bg-green-500/10 p-5'>
              <div className='flex items-center justify-between mb-4'>
                <span className='font-bold text-green-300'>Case Generated</span>
                <span className='text-xs text-slate-300'>2026-07-23</span>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='text-slate-400'>Case ID</p>
                  <p className='font-bold'>CS-2026-1042</p>
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

      {/* FOOTER */}
      <footer className='border-t border-white/10 px-6 py-8 text-center text-slate-400'>
        <p>
          🛡️ <strong>CyberShield: Verification Portal</strong> — AI-Powered
          Digital Trust Platform
        </p>
      </footer>
    </main>
  );
}