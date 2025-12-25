import { getProjectBlocks, getProjectBySlug, getProjects } from "@/lib/notion";
import { NotionBlockRenderer } from "@/components/notion-block-renderer";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const blocks = await getProjectBlocks(project.id);

    return (
        <main className="min-h-screen pb-20">
            <Navbar />

            <article className="mx-auto max-w-4xl px-6 pt-12">
                {/* Back Button */}
                <Link href="/projects">
                    <Button variant="outline" size="sm" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                    </Button>
                </Link>

                {/* Header Section */}
                <header className="mb-12">
                    <h1 className="mb-6 text-5xl font-black uppercase leading-tight md:text-7xl">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {project.tags.map((tag) => (
                            <span key={tag} className="border-2 border-black bg-[#FFD100] px-3 py-1 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-xl font-bold text-gray-700 leading-relaxed border-l-4 border-black pl-6 mb-8">
                        {project.description}
                    </p>

                    <div className="flex gap-4">
                        {project.links.github && (
                            <Button onClick={() => { }} className="pointer-events-auto">
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <Github className="mr-2 h-5 w-5" /> View Code
                                </a>
                            </Button>
                        )}
                        {project.links.demo && (
                            <Button variant="secondary" onClick={() => { }}>
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                                </a>
                            </Button>
                        )}
                    </div>
                </header>

                {/* Cover Image */}
                {project.cover && (
                    <div className="mb-16 border-4 border-black bg-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-auto object-cover max-h-[600px]"
                        />
                    </div>
                )}

                {/* Content Blocks */}
                <div className="prose prose-xl prose-stone max-w-none">
                    {blocks.map((block: any) => (
                        <NotionBlockRenderer key={block.id} block={block} />
                    ))}
                </div>

            </article>
        </main>
    );
}
