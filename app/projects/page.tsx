import { getProjects } from "@/lib/notion";
import { ProjectCard } from "@/components/project-card";
import { Navbar } from "@/components/layout/Navbar";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <header className="mb-16">
                    <h1 className="text-6xl font-black uppercase tracking-tighter md:text-8xl">
                        Selected <span className="text-[#00C2FF]">Projects</span>_
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl font-bold">
                        A collection of my work ranging from web applications to
                        experimental UI archetypes. All content is synced from Notion.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="border-4 border-dashed border-black p-20 text-center">
                        <p className="text-2xl font-black uppercase">No projects found in Notion.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
