import Image from "next/image";
import Link from "next/link";

type AccessoryItem = {
  id: string;
  name: string;
  pricePerDay: string;
};

type BookingDetailsCardData = {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  bike: {
    brand: string | null;
    model: string | null;
    description: string | null;
    image: string | null;
    pricePerDay: string;
  };
  accessories: AccessoryItem[];
};

type Props = {
  booking: BookingDetailsCardData;
};

function formatMoney(value: string) {
  return `€${Number(value).toFixed(2)}`;
}

function getBookingStatus(startDate: string, endDate: string) {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return "upcoming";
  if (today > end) return "completed";
  return "active";
}

function getStatusLabel(status: ReturnType<typeof getBookingStatus>) {
  switch (status) {
    case "active":
      return "In Progress";
    case "upcoming":
      return "Upcoming";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

function getStatusBadgeStyles(status: ReturnType<typeof getBookingStatus>) {
  switch (status) {
    case "active":
      return "bg-black text-white";
    case "upcoming":
      return "bg-gray-100 text-gray-800";
    case "completed":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getDurationInDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const utcStart = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.max(1, Math.round((utcEnd - utcStart) / (1000 * 60 * 60 * 24)));
}

function BookingImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500">
        No image
      </div>
    );
  }

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-contain p-4"
        sizes="(max-width: 1024px) 100vw, 420px"
      />
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-gray-100 py-4 last:border-b-0">
      <span className="text-base text-gray-500">{label}</span>
      <span className="text-right text-xl font-semibold text-black">{value}</span>
    </div>
  );
}

export default function BookingDetailsCard({ booking }: Props) {
  const bikeTitle =
    [booking.bike.brand, booking.bike.model].filter(Boolean).join(" ") ||
    "Bike";

  const status = getBookingStatus(booking.startDate, booking.endDate);
  const rentalDays = getDurationInDays(booking.startDate, booking.endDate);

  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Link
            href="/user-profile/bookings"
            className="mb-4 inline-flex text-sm text-gray-500 transition hover:text-black"
          >
            ← Back to bookings
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {bikeTitle}
          </h1>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${getStatusBadgeStyles(
            status
          )}`}
        >
          {getStatusLabel(status)}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
        <BookingImage src={booking.bike.image} alt={bikeTitle} />

        <div className="space-y-6">
          <div className="rounded-2xl bg-gray-50 px-5 py-2">
            <DetailRow label="Pick-up" value={booking.startDate} />
            <DetailRow label="Return" value={booking.endDate} />
            <DetailRow label="Total paid" value={formatMoney(booking.totalPrice)} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl  p-5">
              <p className="text-sm text-gray-500">Rental period</p>
              <p className="mt-2 text-2xl font-semibold">
                {rentalDays} {rentalDays === 1 ? "day" : "days"}
              </p>
            </div>

            <div className="rounded-2xl  p-5">
              <p className="text-sm text-gray-500">Accessories</p>
              <p className="mt-2 text-2xl font-semibold">
                {booking.accessories.length}
              </p>
            </div>
          </div>

          
        </div>

        {booking.bike.description && (
            <section className="rounded-2xl border border-gray-200 p-5">
              <h2 className="mb-3 text-lg font-semibold">Bike description</h2>
              <p className="leading-7 text-gray-600">
                {booking.bike.description}
              </p>
            </section>
          )}

          <section className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Accessories</h2>
              <span className="text-sm text-gray-500">
                {booking.accessories.length === 0
                  ? "No extras selected"
                  : `${booking.accessories.length} selected`}
              </span>
            </div>

            {booking.accessories.length === 0 ? (
              <div className="rounded-2xl  p-4 text-gray-500">
                No accessories added to this booking.
              </div>
            ) : (
              <div className="space-y-3">
                {booking.accessories.map((accessory) => (
                  <div
                    key={accessory.id}
                    className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4"
                  >
                    <div>
                      <p className="font-medium">{accessory.name}</p>
                      <p className="text-sm text-gray-500">Accessory</p>
                    </div>

                    <p className="text-base font-semibold">
                      {formatMoney(accessory.pricePerDay)}
                      <span className="ml-1 text-sm font-normal text-gray-500">
                        / day
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          
        
      </div>
    </article>
  );
}
