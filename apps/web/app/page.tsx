import React from "react";
import { NavBar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { FeatureShowcase } from "../components/FeatureShowcase";
import { InitSnippet } from "../components/InitSnippet";
import { PersonalLetter } from "../components/PersonalLetter";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="relative overflow-hidden hero-mesh">
        <HeroSection />
        <FeatureShowcase />
        <InitSnippet />
        {/* <PersonalLetter /> */}
      </main>
      <Footer />
    </>
  );
}
