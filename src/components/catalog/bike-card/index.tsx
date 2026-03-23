import { Bike } from "@/types/Bike";
<<<<<<< Updated upstream
=======
import { useRouter } from "next/navigation";
>>>>>>> Stashed changes
import Link from "next/link";

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
<<<<<<< Updated upstream
  const isAvailable = bike.isActive;

=======
  const router = useRouter();
>>>>>>> Stashed changes
  return (
    <Link
      href={`/catalog/${bike.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
<<<<<<< Updated upstream
      <div className="flex flex-col h-full">
        <div className="relative h-56 w-full bg-gray-50 overflow-hidden">
         {bike.image ? (
    <img
      src={bike.image}
      alt={`${bike.brand} ${bike.model}`}
      
      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
    />
  ) : (
    <div className="flex flex-col items-center justify-center text-gray-300">
      <span className="text-5xl mb-2">🚲</span>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No photo</p>
    </div>
  )}

          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isAvailable ? "Available" : "Busy"}
          </div>
        </div>

        <div className="p-4 flex flex-col grow">
          <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
            {bike.category?.name || "No category"}
          </p>
          <h3 className="text-lg font-bold mt-1 text-gray-900 line-clamp-1">
            {bike.brand}{" "}
            <span className="text-gray-500 font-medium">{bike.model}</span>
          </h3>

          <p className="text-gray-600 mt-2 text-sm line-clamp-2 grow">
            {bike.description || "No description available"}
=======
      <div className="border rounded-lg shadow-md overflow-hidden bg-white flex flex-col h-full">
        <div className="relative h-48 w-full bg-gray-50 p-4">
          <img
            src={bike.image}
            alt={bike.model}
            className="w-full h-full object-contain"
          />
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${
              bike.status === "Available" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {bike.status}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
            {bike.category.name}
          </p>
          <h3 className="text-lg font-bold mt-1 text-gray-900 line-clamp-1">
            {bike.model}
          </h3>

          <p className="text-gray-600 mt-2 text-sm line-clamp-2 flex-grow">
            {bike.description}
>>>>>>> Stashed changes
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900">
<<<<<<< Updated upstream
                {bike.pricePerDay} €
                <span className="text-xs text-gray-400 font-normal ml-1">
                  /Day
                </span>
              </span>
            </div>

            <div
              className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                isAvailable
                  ? "bg-blue-600 text-white group-hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {isAvailable ? "Book" : "Busy"}
            </div>
=======
                ${bike.price}
                <span className="text-xs text-gray-400">/Hour</span>
              </span>
            </div>

            <button
              disabled={bike.status !== "Available"}
              className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                bike.status === "Available"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {bike.status === "Available" ? "Book" : "busy"}
            </button>

            {/* <button 
        onClick={() => router.push(`/catalog/${bike.id}`)}
        disabled={bike.status !== 'Available'}
        className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
          bike.status === 'Available' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {bike.status === 'Available' ? 'More...' : '...'}
      </button> */}
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </Link>
  );
}
