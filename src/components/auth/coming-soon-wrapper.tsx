import { Info } from "lucide-react";

export default function ComingSoonMessage() {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
      <div className="flex items-center justify-center gap-2 text-amber-500 mb-2">
        <Info className="h-5 w-5" />
        <span className="font-medium">Coming Soon</span>
      </div>
      <p className="text-sm text-zinc-400">
        This feature is under development and will be available in the next
        update.
      </p>
    </div>
  );
}
