import Collections from "../components/home/Collections";
import CraftStory from "../components/home/CraftStory";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero, { TrustBand } from "../components/home/Hero";
import Lookbook from "../components/home/Lookbook";
import Muses from "../components/home/Muses";
import NewsletterCTA from "../components/home/NewsletterCTA";
import Voices from "../components/home/Voices";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Collections />
      <FeaturedProducts />
      <CraftStory />
      <Muses />
      <Lookbook />
      <Voices />
      <NewsletterCTA />
    </>
  );
}
