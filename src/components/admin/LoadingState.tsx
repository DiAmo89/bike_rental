export default function LoadingState() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      <p className="mt-4 text-sm text-gray-500">Loading data...</p>
    </div>
  );
}
