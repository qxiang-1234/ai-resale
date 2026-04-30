"use client";

import { useListingGenerator } from "./hooks/useListingGenerator";
import { getPlatformBadgeLabel, platforms } from "./utils/platform";

export default function Home() {
  const {
    platform,
    setPlatform,
    item,
    setItem,
    condition,
    setCondition,
    features,
    setFeatures,
    result,
    error,
    validationError,
    loading,
    copied,
    handleGenerateListing,
    handleCopyListing,
  } = useListingGenerator();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-gray-500">
              AI Resale Assistant
            </p>

            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
              {getPlatformBadgeLabel(platform)}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Generate second-hand product listings with AI
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Enter basic item details, choose a resale platform, and generate a
            ready-to-post listing.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Item Details</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(event) => setPlatform(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
                >
                  {platforms.map((platformOption) => (
                    <option key={platformOption} value={platformOption}>
                      {platformOption}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item <span className="text-red-500">*</span>
                </label>
                <input
                  value={item}
                  onChange={(event) => setItem(event.target.value)}
                  placeholder="e.g. standing lamp"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <input
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                  placeholder="e.g. used, good condition"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <textarea
                  value={features}
                  onChange={(event) => setFeatures(event.target.value)}
                  placeholder="e.g. 3 brightness levels, adjustable angle"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              {validationError && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {validationError}
                </div>
              )}

              <button
                onClick={handleGenerateListing}
                disabled={loading}
                className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Listing"}
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Generated Listing</h2>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {getPlatformBadgeLabel(platform)}
              </span>
            </div>

            {!result && !error && !loading && (
              <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-500">
                Your AI-generated listing will appear here.
              </div>
            )}

            {loading && (
              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="space-y-4">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="mt-6 h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    Ready to post
                  </p>

                  <button
                    onClick={handleCopyListing}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-800">
                  {result}
                </pre>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
