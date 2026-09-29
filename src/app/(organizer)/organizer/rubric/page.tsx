"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function OrganizerRubricPage() {
  const [weights, setWeights] = useState({ functionality: 40, quality: 30, innovation: 30 });
  const total = weights.functionality + weights.quality + weights.innovation;
  const isInvalid = total !== 100;

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-5xl mx-auto space-y-8 w-full">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/80">
          <div className="space-y-4">
            <Link href="/organizer/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 hover:text-[#fe330a] transition-colors font-bold">
              &larr; COMMAND CENTER
            </Link>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#fe330a] font-bold mt-4">
              MODULE 03
            </div>
            <h1 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">
              Scoring Rubric. <br />
              <span className="italic text-[#fe330a] font-medium">Dynamic Weights.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              disabled={isInvalid}
              className="px-5 py-2.5 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] disabled:opacity-50 disabled:hover:bg-[#fe330a] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shadow-[0_0_15px_rgba(254,51,10,0.3)] disabled:shadow-none"
            >
              Save Configuration
            </button>
          </div>
        </div>

        {/* Warning Banner */}
        {isInvalid && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-xs font-mono font-bold tracking-wider text-red-300 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            Weights must sum to exactly 100%. Current sum: {total}%.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Weights Editor */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl space-y-8 relative overflow-hidden group hover:border-stone-700 transition-colors">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-stone-800/10 rounded-full blur-3xl group-hover:bg-[#fe330a]/5 transition-colors" />
              
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-5 relative z-10">
                <h2 className="text-2xl font-syne font-bold text-white">Event Criteria Matrix</h2>
                <div className={`px-3 py-1.5 rounded-sm text-[11px] font-mono font-bold uppercase tracking-wider border ${isInvalid ? 'bg-red-950/50 text-red-400 border-red-800/50 shadow-[0_0_8px_rgba(239,68,68,0.2)]' : 'bg-stone-900/50 text-stone-300 border-stone-800'}`}>
                  SUM: {total}%
                </div>
              </div>

              {[
                { key: 'functionality', label: 'Functionality', desc: 'Core features and completion' },
                { key: 'quality', label: 'Quality', desc: 'Code hygiene, UX, and reliability' },
                { key: 'innovation', label: 'Innovation', desc: 'Originality and technical novelty' }
              ].map((crit) => (
                <div key={crit.key} className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold font-syne text-white tracking-wide">{crit.label}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mt-1">{crit.desc}</p>
                    </div>
                    <div className="relative w-20">
                      <input 
                        type="number"
                        min="0" max="100"
                        value={weights[crit.key as keyof typeof weights]}
                        onChange={(e) => setWeights({ ...weights, [crit.key]: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2.5 bg-[#090b10] border border-stone-700 rounded-lg text-sm font-mono font-bold text-center text-white focus:outline-none focus:border-[#fe330a] transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-[10px] font-bold font-mono">%</span>
                    </div>
                  </div>
                  <input 
                    type="range"
                    min="0" max="100"
                    value={weights[crit.key as keyof typeof weights]}
                    onChange={(e) => setWeights({ ...weights, [crit.key]: parseInt(e.target.value) || 0 })}
                    className="w-full accent-[#fe330a] hover:accent-[#ff4d26] transition-all cursor-pointer"
                  />
                </div>
              ))}

            </div>
          </div>

          {/* Normalization Settings Card */}
          <div className="lg:col-span-5 space-y-6">
             <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#141824] to-[#1a1f2e] border border-[#fe330a]/20 shadow-[0_0_30px_rgba(254,51,10,0.05)] space-y-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#fe330a] shadow-[0_0_8px_#fe330a] animate-pulse" />
                  <h3 className="text-xl font-syne font-bold text-white">Normalization Engine</h3>
                </div>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  The DOGFOOD portal uses a robust statistical normalization algorithm to correct for varying judge leniency (e.g. &quot;hard&quot; vs &quot;easy&quot; graders).
                </p>
                <div className="space-y-4 pt-5 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest">
                    <span className="text-stone-500">ALGORITHM</span>
                    <span className="text-stone-200">Z-SCORE SHRINKAGE</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest">
                    <span className="text-stone-500">TARGET MEAN</span>
                    <span className="text-stone-200">3.00</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest">
                    <span className="text-stone-500">ZERO-VARIANCE</span>
                    <span className="text-[#fe330a]">MEAN-CENTERED</span>
                  </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
