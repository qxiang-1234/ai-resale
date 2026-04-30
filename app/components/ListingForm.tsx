import { platforms } from "../utils/platform";
import styles from "./ListingForm.module.css";

type ListingFormProps = {
  platform: string;
  item: string;
  condition: string;
  features: string;
  validationError: string;
  loading: boolean;
  onPlatformChange: (value: string) => void;
  onItemChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onFeaturesChange: (value: string) => void;
  onGenerate: () => void;
};

export function ListingForm({
  platform,
  item,
  condition,
  features,
  validationError,
  loading,
  onPlatformChange,
  onItemChange,
  onConditionChange,
  onFeaturesChange,
  onGenerate,
}: ListingFormProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Item Details</h2>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Platform</label>
          <select
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value)}
            className={styles.select}
          >
            {platforms.map((platformOption) => (
              <option key={platformOption} value={platformOption}>
                {platformOption}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Item <span className={styles.required}>*</span>
          </label>
          <input
            value={item}
            onChange={(event) => onItemChange(event.target.value)}
            placeholder="e.g. standing lamp"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Condition</label>
          <input
            value={condition}
            onChange={(event) => onConditionChange(event.target.value)}
            placeholder="e.g. used, good condition"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Features</label>
          <textarea
            value={features}
            onChange={(event) => onFeaturesChange(event.target.value)}
            placeholder="e.g. 3 brightness levels, adjustable angle"
            rows={5}
            className={styles.textarea}
          />
        </div>

        {validationError && (
          <div className={styles.validationError}>{validationError}</div>
        )}

        <button
          onClick={onGenerate}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Generating..." : "Generate Listing"}
        </button>
      </div>
    </section>
  );
}
