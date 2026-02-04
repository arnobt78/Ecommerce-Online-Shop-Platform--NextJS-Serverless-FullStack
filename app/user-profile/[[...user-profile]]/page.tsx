import Link from 'next/link';
import { UserProfile } from '@clerk/nextjs';
import { LuArrowLeft } from 'react-icons/lu';

export default function UserProfilePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <LuArrowLeft className="h-4 w-4" />
          Back to store
        </Link>
        <div className="flex justify-center">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
