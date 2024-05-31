import { Link } from '@chakra-ui/react'
import { Facebook, Instagram, Store, Twitter } from 'lucide-react';
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
    <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
      <div className="grid gap-1">
        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <Store />
          <span className="">Uptc Ecommerce</span>
        </Link>
        <p className="text-gray-500 dark:text-gray-400">Manage your online store with ease.</p>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Navigation</h3>
        <Link href="#" prefetch={false}>
          Home
        </Link>
        <Link href="/productos" prefetch={false}>
          Products
        </Link>
        <Link href="/ordenes" prefetch={false}>
          Orders
        </Link>
        <Link href="/categorias" prefetch={false}>
          Categorias
        </Link>
        <Link href="#" prefetch={false}>
          Settings
        </Link>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Contact</h3>
        <p>
          123 Main St, Anytown USA
          <br />
          support@acme.com
          <br />
          (555) 555-5555
        </p>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Legal</h3>
        <Link href="#" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" prefetch={false}>
          Privacy Policy
        </Link>
        <Link href="#" prefetch={false}>
          Cookie Policy
        </Link>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Social</h3>
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Twitter className="h-4 w-4" />
          Twitter
        </Link>
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Facebook className="h-4 w-4" />
          Facebook
        </Link>
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Instagram className="h-4 w-4" />
          Instagram
        </Link>
      </div>
    </div>
    <div className="container max-w-7xl mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <p>&copy; 2024 Acme Ecommerce. All rights reserved.</p>
      <p>
        Built with{" "}
        <Link href="#" className="underline" prefetch={false}>
          Vercel
        </Link>
      </p>
    </div>
  </footer>
  )
}

export default Footer