import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IMG } from "@/lib/images";

const CONTACT = [
  { icon: Clock, title: "Business Hours", lines: ["Mon–Fri: 9 AM – 6 PM (EST)", "Sat–Sun: 10 AM – 4 PM (EST)"] },
  { icon: MapPin, title: "Address", lines: ["123 Main Street, Your City", "State, 37037, United States"] },
  { icon: Phone, title: "Phone Number", lines: ["+1 (415) 555-0199"] },
  { icon: Mail, title: "Email Address", lines: ["support@tiredeals.demo"] },
];

export function ExpertAssistance() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-6">
      {/* header card */}
      <div className="relative overflow-hidden rounded-t-hero bg-dark p-7 text-cream md:p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.mechanic}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_left,black,transparent_75%)]"
        />
        <div className="relative max-w-lg">
          <Eyebrow tone="light">Expert tire assistance</Eyebrow>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Need Help Choosing the Right Tires?
          </h2>
          <p className="mt-3 max-w-md text-sm text-dark-muted">
            Our team of tire specialists is here to guide you. Whether
            you&rsquo;re unsure about size, performance, or brand — we&rsquo;ll
            help you find the perfect match for your vehicle and driving style.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:8664400177"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-bold text-dark transition-colors hover:bg-accent-bright"
            >
              Call us: 866-440-0177 <ArrowUpRight size={16} />
            </a>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-dark-line-strong px-5 py-3 text-sm font-bold text-cream transition-colors hover:border-cream">
              Live chat <MessageSquare size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* contact strip */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-hero border-x border-b border-line bg-line md:grid-cols-4">
        {CONTACT.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="flex flex-col gap-2 bg-bg-2 p-5">
              <Icon size={18} className="text-accent-700" />
              <h3 className="text-sm font-bold text-ink">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="text-xs leading-snug text-muted">
                  {l}
                </p>
              ))}
            </div>
          );
        })}
      </div>

      {/* checkout issue card */}
      <div className="relative mt-4 overflow-hidden rounded-hero bg-dark p-7 text-cream md:p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.checkoutCar}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_left,black,transparent_60%)]"
        />
        <div className="relative">
          <span className="mb-3 flex h-2.5 w-2.5 rounded-full bg-accent" />
          <h3 className="max-w-xs text-2xl font-extrabold leading-tight md:text-3xl">
            Having an issue checking out?
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-bold text-dark transition-colors hover:bg-accent-bright">
              Contact Us <ArrowUpRight size={16} />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-dark-line-strong px-5 py-3 text-sm font-bold text-cream transition-colors hover:border-cream">
              Give feedback <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
