import Link from "next/link";
import React from "react";
import { landingData } from "@/data/landing";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-stone-100 overflow-hidden bg-background">
      <main className="flex-1">
        
        {/* HERO SECTION - Deep Space Vibe */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 md:px-8 flex flex-col items-center justify-center text-center bg-[#0a0c10]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-stone-800/80 bg-surface/50 backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">{landingData.hero.statusBadge}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-syne text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.05] tracking-tighter text-white max-w-5xl drop-shadow-2xl">
              {landingData.hero.title} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[#ff7e5f] to-[#feb47b] drop-shadow-[0_0_25px_rgba(254,51,10,0.6)] animate-pulse">
                {landingData.hero.titleHighlight}
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="mt-8 text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans font-light">
              {landingData.hero.subtitle}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link href="/projects" className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-mono font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center gap-2">Explore Gallery <span className="transition-transform group-hover:translate-x-1">→</span></span>
                <div className="absolute inset-0 bg-stone-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-stone-800 px-8 py-4 text-sm font-mono uppercase tracking-wider text-stone-300 transition-all hover:border-stone-500 hover:text-white hover:bg-surface">
                Participant Login
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* CSS Marquee - Subtle transition color */}
        <div className="relative border-y border-stone-800/60 bg-[#0f121a] overflow-hidden py-4">
          <div className="animate-marquee whitespace-nowrap flex gap-12 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-primary)] opacity-80">
            {[...Array(10)].map((_, i) => (
              <span key={i}>Build the platform that will judge you <span className="text-stone-700 mx-12">·</span></span>
            ))}
          </div>
        </div>

        {/* STATS BENTO - Dark Blue/Slate Tint */}
        <section className="bg-gradient-to-b from-[#0f121a] to-[#141824] border-b border-stone-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {landingData.stats.map((stat, idx) => (
                <ScrollReveal key={idx} delay={idx * 100} className="group relative p-8 rounded-3xl bg-surface border border-stone-800/50 hover:border-stone-600/50 transition-colors duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-5xl font-syne font-bold text-white block mb-2">{stat.value}</span>
                  <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-wider block mb-4">{stat.label}</span>
                  <p className="text-sm text-stone-400 font-sans leading-relaxed relative z-10">
                    {stat.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* NIVA STYLE SPLIT SECTION - High Contrast White */}
        <section className="bg-white text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-32 flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="flex-1 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] block font-bold">
                {landingData.brief.label}
              </span>
              <h2 className="font-syne text-4xl sm:text-5xl leading-[1.1] text-black font-bold">
                The problem is <br />
                <span className="text-stone-400">structural.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200} className="flex-[1.5]">
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-sans font-light text-wrap">
                {landingData.brief.text}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* NEW DATA BOXES: PIPELINE (Light Stone) */}
        <section className="bg-stone-50 border-y border-stone-200 text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-32">
            <ScrollReveal>
              <h2 className="font-syne text-4xl sm:text-5xl text-black mb-16 text-center font-bold">
                Event Pipeline Architecture
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {landingData.pipeline.map((pipe, idx) => (
                <ScrollReveal key={idx} delay={idx * 150} className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:bg-stone-50/50 transition-all duration-300 group shadow-sm hover:shadow-md">
                  <span className="text-4xl font-syne font-bold text-transparent bg-clip-text bg-gradient-to-b from-stone-300 to-stone-500 mb-4 block group-hover:from-[var(--color-primary)] group-hover:to-[#ff7e5f] transition-colors">
                    {pipe.step}
                  </span>
                  <h3 className="text-lg font-syne text-black mb-2 font-bold">{pipe.name}</h3>
                  <p className="text-sm font-sans text-stone-600">{pipe.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TIER ARCHITECTURE & ECOSYSTEM - Hard transition back to dark */}
        <section className="bg-background relative text-white pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-32 space-y-32">
            
            {/* Tiers */}
            <div>
              <ScrollReveal>
                <div className="mb-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] block mb-4">Isolation Protocol</span>
                  <h2 className="font-syne text-4xl sm:text-5xl text-white">
                    The Tier Architecture
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {landingData.tiers.map((tier, idx) => (
                  <ScrollReveal key={idx} delay={idx * 150} className="p-10 rounded-3xl bg-surface/40 backdrop-blur-sm border border-stone-800 hover:border-stone-600 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-syne font-bold text-[var(--color-primary)] drop-shadow-[0_0_8px_rgba(254,51,10,0.4)]">{tier.id}</span>
                      <h3 className="text-3xl font-syne text-white">{tier.name}</h3>
                    </div>
                    <p className="text-stone-300 font-sans mb-8 text-lg">
                      {tier.description}
                    </p>
                    <ul className="space-y-4">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-4 font-mono text-sm text-stone-400">
                          <span className="text-[var(--color-primary)] mt-0.5">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Ecosystem (New Data) */}
            <div>
              <ScrollReveal>
                <h2 className="font-syne text-4xl sm:text-5xl text-white mb-12 text-center">
                  Zero Network Dependencies
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {landingData.ecosystem.map((eco, idx) => (
                  <ScrollReveal key={idx} delay={idx * 100} className="p-8 rounded-3xl bg-surface/20 border border-stone-800/80 hover:bg-surface/50 transition-colors duration-300">
                    <h3 className="text-xl font-syne text-white mb-3">{eco.title}</h3>
                    <p className="text-sm font-sans text-stone-400 leading-relaxed">{eco.desc}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* NIVA STYLE FAQ ACCORDION - Soft Surface */}
        <section id="faq" className="bg-surface/30 py-24 lg:py-32 border-t border-stone-800/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] block mb-4">Knowledge Base</span>
                <h2 className="font-syne text-4xl sm:text-5xl text-white">Frequently Asked</h2>
              </div>
            </ScrollReveal>
            
            <div className="space-y-4">
              {landingData.faqs.map((faq, idx) => (
                <ScrollReveal key={idx} delay={idx * 100}>
                  <details className="group rounded-2xl bg-background/50 border border-stone-800/60 open:bg-surface open:border-stone-600 transition-all duration-300 cursor-pointer marker:content-[''] shadow-sm">
                    <summary className="flex items-center justify-between p-6 list-none select-none">
                      <span className="font-syne text-lg text-white group-hover:text-[var(--color-primary)] transition-colors">{faq.q}</span>
                      <span className="text-[var(--color-primary)] font-mono text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-stone-400 font-sans leading-relaxed border-t border-stone-800/60 mt-2">
                      {faq.a}
                    </div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER CTA - Intense pure Background */}
        <section className="bg-background border-t border-stone-800/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 py-32 text-center relative z-10">
            <ScrollReveal>
              <h2 className="font-syne text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg">
                Ready to build?
              </h2>
              <Link href="/projects" className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-10 py-5 text-sm font-mono font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-[#ff4922] hover:shadow-[0_0_40px_rgba(254,51,10,0.3)]">
                Enter The Portal
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <footer className="border-t border-stone-800 bg-background py-8 px-4 text-center text-xs font-mono text-stone-500">
        &copy; 2026 DOGFOOD PORTAL. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
