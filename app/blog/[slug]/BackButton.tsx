'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="mb-6 flex items-center gap-2 hover:bg-secondary"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Blog
    </Button>
  );
}

