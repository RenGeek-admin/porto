"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/notion";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Card className="flex flex-col h-full group">
            <Link href={`/projects/${project.slug}`} className="block relative h-48 mb-4 border-4 border-black overflow-hidden bg-gray-200 cursor-pointer">
                {project.cover ? (
                    <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 uppercase">
                        No Image
                    </div>
                )}
            </Link>

            <div className="flex-1 flex flex-col">
                <Link href={`/projects/${project.slug}`} className="hover:underline decoration-4 decoration-[#FFD100]">
                    <h3 className="text-2xl font-black uppercase mb-2">{project.title}</h3>
                </Link>
                <p className="font-bold text-gray-700 mb-4 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="border-2 border-black bg-white px-2 py-0.5 text-xs font-black uppercase">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex gap-4">
                    <Link href={`/projects/${project.slug}`} className="flex-1">
                        <Button variant="primary" size="sm" className="w-full">
                            Read Case Study
                        </Button>
                    </Link>
                </div>
                <div className="mt-4 flex gap-4">
                    {project.links.github && (
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(project.links.github, '_blank')}>
                            <Github size={18} className="mr-2" /> Code
                        </Button>
                    )}
                    {project.links.demo && (
                        <Button variant="secondary" size="sm" className="flex-1" onClick={() => window.open(project.links.demo, '_blank')}>
                            <ExternalLink size={18} className="mr-2" /> Live
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
