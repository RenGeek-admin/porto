import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Code, Laptop, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border-4 border-black bg-[#FFD100] px-4 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles size={20} />
              <span>Available for Hire</span>
            </div>
            <h1 className="mt-8 text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl">
              Building <span className="text-[#00C2FF]">Digital</span> <br />
              Experiences <span className="text-[#FF90E8]">Boldly</span>.
            </h1>
            <p className="mt-8 max-w-xl text-xl font-bold leading-relaxed">
              I am <strong>Fauzan Mugi Irwansyah</strong>, a passionate developer from
              <strong> Politeknik Negeri Ujung Pandang</strong>. I build high-performance
              web applications with a bold aesthetic and smooth experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" variant="primary">
                View My Projects <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Read Blog
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card color="bg-[#FF90E8]" className="rotate-3">
              <div className="space-y-4">
                <div className="h-12 w-12 border-4 border-black bg-white p-2">
                  <Code size={32} />
                </div>
                <h3 className="text-3xl font-black uppercase">Software Engineer</h3>
                <p className="font-bold">
                  Majoring in Computer Engineering with <strong>IPK 3.79</strong>.
                  Focused on building robust systems and NeoBrutalist UI.
                </p>
              </div>
            </Card>
            <Card color="bg-[#00C2FF]" className="absolute -bottom-20 -right-8 -rotate-6 hidden md:block">
              <div className="flex items-center gap-4">
                <Laptop size={32} />
                <span className="text-xl font-black uppercase">IPK 3.79</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Teaser */}
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter md:text-6xl">
            My Arsenal_
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {['Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Notion API'].map((skill) => (
              <div key={skill} className="border-2 border-white p-4 text-center font-bold uppercase hover:bg-white hover:text-black transition-colors">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
