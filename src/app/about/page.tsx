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
    <div className="bg-transparent text-slate-900">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 py-20 text-white">
        <Container className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About Us</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="animated-gradient-text">
              {banner.title || "Palcotech Engineering"}
            </span>
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            {banner.subtitle ||
              "Delivering premium engineering products with professional support, reliable delivery, and long-term customer trust."}
          </p>
        </Container>
      </div>

      <Container className="py-16">
        {/* Order as requested: Our approach -> Who we are -> Mission -> Vision */}
        <div className="rounded-3xl border border-slate-200/70 bg-white/75 p-10 shadow-sm backdrop-blur">
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

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/70 bg-white/75 p-8 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
              Who we are
            </div>
            <div
              className="prose prose-sm mt-4 text-slate-600"
              dangerouslySetInnerHTML={{ __html: whoHtml }}
            />
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/75 p-8 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
              Mission
            </div>
            <div
              className="prose prose-sm mt-4 text-slate-600"
              dangerouslySetInnerHTML={{ __html: missionHtml }}
            />
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/75 p-8 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
              Vision
            </div>
            <div
              className="prose prose-sm mt-4 text-slate-600"
              dangerouslySetInnerHTML={{ __html: visionHtml }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
