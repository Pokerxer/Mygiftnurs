import HeroBanner from "@/components/home/HeroBanner"
import TrustBadges from "@/components/home/TrustBadges"
import CategoryGrid from "@/components/home/CategoryGrid"
import GiftFinder from "@/components/home/GiftFinder"
import OccasionSpotlight from "@/components/home/OccasionSpotlight"
import TopDeals from "@/components/home/TopDeals"
import BestSellers from "@/components/home/BestSellers"
import Testimonials from "@/components/home/Testimonials"
import WhyGiftnurs from "@/components/home/WhyGiftnurs"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <GiftFinder />
      <OccasionSpotlight />
      <TopDeals />
      <BestSellers />
      <Testimonials />
      <WhyGiftnurs />
    </>
  )
}
