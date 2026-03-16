import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import PaymentSection from "@/components/booking/PaymentSection";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-7xl mt-16 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        // href={`/catalog/${params.id}`}
        href="/catalog"
        className="mb-6 inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to bike details
      </Link>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <BookingForm />
          <PaymentSection />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
