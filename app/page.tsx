import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { Deals } from "@/components/home/Deals";
import { PopularTires } from "@/components/home/PopularTires";

export default function Home() {
  return (
    <>
      <TopUtilityBar />
      <MainNav />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <Deals />
        <PopularTires />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}
