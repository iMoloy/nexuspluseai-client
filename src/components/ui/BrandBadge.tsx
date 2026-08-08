'use client';

import React from 'react';

// 100% self-contained inline SVG brand emblems - zero external CDN dependency
export const BRAND_MAP: Record<string, { bg: string; content: string }> = {
  tesla:     { bg: '#CC0000', content: '<text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="28" font-weight="900">T</text>' },
  bmw:       { bg: '#0166B1', content: '<circle cx="50" cy="50" r="44" fill="none" stroke="#aaa" stroke-width="3"/><path fill="#0166B1" d="M50 6L94 50H50Z"/><path fill="#0166B1" d="M50 50H6L50 94Z"/><path fill="white" d="M50 6L6 50H50Z"/><path fill="white" d="M50 50H94L50 94Z"/>' },
  porsche:   { bg: '#1a1a1a', content: '<rect x="4" y="4" width="92" height="92" fill="none" stroke="#C0A060" stroke-width="3" rx="3"/><text x="50%" y="28%" dominant-baseline="middle" text-anchor="middle" fill="#C0A060" font-family="sans-serif" font-size="9" font-weight="bold" letter-spacing="1">PORSCHE</text><line x1="50" y1="4" x2="50" y2="96" stroke="#C0A060" stroke-width="2"/><line x1="4" y1="50" x2="96" y2="50" stroke="#C0A060" stroke-width="2"/>' },
  mercedes:  { bg: '#1a1a1a', content: '<circle cx="50" cy="50" r="44" fill="none" stroke="#888" stroke-width="3"/><line x1="50" y1="6" x2="50" y2="50" stroke="#c0c0c0" stroke-width="3"/><line x1="50" y1="50" x2="87" y2="77" stroke="#c0c0c0" stroke-width="3"/><line x1="50" y1="50" x2="13" y2="77" stroke="#c0c0c0" stroke-width="3"/>' },
  ford:      { bg: '#003476', content: '<ellipse cx="50" cy="50" rx="46" ry="30" fill="#003476" stroke="#6699CC" stroke-width="2.5"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="serif" font-style="italic" font-size="26" font-weight="bold">Ford</text>' },
  landrover: { bg: '#005A2B', content: '<rect x="4" y="20" width="92" height="60" fill="none" stroke="white" stroke-width="2.5" rx="3"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="9" font-weight="bold" letter-spacing="0.5">LAND ROVER</text>' },
  audi:      { bg: '#BB0A14', content: '<circle cx="18" cy="50" r="15" fill="none" stroke="white" stroke-width="3.5"/><circle cx="40" cy="50" r="15" fill="none" stroke="white" stroke-width="3.5"/><circle cx="62" cy="50" r="15" fill="none" stroke="white" stroke-width="3.5"/><circle cx="84" cy="50" r="15" fill="none" stroke="white" stroke-width="3.5"/>' },
  ducati:    { bg: '#CC0000', content: '<text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="13" font-weight="900" letter-spacing="1">DUCATI</text>' },
  toyota:    { bg: '#EB0A1E', content: '<ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="white" stroke-width="3"/><ellipse cx="50" cy="50" rx="20" ry="26" fill="none" stroke="white" stroke-width="3"/><ellipse cx="50" cy="50" rx="10" ry="10" fill="none" stroke="white" stroke-width="3"/>' },
  apple:     { bg: '#1d1d1f', content: '<text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="44">&#xf8ff;</text>' },
};

export function getBrandKey(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('tesla'))                        return 'tesla';
  if (t.includes('bmw'))                          return 'bmw';
  if (t.includes('porsche'))                      return 'porsche';
  if (t.includes('mercedes'))                     return 'mercedes';
  if (t.includes('ford') || t.includes('mustang')) return 'ford';
  if (t.includes('land rover') || t.includes('range rover')) return 'landrover';
  if (t.includes('audi'))                         return 'audi';
  if (t.includes('ducati'))                       return 'ducati';
  if (t.includes('toyota'))                       return 'toyota';
  if (t.includes('apple') || t.includes('mac'))   return 'apple';
  return '';
}

interface BrandBadgeProps {
  title: string;
  className?: string;
}

export const BrandBadge: React.FC<BrandBadgeProps> = ({ title, className = 'w-5 h-5' }) => {
  const key = getBrandKey(title);
  const brand = BRAND_MAP[key];
  if (!brand) return null;

  return (
    <span
      className={`inline-flex items-center justify-center rounded overflow-hidden shrink-0 ${className}`}
      style={{ background: brand.bg }}
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: brand.content }}
      />
    </span>
  );
};

export default BrandBadge;
