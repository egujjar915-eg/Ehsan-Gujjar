import React from 'react';
import { Hero } from '../components/home/Hero';
import { ServiceBenefits } from '../components/home/ServiceBenefits';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServiceBenefits />
      <CategoryGrid />
      <FeaturedProducts />
      <PromotionalBanner />
      <NewsletterSection />
    </main>
  );
};
