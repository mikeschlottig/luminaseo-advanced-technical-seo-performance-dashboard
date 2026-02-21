import React from 'react';
import { PageCrawler } from './PageCrawler';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <>
      <PageCrawler />
      <Toaster richColors closeButton />
    </>
  );
}