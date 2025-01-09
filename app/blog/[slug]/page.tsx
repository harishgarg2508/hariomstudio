"use client";

import Footer from "@/app/components/footer";
import type { Metadata } from "next";
import BackButton from "./BackButton";
import { blogPosts } from "../data/blogPosts";
import ReactMarkdown from 'react-markdown';

type Props = {
  params: { slug: string };
};

// Add generateStaticParams to tell Next.js which routes to pre-render
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts[params.slug];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <article className="container mx-auto px-4 py-8 prose prose-lg dark:prose-invert max-w-4xl">
        <BackButton />
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
        </div>
        <div className="mt-8">
          <ReactMarkdown 
            className="prose prose-lg dark:prose-invert"
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              p: ({node, ...props}) => <p className="mb-4" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <Footer />
    </>
  );
}