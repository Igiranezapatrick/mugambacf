"use client";

import { useState } from "react";
import { DynamicCatalog } from "./DynamicCatalog";
import { Coffee, ShieldCheck, Key, Grid } from "lucide-react";

export function ShopCatalog() {
  const [activeTab, setActiveTab] = useState<"all" | "coffee" | "machine" | "rental">("all");

  const tabs = [
    {
      id: "all" as const,
      label: "All Products",
      icon: Grid,
      desc: "Browse our complete catalog of coffee beans, machines, and rental options."
    },
    { 
      id: "coffee" as const, 
      label: "Coffee Beans", 
      icon: Coffee, 
      desc: "Premium Rwandan Arabica, roasted or ground, prepared for homes, offices, and cafés." 
    },
    { 
      id: "machine" as const, 
      label: "Machines for Sale", 
      icon: ShieldCheck, 
      desc: "Commercial espresso machines, grinders, and brewing hardware for professional setup." 
    },
    { 
      id: "rental" as const, 
      label: "Machine Rentals", 
      icon: Key, 
      desc: "Flexible short-term and event-based coffee machine leasing options." 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hide scrollbar style injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Tabs Selector */}
      <div className="flex flex-row flex-nowrap items-center justify-start md:justify-center gap-2 border-b border-espresso/10 pb-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3.5 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shrink-0 snap-center border ${
                isActive
                  ? "border-brass bg-brass text-espresso shadow-md font-bold scale-105"
                  : "border-espresso/15 bg-white text-espresso hover:border-brass hover:text-roast"
              }`}
            >
              <Icon size={14} className={`shrink-0 ${isActive ? "text-espresso" : "text-roast"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Description */}
      <div className="text-center max-w-xl mx-auto px-4">
        <p className="text-sm md:text-base text-espresso/70 italic font-serif">
          {tabs.find((t) => t.id === activeTab)?.desc}
        </p>
      </div>

      {/* Catalog Render */}
      <div className="mt-6">
        <DynamicCatalog productType={activeTab === "all" ? undefined : activeTab} />
      </div>
    </div>
  );
}
