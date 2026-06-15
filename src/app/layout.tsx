import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { ReduxProvider } from "@/store/provider"
import { Toaster } from "sonner"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CartDrawer from "@/components/cart/CartDrawer"
import WishlistDrawer from "@/components/wishlist/WishlistDrawer"
import SessionProvider from "@/components/auth/SessionProvider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "mygiftnurs - Find the Perfect Gift For Every Occasion",
  description: "Discover thoughtfully curated gifts that bring joy to your loved ones. From birthdays to anniversaries, we have something special for everyone.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased flex flex-col min-h-screen overflow-x-hidden">
        <SessionProvider>
          <ReduxProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <WishlistDrawer />
            <Footer />
            <Toaster position="bottom-right" richColors />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
