type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <h3 className="text-xl font-semibold text-red-700">Something went wrong</h3>
      <p className="mt-2 text-sm text-red-600">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
