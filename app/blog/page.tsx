"use client";

import { ServicesHero } from "./ServicesHero";
import { ServiceCategories } from "./ServiceCategories";
import { StudentUpdates } from "./StudentUpdates";
import { AstrologyServices } from "./AstrologyServices";
import { PhotoServices } from "./PhotoServices";
import { PrintingServices } from "./cyber-cafe";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { blogPosts } from "./data/blogPosts";

// Convert blog posts to array and get latest entries
const featuredPosts = Object.entries(blogPosts)
  .map(([slug, post]) => ({
    id: slug,
    slug,
    title: post.title,
    excerpt: post.description,
    date: post.date,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ServicesHero />
      <ServiceCategories />
      <section id="student-services">
        <StudentUpdates />
      </section>
      <section id="photo-services">
        <PhotoServices />
      </section>
      <section id="cyber-cafe">
        <PrintingServices />
      </section>
      <section id="astrology-services">
        <AstrologyServices />
      </section>
      
      <section id="blog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
            </div>
            <Link 
              href="/blog" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              View All Posts
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <time dateTime={post.date} className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}