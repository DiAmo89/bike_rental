import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/Category";
const CategoryCard = ({ name, image }: Category) => {
  return (
    <Link
      href={`/catalog?category=${name}`}
      className="group flex flex-col items-center gap-3 transition-all"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden  border-2 border-gray-100 group-hover:border-blue-500 shadow-sm">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center uppercase tracking-tight">
        {name}
      </span>
    </Link>
  );
};
export default CategoryCard;
