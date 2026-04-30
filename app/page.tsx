"use client";

import { ListingForm } from "./components/ListingForm";
import { ListingPreview } from "./components/ListingPreview";
import { useListingGenerator } from "./hooks/useListingGenerator";
import { getPlatformBadgeLabel } from "./utils/platform";
import styles from "./page.module.css";

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
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.header}>
          <div className={styles.headerMeta}>
            <p className={styles.kicker}>AI Resale Assistant</p>

            <span className={styles.badge}>
              {getPlatformBadgeLabel(platform)}
            </span>
          </div>

          <h1 className={styles.title}>
            Generate second-hand product listings with AI
          </h1>

          <p className={styles.description}>
            Enter basic item details, choose a resale platform, and generate a
            ready-to-post listing.
          </p>
        </section>

        <div className={styles.grid}>
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
