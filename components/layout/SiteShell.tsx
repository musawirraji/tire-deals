import { TopUtilityBar } from "./TopUtilityBar";
import { MainNav } from "./MainNav";
import { Footer } from "./Footer";
import { ChatBubble } from "@/components/ui/ChatBubble";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopUtilityBar />
      <MainNav />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBubble />
    </>
  );
}
