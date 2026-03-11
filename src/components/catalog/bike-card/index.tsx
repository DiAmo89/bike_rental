import { Bike } from "@/types/Bike";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  const router = useRouter();
  return (
    <Link
      href={`/catalog/${bike.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
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

        <div className="p-4 flex flex-col grow">
          <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
            {bike.category.name}
          </p>
          <h3 className="text-lg font-bold mt-1 text-gray-900 line-clamp-1">
            {bike.model}
          </h3>

          <p className="text-gray-600 mt-2 text-sm line-clamp-2 grow">
            {bike.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900">
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
          </div>
        </div>
      </div>
    </Link>
  );
}
