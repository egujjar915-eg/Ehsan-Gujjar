import React from 'react';
import { Award, Truck, ShieldCheck, Headphones } from 'lucide-react';

export const ServiceBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Produits sélectionnés',
      description: 'La qualité et la fiabilité avant tout'
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: 'Dans les 58 wilayas d’Algérie'
    },
    {
      icon: ShieldCheck,
      title: 'Paiement sécurisé',
      description: 'Paiement en espèces à la livraison'
    },
    {
      icon: Headphones,
      title: 'Service client réactif',
      description: 'Conseils et assistance 7 jours sur 7'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#CCD7D2]/80 flex items-center justify-center shrink-0 text-[#075B49] shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17211F]">{item.title}</h4>
                  <p className="text-xs text-[#66716D] mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
