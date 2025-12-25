import { Fragment } from 'react';
import { cn } from "@/lib/utils";

type TextData = {
    type: string;
    text: {
        content: string;
        link: { url: string } | null;
    };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href: string | null;
};

const TextRenderer = ({ text }: { text: TextData[] }) => {
    if (!text) return null;
    return (
        <>
            {text.map((value, i) => {
                const {
                    annotations: { bold, code, color, italic, strikethrough, underline },
                    text,
                } = value;
                return (
                    <span
                        key={i}
                        className={cn(
                            bold ? "font-bold" : "",
                            code ? "bg-[#FFD100] px-1 font-mono text-sm border-2 border-black" : "",
                            italic ? "italic" : "",
                            strikethrough ? "line-through" : "",
                            underline ? "underline underline-offset-2" : ""
                        )}
                        style={color !== "default" ? { color } : {}}
                    >
                        {text.link ? (
                            <a href={text.link.url} className="underline hover:text-blue-600">
                                {text.content}
                            </a>
                        ) : (
                            text.content
                        )}
                    </span>
                );
            })}
        </>
    );
};

export function NotionBlockRenderer({ block }: { block: any }) {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
        case "paragraph":
            return (
                <p className="mb-4 text-lg leading-relaxed">
                    <TextRenderer text={value.rich_text} />
                </p>
            );
        case "heading_1":
            return (
                <h1 className="mb-4 mt-8 text-4xl font-black uppercase">
                    <TextRenderer text={value.rich_text} />
                </h1>
            );
        case "heading_2":
            return (
                <h2 className="mb-3 mt-6 text-3xl font-bold uppercase border-b-4 border-black inline-block">
                    <TextRenderer text={value.rich_text} />
                </h2>
            );
        case "heading_3":
            return (
                <h3 className="mb-2 mt-4 text-2xl font-bold">
                    <TextRenderer text={value.rich_text} />
                </h3>
            );
        case "bulleted_list_item":
        case "numbered_list_item":
            return (
                <li className="mb-2 ml-4 list-disc text-lg">
                    <TextRenderer text={value.rich_text} />
                </li>
            );
        case "to_do":
            return (
                <div className="flex gap-2 mb-2 items-center">
                    <div className={`w-5 h-5 border-2 border-black ${value.checked ? 'bg-black' : 'bg-white'}`}></div>
                    <span className={value.checked ? 'line-through text-gray-500' : ''}>
                        <TextRenderer text={value.rich_text} />
                    </span>
                </div>
            )
        case "toggle":
            return (
                <details className="mb-4 border-l-4 border-black pl-4">
                    <summary className="font-bold cursor-pointer">
                        <TextRenderer text={value.rich_text} />
                    </summary>
                    <div className="mt-2 text-gray-700">
                        {/* Note: Nested blocks support would need recursion */}
                        (Content inside toggle)
                    </div>
                </details>
            )
        case "image":
            const src = value.type === "external" ? value.external.url : value.file.url;
            const caption = value.caption.length ? value.caption[0].plain_text : "";
            return (
                <figure className="my-8">
                    <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <img src={src} alt={caption || "Block image"} className="w-full h-auto object-cover" />
                    </div>
                    {caption && <figcaption className="mt-2 text-center text-sm font-bold italic">{caption}</figcaption>}
                </figure>
            );
        case "code":
            return (
                <pre className="my-6 bg-black text-white p-4 overflow-x-auto border-4 border-gray-800 shadow-[8px_8px_0px_0px_rgba(100,100,100,1)]">
                    <code className="font-mono text-sm">
                        <TextRenderer text={value.rich_text} />
                    </code>
                </pre>
            );
        case "quote":
            return (
                <blockquote className="my-6 border-l-8 border-[#FFD100] bg-gray-50 p-4 text-xl font-bold italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <TextRenderer text={value.rich_text} />
                </blockquote>
            );
        case "divider":
            return <hr className="my-8 border-t-4 border-black" />;
        default:
            return <div className="hidden">Unsupported block type: {type}</div>;
    }
}
