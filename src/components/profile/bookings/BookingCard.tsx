"use client";

import Image from "next/image";
import { useState } from "react";
import BookingProgress from "./BookingProgress";
import type { BookingListItem } from "./bookings.types";

type Props = {
  booking: BookingListItem;
  variant: "current" | "past";
};

function BookingImage({ src, alt }: { src: string | null; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-xs text-gray-500">
        No image
      </div>
    );
  }

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-contain p-1"
        onError={() => setError(true)}
        sizes="96px"
      />
    </div>
  );
}

function getStatusLabel(status: BookingListItem["status"]) {
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

function getStatusBadgeStyles(status: BookingListItem["status"]) {
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

function formatPrice(value: number) {
  return `€${value.toFixed(2)}`;
}

function getBookingProgress(startDate: string, endDate: string) {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const current = today.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();

  if (current <= startTime) return 0;
  if (current >= endTime) return 100;

  const totalDuration = endTime - startTime;
  const elapsedDuration = current - startTime;

  return Math.round((elapsedDuration / totalDuration) * 100);
}

export default function BookingCard({ booking, variant }: Props) {
  const isPast = variant === "past";

  const progress =
    booking.status === "active"
      ? getBookingProgress(booking.startDate, booking.endDate)
      : 0;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold">{booking.title}</h3>

        <span
          className={`rounded-full px-4 py-1 text-sm font-medium ${getStatusBadgeStyles(
            booking.status
          )}`}
        >
          {getStatusLabel(booking.status)}
        </span>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row">
        <div className="flex gap-4">
          <BookingImage src={booking.image} alt={booking.title} />

          <div className="space-y-2">
            <p className="line-clamp-3 text-lg text-gray-600">
              {booking.subtitle}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-base text-gray-700">
              <p>
                <span className="font-bold">Pick-up:</span> {booking.startDate}
              </p>
              <p>
                <span className="font-bold">Return:</span> {booking.endDate}
              </p>
            </div>
          </div>
        </div>

        <div className="text-left md:min-w-35 md:text-right">
          <p className="text-3xl font-semibold">
            {formatPrice(booking.totalPrice)}
          </p>
          <p className="mt-1 text-base text-gray-500">Total paid</p>
        </div>
      </div>

      {!isPast && (
        <>
          {booking.status === "active" && <BookingProgress progress={progress} />}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button className="rounded-xl border border-gray-300 px-5 py-4 text-lg font-medium transition hover:bg-gray-50">
              View Details
            </button>
            <button className="rounded-xl bg-black px-5 py-4 text-lg font-medium text-white transition hover:bg-gray-800">
              Contact Support
            </button>
          </div>
        </>
      )}
    </article>
  );
}
