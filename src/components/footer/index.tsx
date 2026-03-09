import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="p-10 bg-gray-900 text-white">
            {/* Tailwind styles will work after project styles are connected */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h2  className="font-semibold mb-3">Bike rental</h2>
                    <p className="text-gray-400">The best bike rental service in your city</p>
                </div>

                <div>
                    <h3 className="mb-3">Company</h3>
                    <ul>
                        <li className="text-gray-400 hover:text-white cursor-pointer">About us</li>
                        <li className="text-gray-400 hover:text-white cursor-pointer">Contact</li>
                        <li className="text-gray-400 hover:text-white cursor-pointer">Careers</li>
                    </ul>
                        
                </div>

                <div>
                    <h3 className="mb-3">Support</h3>
                    <ul>
                        <li className="text-gray-400 hover:text-white cursor-pointer">FAQ</li>
                        <li className="text-gray-400 hover:text-white cursor-pointer">Terms</li>
                        <li className="text-gray-400 hover:text-white cursor-pointer">Privacy</li>
                    </ul>
                        
                </div>

                <div>
                    <h3 className="mb-3">Follow us</h3>
                    <div className="flex gap-4 text-2xl text-gray-400">
                        <FaInstagram className="hover:text-white cursor-pointer" />
                        <FaFacebookF className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                    </div>
                </div>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-700 text-center">
                © 2025 BikeRental. All rights reserved.
            </section>
        </footer>
    );
}
