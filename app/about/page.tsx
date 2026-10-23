import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, CheckCircle2, ShieldCheck, ArrowRight, Utensils } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Our Heritage
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-deep">
          Real Nigerian Food, Made with Pride
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          The unmistakable aroma of firewood smoke, stone-ground melon seeds, and authentic
          heritage recipes — cooked with pride for modern Lagos living.
        </p>
      </div>

      {/* Featured Kitchen Photography Banner */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden shadow-card border border-brand-border">
        <Image
          src="/images/site/about-kitchen-1.jpg"
          alt="Traditional Nigerian Kitchen at Taste of Naija"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 p-6 flex flex-col justify-end text-white">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold">
            The Engine Room
          </span>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
            Simmering Cast Iron Pots & Hardwood Embers
          </h3>
        </div>
      </div>

      {/* Story narrative cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
            The Beginning
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep">
            Born from a Passion for Genuine Nigerian Food
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Taste of Naija started with a simple belief: real Nigerian cooking must never be compromised.
            Too often, fast dining cuts corners on quality ingredients, slow simmering, and authentic seasoning.
          </p>
          <p className="text-sm text-brand-muted leading-relaxed">
            We wanted the raw, soulful authenticity of traditional Nigerian home cooking — where the pots are massive,
            the palm oil has that authentic crimson richness from Delta, and the party jollof gets
            its smoky soul from real hardwood coals. And we deliver it in a spotless,
            welcoming dining room or right to your doorstep in spill-proof packaging.
          </p>
        </div>

        {/* Brand Philosophy Box */}
        <div className="bg-[#0A4823] text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2">
            <Utensils className="w-6 h-6 text-brand-gold" />
            <h3 className="font-heading font-bold text-lg text-white">Our 4 Kitchen Commandments</h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-emerald-100">
            <div className="flex items-start gap-3">
              <span className="font-bold text-brand-gold shrink-0">01.</span>
              <span><strong>Aged Benue Yam:</strong> Only aged white tubers yield that velvety, lumpless pounded yam stretch.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold text-brand-gold shrink-0">02.</span>
              <span><strong>Charred Wood Smoke:</strong> Our Party Jollof is slow-steamed over real wood smoke — never fake flavorings.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold text-brand-gold shrink-0">03.</span>
              <span><strong>Locust Beans (Iru) & Crayfish:</strong> Every pot of Egusi and Efo Riro is generously layered with sun-dried aromatics.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold text-brand-gold shrink-0">04.</span>
              <span><strong>Spotless Hygiene:</strong> Food safety is sacred. Our kitchen operates to international culinary standards.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing Section */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep">
            Fresh Local Sourcing
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            We believe greatness starts at the farm gate. Every morning before dawn, our market buyers are at work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-stone-50 border border-brand-border text-center space-y-1.5">
            <div className="font-heading font-bold text-base text-brand-deep">Oyingbo & Mile 12</div>
            <p className="text-xs text-brand-muted">
              Fresh fluted pumpkin (Ugu), waterleaf, rodo, and tatashe peppers bought fresh daily.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-brand-border text-center space-y-1.5">
            <div className="font-heading font-bold text-base text-brand-deep">Delta & Edo Groves</div>
            <p className="text-xs text-brand-muted">
              Unadulterated red palm oil for our Banga and native soups, directly from local presses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-brand-border text-center space-y-1.5">
            <div className="font-heading font-bold text-base text-brand-deep">Kano Spice Markets</div>
            <p className="text-xs text-brand-muted">
              Authentic roasted groundnut kuli-kuli and ginger-infused Yaji seasoning for our Beef Suya.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pt-4">
        <Link
          href="/order"
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm px-8 py-4 rounded-btn shadow-md transition-all"
        >
          <span>Taste The Tradition — Order Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
