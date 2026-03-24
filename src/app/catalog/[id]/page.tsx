import Link from "next/link";
import { notFound } from "next/navigation";
import { bikesService } from "@/services/bikes.service";
import BikeImage from "@/components/catalog/bike-image";
import BikeAvailability from "@/components/catalog/bike-availability";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BikeDetailPage({ params }: PageProps) {
  const { id } = await params;

  const bike = await bikesService.getBikeById(id);

  if (!bike) {
    notFound();
  }

  const displayPrice = Number(bike.pricePerDay);
  const displayStatus = bike.isActive ? "Available" : "Busy";

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/catalog"
          className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-2 group uppercase tracking-widest"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to selection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Левая колонка */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative w-full rounded-[1.8rem] overflow-hidden">
              {bike.image ? (
                <div className="bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
                  <div className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden">
                    <BikeImage
                      src={bike.image}
                      alt={`${bike.brand} ${bike.model}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[400px] md:h-[600px] w-full bg-gray-50 dark:bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-200 dark:border-slate-800">
                  <span className="text-8xl mb-4">🚲</span>
                  <p className="font-black uppercase tracking-[0.2em] text-xs">
                    Visual pending
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6">
                About this bike
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {bike.description ||
                  "This premium model is meticulously maintained and ready for your next adventure. Contact us for detailed technical specifications."}
              </p>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="lg:col-span-4 sticky top-10">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 flex flex-col gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Order Summary
                </h2>
                <div className="w-10 h-1 bg-[#e6ff2a] rounded-full"></div>

                <div className="flex justify-between items-start">
                  <div>
                    {/* Категория (Badge) */}
                    <div className="mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black bg-[#e6ff2a] px-2 py-1 rounded inline-block shadow-sm">
                        {bike.category?.name || "General"}
                      </span>
                    </div>

                    <h1 className="text-3xl font-black uppercase leading-tight tracking-tighter dark:text-white">
                      {bike.brand}
                    </h1>
                    <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter text-gray-400">
                      {bike.model}
                    </h3>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-tighter ${
                      bike.isActive 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {displayStatus}
                  </div>
                </div>
              </div>

              <BikeAvailability bikeId={id} />

              <div className="space-y-4 border-t border-gray-50 dark:border-slate-800 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Category</span>
                  <span className="font-bold text-gray-900 dark:text-white uppercase">
                    {bike.category?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Rental rate</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    €{displayPrice.toLocaleString("de-DE")} 
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Duration</span>
                  <span className="font-bold text-gray-900 dark:text-white">1 Day</span>
                </div>

                <div className="pt-6 border-t border-gray-900 dark:border-gray-700 mt-4 flex justify-between items-baseline">
                  <span className="font-black text-gray-900 dark:text-white uppercase text-sm">
                    Total per day
                  </span>
                  <span className="text-4xl font-black text-gray-900 dark:text-white leading-none">
                   €{displayPrice.toLocaleString("de-DE")} 
                  </span>
                </div>
              </div>

              <div className="mt-2">
                {bike.isActive ? (
                  <Link href={`/catalog/${bike.id}/booking`} className="block">
                    <button className="w-full bg-[#e6ff2a] hover:bg-black hover:text-[#e6ff2a] dark:hover:bg-white dark:hover:text-black text-black py-6 rounded-2xl font-black transition-all duration-300 uppercase tracking-widest text-sm shadow-lg active:scale-95">
                      Confirm & Book Now
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-100 dark:bg-slate-800 text-gray-400 py-6 rounded-2xl font-black uppercase tracking-widest text-sm cursor-not-allowed border border-gray-200 dark:border-slate-700"
                  >
                    Not Available
                  </button>
                )}
              </div>

              <p className="text-[10px] text-gray-400 text-center uppercase font-bold tracking-widest">
                Secure checkout • Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}