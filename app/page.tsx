"use client";

import { ListingForm } from "./components/ListingForm";
import { ListingPreview } from "./components/ListingPreview";
import { useListingGenerator } from "./hooks/useListingGenerator";
import { getPlatformBadgeLabel } from "./utils/platform";

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
          <ListingForm
            platform={platform}
            item={item}
            condition={condition}
            features={features}
            validationError={validationError}
            loading={loading}
            onPlatformChange={setPlatform}
            onItemChange={setItem}
            onConditionChange={setCondition}
            onFeaturesChange={setFeatures}
            onGenerate={handleGenerateListing}
          />

          <ListingPreview
            platform={platform}
            result={result}
            error={error}
            loading={loading}
            copied={copied}
            onCopy={handleCopyListing}
          />
        </div>
      </div>
    </main>
  );
}
