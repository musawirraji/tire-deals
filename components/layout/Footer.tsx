import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Shop Tires", "Deals & Rebates", "Brands", "By Vehicle", "By Size"],
  },
  {
    title: "Support",
    links: ["Help Center", "Track Your Order", "Returns & Refunds", "Tire Coverage", "Installers"],
  },
  {
    title: "Company",
    links: ["About us", "Tire Financing", "Blog", "Careers", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-2xl font-extrabold leading-tight">
              We&rsquo;re Happy <br />
              <span className="text-accent">To Help.</span>
            </p>
            <a
              href="tel:8664400177"
              className="mt-4 inline-flex rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-bg"
            >
              866-440-0177
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-bold text-ink">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="cursor-pointer text-sm text-muted transition-colors hover:text-accent">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <span>© {2026} TireDeals. Demo build — mock data, approximate visual match.</span>
          <span className="flex gap-4">
            <span className="cursor-pointer hover:text-ink">Privacy</span>
            <span className="cursor-pointer hover:text-ink">Terms</span>
            <span className="cursor-pointer hover:text-ink">Accessibility</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
