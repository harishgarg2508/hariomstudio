"use client";

import Footer from "@/app/components/footer";
import BackButton from "./BackButton";
import ReactMarkdown from 'react-markdown';
import Navbar from "@/app/components/Navbar";
import BlogPost from "../data/blogPosts";

type Props = {
  post: BlogPost;
};

export default function BlogPostContent({ post }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-24">
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
          
          {/* CTA Button */}
          <div className="my-8 text-center">
            <a 
              href="https://hariomstudiobilaspur.in" 
              className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Visit HariOm Studio Website
            </a>
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
                a: ({node, ...props}) => (
                  <a 
                    className="text-blue-600 hover:text-blue-800 underline" 
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}