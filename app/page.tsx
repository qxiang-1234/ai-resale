"use client";

import { useState } from "react";

export default function Home() {
  const [item, setItem] = useState("");
  const [condition, setCondition] = useState("");
  const [features, setFeatures] = useState("");
  const [platform, setPlatform] = useState("Facebook Marketplace");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerateListing() {
    setLoading(true);
    setResult("");
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          condition,
          features,
          platform,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate listing.");
      }

      setResult(data.result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check if Ollama is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyListing() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to copy listing.");
    }
  }

  const isDisabled = loading || !item.trim();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500">
            AI Resale Assistant
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Generate second-hand product listings with AI
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Enter basic item details, and the assistant will generate a
            realistic marketplace listing for you.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Item Details</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(event) => setPlatform(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
                >
                  <option value="Facebook Marketplace">
                    Facebook Marketplace
                  </option>
                  <option value="eBay">eBay</option>
                  <option value="Xianyu">Xianyu</option>
                  <option value="Xiaohongshu">Xiaohongshu</option>
                </select>
              </div>

              <button
                onClick={handleGenerateListing}
                disabled={isDisabled}
                className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Listing"}
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Generated Listing</h2>

            {!result && !error && (
              <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-500">
                Your AI-generated listing will appear here.
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
