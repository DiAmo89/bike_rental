type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  const baseClasses =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium";

  if (normalizedStatus === "available") {
    return (
      <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
        <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
        {status}
      </span>
    );
  }

  if (normalizedStatus === "rented") {
    return (
      <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
        <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
        {status}
      </span>
    );
  }

  if (normalizedStatus === "in repair") {
    return (
      <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
        <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
        {status}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
      <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
      {status}
    </span>
  );
}
