import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/montessori/Header";
import { Hero } from "@/components/montessori/Hero";
import { Footer } from "@/components/montessori/Footer";
import { VideoSection } from "@/components/montessori/VideoSection";
import { Metodologia } from "@/components/montessori/Metodologia";
import { Ensino } from "@/components/montessori/Ensino";
import { Galeria } from "@/components/montessori/Galeria";
import { ProvaSocial } from "@/components/montessori/ProvaSocial";
import { Estrutura } from "@/components/montessori/Estrutura";
import { Integral } from "@/components/montessori/Integral";
import { Historia } from "@/components/montessori/Historia";
import { Agende } from "@/components/montessori/Agende";
import { Fechamento } from "@/components/montessori/Fechamento";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Escola Montessori Brasília: Matrículas 2027 Abertas" },
      {
        name: "description",
        content:
          "Do Maternal ao 9º ano, método Montessori desde 1970 em Brasília. Matrículas 2027 abertas: agende sua visita e conheça nossa escola.",
      },
      { property: "og:title", content: "Escola Montessori Brasília: Matrículas 2027 Abertas" },
      {
        property: "og:description",
        content:
          "Uma educação que respeita o potencial de cada aluno. Agende sua visita e conheça a Escola Montessori.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-campaign-paper font-body">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <Metodologia />
        <Ensino />
        <Galeria />
        <ProvaSocial />
        <Estrutura />
        <Integral />
        <Historia />
        <Agende />
        <Fechamento />
      </main>
      <Footer />
    </div>
  );
}
