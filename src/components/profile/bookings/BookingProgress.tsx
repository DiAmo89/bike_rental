type Props = {
    progress: number;
  };
  
  export default function BookingProgress({ progress }: Props) {
    return (
      <div className="mb-6 rounded-2xl bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-base font-medium">Booking progress</span>
          <span className="text-base text-gray-600">{progress}%</span>
        </div>
  
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }
  