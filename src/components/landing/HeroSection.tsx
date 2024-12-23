import { jetbrains_mono, russo_one } from '@/app/ui/fonts';
import React from 'react';

export default function HeroSection() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto content-center text-center my-12 gap-8 flex flex-col">
        <h1 className={`${russo_one.className} text-5xl font-bold text-white tracking-wide leading-snug`}>
            Take Charge of Your Finances,
            <br />
            Simply and Smartly
        </h1>
        <h2 className={`${jetbrains_mono.className} text-xl text-gray-200`}>
            Track expenses, link bank accounts like <u>Revolut</u>, manage subscriptions, and control your income—all in one app
        </h2>
    </div>
  );
} 