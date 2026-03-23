import { bikesService } from "@/services/bikes.service";
import { notFound } from "next/navigation";
import BookingContainer from "@/components/booking/BookingContainer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: PageProps) {
  const { id } = await params;

  const bike = await bikesService.getBikeById(id);

  if (!bike) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl mt-16 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/catalog/${id}`}
        className="mb-6 inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors uppercase tracking-wider"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to bike details
      </Link>

      <BookingContainer bike={bike} />
    </div>
  );
}
