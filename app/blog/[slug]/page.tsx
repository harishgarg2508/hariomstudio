import type { Metadata } from "next";
import { blogPosts } from "../data/blogPosts";
import BlogPostContent from "./blogpostcontent";

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

  return <BlogPostContent post={post} />;
}