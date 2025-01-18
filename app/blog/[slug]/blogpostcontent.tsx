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
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black shadow-md">
          <Navbar />
        </div>
      </header>
      
      <main className="flex-grow mt-16 md:mt-20">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-lg dark:prose-invert max-w-4xl">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-8 text-sm md:text-base">
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
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg text-sm md:text-base"
            >
              Visit HariOm Studio Website
            </a>
          </div>

          <div className="mt-8">
            <ReactMarkdown 
              className="prose prose-sm md:prose-lg dark:prose-invert max-w-none"
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-bold mt-4 mb-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 md:pl-6 mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 md:pl-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-base md:text-lg" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                a: ({node, ...props}) => (
                  <a 
                    className="text-blue-600 hover:text-blue-800 underline" 
                    {...props}
                  />
                ),
                img: ({node, ...props}) => (
                  <img 
                    className="w-full h-auto my-4 rounded-lg shadow-md" 
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