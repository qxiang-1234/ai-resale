import { getPlatformBadgeLabel } from "../utils/platform";

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
            <p className="text-sm font-medium text-gray-700">Ready to post</p>

            <button
              onClick={onCopy}
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
  );
}
