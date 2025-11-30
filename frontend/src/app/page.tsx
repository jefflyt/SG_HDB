import Link from "next/link";
import { ArrowRight, TrendingUp, Map, BarChart3, FileSearch, BookmarkCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <span className="text-xl font-bold text-white">HDB</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">Buyer Assistant</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
            >
              Launch Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            <span>Free, Transparent HDB Market Analytics</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            Make Smarter HDB
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Buying Decisions
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Your comprehensive analytics platform for Singapore&apos;s HDB resale market.
            Analyze 212,000+ transactions, discover trends, and find your perfect home—backed by real data.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:scale-105"
            >
              Explore Dashboard
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-md transition-all hover:border-slate-400 hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">212K+</div>
              <div className="text-sm font-medium text-slate-600">Transactions Analyzed</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="text-3xl font-bold text-indigo-600">&lt;2s</div>
              <div className="text-sm font-medium text-slate-600">Page Load Time</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm font-medium text-slate-600">Free & Open Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">Powerful Features</h2>
          <p className="text-lg text-slate-600">
            Everything you need to analyze the HDB resale market in one place
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-blue-300 hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">Price Trends</h3>
            <p className="text-slate-600">
              Interactive charts showing monthly price movements across different flat types and towns.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">Geographic Analysis</h3>
            <p className="text-slate-600">
              Compare prices and volumes across towns with interactive maps and heatmaps.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-purple-300 hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">Market Insights</h3>
            <p className="text-slate-600">
              Year-over-year analysis, momentum indicators, and seasonal patterns at your fingertips.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-teal-300 hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
              <FileSearch className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">Data Explorer</h3>
            <p className="text-slate-600">
              Advanced filtering by town, flat type, price range, and more. Export to CSV for offline analysis.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-rose-300 hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
              <BookmarkCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">My Shortlist</h3>
            <p className="text-slate-600">
              Save interesting properties and add personal notes on renovation, facing, and ratings.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-amber-300 hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">Amenities Map</h3>
            <p className="text-slate-600">
              View nearby MRT stations, schools, malls, and carparks for location scouting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Find Your Perfect HDB?
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Start exploring comprehensive market insights today—completely free.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-xl transition-all hover:shadow-2xl hover:scale-105"
          >
            Launch Dashboard
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <span className="text-sm font-bold text-white">HDB</span>
              </div>
              <span className="font-semibold text-slate-900">Buyer Assistant</span>
            </div>
            <p className="text-sm text-slate-600">
              Data sourced from{" "}
              <a
                href="https://data.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                Data.gov.sg
              </a>
              {" "}and{" "}
              <a
                href="https://www.onemap.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                OneMap API
              </a>
            </p>
            <p className="text-sm text-slate-500">
              © 2025 HDB Buyer Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
