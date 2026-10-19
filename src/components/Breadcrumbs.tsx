import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  isDark?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, isDark = false, className = '' }: BreadcrumbsProps) {
  const baseTextColor = isDark ? 'text-neutral-400' : 'text-slate-500';
  const hoverTextColor = isDark ? 'hover:text-white' : 'hover:text-industrial-900';
  const activeTextColor = isDark ? 'text-white' : 'text-industrial-900';
  const chevronColor = isDark ? 'text-neutral-500' : 'text-slate-400';

  return (
    <nav aria-label="Breadcrumb" className={`py-2 text-xs sm:text-sm font-medium ${baseTextColor} ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center">
          <Link href="/" className={`${hoverTextColor} flex items-center gap-1 transition-colors`}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label + index} className="flex items-center gap-1.5">
              <ChevronRight className={`w-4 h-4 ${chevronColor}`} />
              {isLast || !item.href ? (
                <span className={`${activeTextColor} font-semibold truncate max-w-[240px] sm:max-w-none`}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={`${hoverTextColor} truncate max-w-[200px] sm:max-w-none transition-colors`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
