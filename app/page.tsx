import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Deals } from "@/components/home/Deals";
import { PopularTires } from "@/components/home/PopularTires";
import { GuidedShopping } from "@/components/home/GuidedShopping";
import { Installers } from "@/components/home/Installers";
import { Promises } from "@/components/home/Promises";
import { TreadTrial } from "@/components/home/TreadTrial";
import { ExpertAssistance } from "@/components/home/ExpertAssistance";
import { Journey } from "@/components/home/Journey";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <Deals />
      <PopularTires />
      <GuidedShopping />
      <Installers />
      <Promises />
      <TreadTrial />
      <ExpertAssistance />
      <Journey />
    </SiteShell>
  );
}
