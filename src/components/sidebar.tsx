import Link from "next/link";
import { Car } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-xl font-bold">RentACar</h1>
      </div>
      <nav className="space-y-1 p-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900"
        >
          <Car className="h-5 w-5" />
          <span>Cars</span>
        </Link>
      </nav>
    </div>
  );
}
