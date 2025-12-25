import { Client } from '@notionhq/client';
import 'server-only';

const notionClient: Client | null = process.env.NOTION_API_KEY
    ? new Client({ auth: process.env.NOTION_API_KEY })
    : null;

export const DATABASE_IDS = {
    PROJECTS: process.env.NOTION_PROJECTS_DATABASE_ID!,
    BLOG: process.env.NOTION_BLOG_DATABASE_ID!,
};

export type Project = {
    id: string;
    title: string;
    slug: string;
    description: string;
    cover: string;
    tags: string[];
    links: {
        github?: string;
        demo?: string;
    };
    featured: boolean;
};

const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'NeoBrutal Portfolio',
        slug: 'neo-brutal-portfolio',
        description: 'A high-performance portfolio template with bold aesthetics and Notion CMS.',
        cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        tags: ['Next.js', 'Tailwind', 'Notion'],
        links: { github: 'https://github.com', demo: 'https://demo.com' },
        featured: true
    },
    {
        id: '2',
        title: 'Fintech Dashboard',
        slug: 'fintech-dashboard',
        description: 'Clean and functional dashboard for managing crypto assets and stocks.',
        cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
        tags: ['React', 'D3.js', 'Firebase'],
        links: { github: 'https://github.com' },
        featured: false
    }
];

export async function getProjects(): Promise<Project[]> {
    if (!notionClient || !process.env.NOTION_API_KEY) {
        console.warn('Notion Client not initialized (API Key missing). Using mock data.');
        return MOCK_PROJECTS;
    }

    try {
        const response = await notionClient.databases.query({
            database_id: DATABASE_IDS.PROJECTS,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: 'Priority',
                    direction: 'ascending',
                },
            ],
        });

        return response.results.map((page: any) => {
            return {
                id: page.id,
                title: page.properties.Title?.title[0]?.plain_text || 'Untitled',
                slug: page.properties.Slug?.rich_text[0]?.plain_text || '',
                description: page.properties.Description?.rich_text[0]?.plain_text || '',
                cover: page.cover?.external?.url || page.cover?.file?.url || '',
                tags: page.properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
                links: {
                    github: page.properties.Github?.url || undefined,
                    demo: page.properties.Demo?.url || undefined,
                },
                featured: page.properties.Featured?.checkbox || false,
            };
        });
    } catch (error) {
        console.error('Error fetching from Notion:', error);
        return MOCK_PROJECTS;
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    if (!notionClient || !process.env.NOTION_API_KEY) {
        return MOCK_PROJECTS.find(p => p.slug === slug) || null;
    }

    try {
        const response = await notionClient.databases.query({
            database_id: DATABASE_IDS.PROJECTS,
            filter: {
                and: [
                    {
                        property: 'Published',
                        checkbox: {
                            equals: true,
                        },
                    },
                    {
                        property: 'Slug',
                        rich_text: {
                            equals: slug,
                        },
                    },
                ],
            },
        });

        if (response.results.length === 0) {
            return null;
        }

        const page = response.results[0] as any;
        return {
            id: page.id,
            title: page.properties.Title?.title[0]?.plain_text || 'Untitled',
            slug: page.properties.Slug?.rich_text[0]?.plain_text || '',
            description: page.properties.Description?.rich_text[0]?.plain_text || '',
            cover: page.cover?.external?.url || page.cover?.file?.url || '',
            tags: page.properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
            links: {
                github: page.properties.Github?.url || undefined,
                demo: page.properties.Demo?.url || undefined,
            },
            featured: page.properties.Featured?.checkbox || false,
        };
    } catch (error) {
        console.error('Error fetching project by slug:', error);
        return null;
    }
}

export async function getProjectBlocks(blockId: string) {
    if (!notionClient || !process.env.NOTION_API_KEY) {
        return [];
    }

    try {
        const response = await notionClient.blocks.children.list({
            block_id: blockId,
        });
        return response.results;
    } catch (error) {
        console.error('Error fetching project blocks:', error);
        return [];
    }
}
