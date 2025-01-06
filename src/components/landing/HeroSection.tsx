import { jetbrains_mono, russo_one } from '@/app/ui/fonts';
import { palette } from '@/lib/palette';
import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative container mx-auto h-screen flex justify-between px-4">
      <div className="space-y-8 content-center flex flex-col mt-28">
        <h2 className={`${jetbrains_mono.className} text-md`} style={{ color: palette.text['title'] }}>
          Track expenses, link bank accounts like <u>Revolut</u>, manage subscriptions, and control your income—all in one app
        </h2>
        <h1 
          className={`${russo_one.className} text-8xl font-bold uppercase`} 
          style={{
            color: palette.text['title'],
            transformOrigin: 'left',
            transform: 'scaleX(0.9)'
          }}
        >
            Take Charge of Your Finances,
            <br />
            Simply and Smartly
        </h1>
      </div>
    </div>
  );
} 