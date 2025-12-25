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
                        <div className="aspect-square border-4 border-black bg-[#FFD100] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
                            <span className="text-8xl font-black">?</span>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6 text-xl font-bold">
                        <p>
                            I am a digital architect based in the ethereal realms of code.
                            My journey started with a simple "Hello World" and evolved into
                            crafting complex systems that live on the edge.
                        </p>
                        <p>
                            I believe in <span className="underline decoration-[#00C2FF] decoration-4">brutal honesty</span> in design.
                            Why hide the structure? Why soften the edges? Let the function lead
                            and the form will follow, loud and proud.
                        </p>
                        <Button variant="secondary" className="w-full md:w-auto">
                            Download CV
                        </Button>
                    </div>
                </div>

                <Card color="bg-white">
                    <h3 className="text-3xl font-black uppercase mb-6">Experience_</h3>
                    <div className="space-y-8">
                        {[
                            { role: 'Senior Developer', co: 'Tech Titans', period: '2022 - Present' },
                            { role: 'Mid-Level Engineer', co: 'Startup X', period: '2020 - 2022' },
                            { role: 'Junior Web Geek', co: 'Local Agency', period: '2018 - 2020' },
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
