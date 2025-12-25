import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="mx-auto max-w-4xl px-6 py-20">
                <h1 className="text-6xl font-black uppercase tracking-tighter md:text-8xl mb-12">
                    About <span className="text-[#FF90E8]">Me</span>_
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="md:col-span-1">
                        <div className="aspect-square border-4 border-black bg-[#FFD100] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden relative group">
                            {/* Placeholder for Photo */}
                            <img
                                src="/fauzan.png"
                                alt="Fauzan Mugi Irwansyah"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                onError={(e) => {
                                    // Fallback if image not found
                                    (e.target as any).src = "https://ui-avatars.com/api/?name=Fauzan+Mugi&background=FF8BA7&color=000&size=512";
                                }}
                            />
                            <div className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6 text-xl font-bold">
                        <p>
                            Hello! I am <strong>Fauzan Mugi Irwansyah</strong>.
                            I am a student at <strong>Politeknik Negeri Ujung Pandang</strong>, majoring in
                            <strong> Teknik Informatika dan Komputer</strong>, specifically in the
                            <strong> Multimedia dan Jaringan</strong> study program (2021-2025).
                        </p>
                        <p>
                            My journey is driven by a commitment to excellence, currently
                            maintaining a <strong>GPA (IPK) of 3.79</strong> while exploring
                            the deep technicalities of modern web engines and network systems.
                        </p>
                        <p>
                            I believe in <span className="underline decoration-[#00C2FF] decoration-4">brutal honesty</span> in design.
                            Why hide the structure? Why soften the edges? Let the function lead
                            and the form will follow, loud and proud.
                        </p>
                        <a href="/cv-fauzan.pdf" download="CV-Fauzan-Mugi-Irwansyah.pdf" className="inline-block w-full md:w-auto">
                            <Button variant="secondary" className="w-full">
                                Download CV
                            </Button>
                        </a>
                    </div>
                </div>

                <Card color="bg-white">
                    <h3 className="text-3xl font-black uppercase mb-6">Education & Experience_</h3>
                    <div className="space-y-8">
                        {[
                            { role: 'Multimedia & Network Student', co: 'Politeknik Negeri Ujung Pandang', period: '2021 - 2025', desc: 'IPK 3.79' },
                            { role: 'Research Intern', co: 'Badan Riset Dan Inovasi Nasional (BRIN)', period: 'Sept 2024 - Mar 2025' },
                            { role: 'Junior Programmer', co: 'Code Lab PNUP', period: '2022 - 2023' },
                        ].map((exp, i) => (
                            <div key={i} className="flex justify-between items-start border-b-2 border-black pb-4 last:border-0 last:pb-0">
                                <div>
                                    <h4 className="text-2xl font-black uppercase">{exp.role}</h4>
                                    <p className="font-bold text-gray-600">{exp.co}</p>
                                </div>
                                <span className="bg-black text-white px-2 py-1 text-sm font-bold rotate-2">
                                    {exp.period}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>
        </main>
    );
}
