import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-10 bg-gray-900 text-white">
      {/* Tailwind styles will work after project styles are connected */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#e6ff2a] font-bold text-xl tracking-wide">
                Blabla<span className="text-white">Bike</span>
              </span>
            </Link>

            <p className="text-gray-400 mt-3">
              The best bike rental service in your city
            </p>
            <p className="text-gray-400">Email: info@blablabike.com</p>
            <p className="text-gray-400">Phone: +49 123 456 789</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about-us" className="text-gray-400 hover:text-white">
                About us
              </Link>
            </li>

            <li>
              <Link href="/team" className="text-gray-400 hover:text-white">
                Team develop
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3">Follow us</h3>
          <div className="flex gap-4 text-2xl text-gray-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-white cursor-pointer" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="hover:text-white cursor-pointer" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 pt-6 border-t border-gray-700 text-center">
        © 2025 BlablaBike. All rights reserved.
      </section>
    </footer>
  );
}
