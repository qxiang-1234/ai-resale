import { getPlatformBadgeLabel } from "../utils/platform";
import styles from "./ListingPreview.module.css";

type ListingPreviewProps = {
  platform: string;
  result: string;
  error: string;
  loading: boolean;
  copied: boolean;
  onCopy: () => void;
};

export function ListingPreview({
  platform,
  result,
  error,
  loading,
  copied,
  onCopy,
}: ListingPreviewProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Generated Listing</h2>

        <span className={styles.badge}>{getPlatformBadgeLabel(platform)}</span>
      </div>

      {!result && !error && !loading && (
        <div className={styles.placeholder}>
          Your AI-generated listing will appear here.
        </div>
      )}

      {loading && (
        <div className={styles.skeleton}>
          <div className={styles.skeletonContent}>
            <div className={`${styles.skeletonLine} ${styles.short}`} />
            <div className={`${styles.skeletonLine} ${styles.full}`} />
            <div className={`${styles.skeletonLine} ${styles.long}`} />
            <div className={`${styles.skeletonLine} ${styles.medium}`} />
            <div className={`${styles.skeletonLine} ${styles.tiny}`} />
            <div className={`${styles.skeletonLine} ${styles.long}`} />
          </div>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {result && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <p className={styles.resultLabel}>Ready to post</p>

            <button onClick={onCopy} className={styles.copyButton}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <pre className={styles.pre}>{result}</pre>
        </div>
      )}
    </section>
  );
}
