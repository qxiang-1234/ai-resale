import { platforms } from "../utils/platform";

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
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Item Details</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <select
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value)}
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
            onChange={(event) => onItemChange(event.target.value)}
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
            onChange={(event) => onConditionChange(event.target.value)}
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
            onChange={(event) => onFeaturesChange(event.target.value)}
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
          onClick={onGenerate}
          disabled={loading}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Listing"}
        </button>
      </div>
    </section>
  );
}
