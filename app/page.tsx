export default function Home() {
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
          <a href="#evidence" className="hover:text-white">Evidence</a>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 transition">
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Real-time Digital Trust Engine
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Check Before
              <span className="text-blue-400"> You Trust</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-8 max-w-xl">
              Verify URLs, QR codes, SMS, emails and phone numbers using AI-assisted analysis,
              community intelligence and dynamic trust scoring.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition">
                Start Verification
              </button>
              <button className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/5 transition">
                View Live Threats
              </button>
            </div>

            {/* Live Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-bold text-green-400">12K+</div>
                <div className="text-sm text-slate-300">Links Verified</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-bold text-red-400">2,341</div>
                <div className="text-sm text-slate-300">Scams Blocked</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-bold text-blue-400">98%</div>
                <div className="text-sm text-slate-300">Detection Rate</div>
              </div>
            </div>
          </div>

          {/* Live Threat Card */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="font-semibold">Live Threat Feed</span>
                </div>
                <span className="text-xs text-slate-400">Updated now</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-red-500/10 border border-red-400/20 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-red-300">Fake SBI KYC Link</div>
                      <div className="text-sm text-slate-300 mt-1">Reported by 12 users • 2 min ago</div>
                    </div>
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold">HIGH</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-yellow-500/10 border border-yellow-400/20 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-yellow-300">Suspicious QR Payment</div>
                      <div className="text-sm text-slate-300 mt-1">Community warning active</div>
                    </div>
                    <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">MED</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-green-500/10 border border-green-400/20 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-green-300">Official College Notice</div>
                      <div className="text-sm text-slate-300 mt-1">Verified by CyberShield</div>
                    </div>
                    <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-black">SAFE</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-blue-500/10 border border-blue-400/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-200">Trust Score</span>
                  <span className="text-sm font-bold text-blue-300">18/100</span>
                </div>
                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-red-500 to-yellow-500"></div>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Score changes dynamically based on community reports and verification history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Modules */}
      <section id="verify" className="px-6 py-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Universal Verification Hub</h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
              One platform to verify every digital interaction before you trust it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌐", title: "URL Check", desc: "Website reputation and phishing detection" },
              { icon: "📱", title: "QR Shield", desc: "Verify QR destinations before scanning" },
              { icon: "💬", title: "SMS Check", desc: "Detect scam and phishing messages" },
              { icon: "📧", title: "Email Check", desc: "Analyze suspicious email senders" },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Module */}
      <section id="campus" className="px-6 py-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Campus Security Module</h2>
            <p className="mt-4 text-slate-300">
              Protect students from fake placements, internships and scholarship scams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">🎓 Student Protection</h3>
              <ul className="space-y-3 text-slate-300">
                <li>• Fake internship verification</li>
                <li>• Placement company verification</li>
                <li>• Scholarship link verification</li>
                <li>• Fee payment QR verification</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">🏫 Faculty & Admin Tools</h3>
              <ul className="space-y-3 text-slate-300">
                <li>• Official notice verification</li>
                <li>• Event authenticity checking</li>
                <li>• Verified organization registry</li>
                <li>• Campus threat analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Vault */}
      <section id="evidence" className="px-6 py-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Evidence Vault & Case Tracking</h2>
            <p className="mt-4 text-slate-300 leading-8">
              Upload screenshots, PDFs, audio files and chat exports. CyberShield generates a
              timestamped case ID and complaint-ready report for cyber crime reporting.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">SHA-256 Hash</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Case ID</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">PDF Export</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Case Preview</h3>
              <span className="text-xs text-green-400">Auto Generated</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Case ID</span>
                <span>CYB-2026-1042</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Status</span>
                <span className="text-yellow-400">Under Review</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Evidence Files</span>
                <span>4 Uploaded</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Generated</span>
                <span>22 Jul 2026</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500 transition">
              Download Complaint PDF
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span>CyberShield: Verification Portal</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Real-time Verification</span>
            <span>Community Intelligence</span>
            <span>Digital Trust Platform</span>
          </div>
        </div>
      </footer>
    </main>
  );
}