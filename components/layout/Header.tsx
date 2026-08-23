// components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Bell,
  ChevronDown,
  Plus,
  Home,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(null)

  useEffect(() => {
    // Check auth status - replace with actual auth check
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    if (token) {
      // Fetch user data
      setUser({ name: 'Tumelo' })
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/listings', label: 'Browse', icon: ShoppingBag },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">
              Quick<span className="text-gray-900 dark:text-white">Trade</span>
            </span>
            <Badge variant="info" className="ml-2 hidden sm:inline-block">
              AI-Powered
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for laptops, phones, furniture..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            {/* Post Listing Button */}
            <Link href="/post-listing">
              <Button size="sm" className="hidden sm:inline-flex">
                <Plus className="mr-1 h-4 w-4" />
                Sell
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden py-3"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden py-4 border-t"
            >
              <nav className="flex flex-col space-y-2">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(href)
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                ))}
                <div className="border-t pt-2">
                  {isAuthenticated ? (
                    <>
                      <button className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </button>
                      <button className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 px-4">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}