import { Container } from "@/components/Container";
import { getAboutContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const aboutContent: any = await getAboutContent();
  const banner = aboutContent?.banner || {};
  const intro = aboutContent?.intro || {};
  const missionVision = aboutContent?.missionVision || {};
  const body = aboutContent?.body || {};

  const whoHtml =
    intro?.html ||
    intro?.text ||
    "A customer-first engineering company with a strong focus on quality, innovation, and reliable delivery.";

  const missionHtml =
    missionVision?.missionHtml ||
    missionVision?.mission ||
    "Provide dependable engineering solutions and responsive service that helps customers operate smoothly.";

  const visionHtml =
    missionVision?.visionHtml ||
    missionVision?.vision ||
    "Build a trusted nationwide brand for premium quality engineering products.";

  const approachTitle = body?.title || "Our Approach";
  const approachHtml =
    body?.html ||
    body?.text ||
    "We combine technical expertise, brand-grade materials and an operations-first mindset to make every delivery smooth and reliable.";

  return (
    <div className="bg-white text-slate-900">
      <div className="relative overflow-hidden bg-slate-950 py-24 lg:py-32">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
        </div>

        <Container className="relative space-y-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-sky-400/80 sm:text-xs">
              ABOUT OUR COMPANY
            </p>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              <span className="shimmer-white relative inline-block">
                {banner.title || "Palcotech Engineering"}
                <div className="absolute inset-x-0 -bottom-2 h-1.5 w-24 rounded-full bg-accent" />
              </span>
            </h1>
            <p className="mt-10 text-lg leading-relaxed text-slate-300 sm:text-xl sm:leading-loose">
              {banner.subtitle ||
                "Delivering premium engineering products with professional support, reliable delivery, and long-term customer trust."}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {/* Order as requested: Our approach -> Who we are -> Mission -> Vision */}
        <div className="rounded-3xl border border-slate-200/70 bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50/50">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">About</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {approachTitle}
              </h2>
            </div>
            <div
              className="prose prose-sm max-w-2xl text-slate-600"
              dangerouslySetInnerHTML={{ __html: approachHtml }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50/50">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:w-1/3">
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
                  Why Choose Palcotech Engineering
                </div>
              </div>
              <div
                className="prose prose-sm max-w-2xl text-slate-600 lg:w-2/3"
                dangerouslySetInnerHTML={{ __html: whoHtml }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
