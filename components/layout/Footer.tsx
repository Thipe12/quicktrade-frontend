// components/layout/Footer.tsx
import Link from 'next/link'
import { ShoppingBag, Mail, MapPin, Phone, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">
                Quick<span className="text-gray-900 dark:text-white">Trade</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              AI-powered marketplace connecting buyers and sellers in Lesotho.
              Find what you need, sell what you don&apos;t.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/listings" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/post-listing" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Maseru, Lesotho</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>support@quicktrade.co.ls</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>+266 1234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} QuickTrade. All rights reserved. Built with AI for Lesotho.</p>
        </div>
      </div>
    </footer>
  )
}
