'use client';

import { useUser, useClerk, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LuSettings, LuLogOut } from 'react-icons/lu';
import { links } from '@/utils/links';

function getAvatarUrl(
  imageUrl: string | undefined,
  name: string | undefined,
  email: string | undefined,
  avatarError: boolean,
  hasImage: boolean
): string | null {
  if (avatarError || !imageUrl || imageUrl.trim() === '') {
    if (hasImage) return null;
    const seed = name || email || 'user';
    return `https://robohash.org/${encodeURIComponent(seed)}.png?size=80x80`;
  }
  return imageUrl;
}

export default function UserProfileDropdown() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { userId } = useAuth();
  const [avatarError, setAvatarError] = useState(false);

  const adminIds = [
    process.env.NEXT_PUBLIC_ADMIN_USER_ID,
    process.env.NEXT_PUBLIC_ADMIN_TEST_USER_ID,
  ].filter(Boolean) as string[];
  const isAdmin = userId ? adminIds.includes(userId) : false;
  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.username ||
    'User';
  const email = user?.primaryEmailAddress?.emailAddress || '';
  const hasImage = user?.hasImage ?? false;
  const avatarUrl = getAvatarUrl(
    user?.imageUrl,
    name,
    email,
    avatarError,
    hasImage
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <div className="relative h-9 w-9 rounded-full border-2 overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                onError={() => setAvatarError(true)}
                referrerPolicy="no-referrer"
                sizes="36px"
              />
            ) : (
              <Skeleton className="h-full w-full rounded-none" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link) => {
          if (link.href === '/admin/sales' && !isAdmin) return null;
          return (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href} className="capitalize cursor-pointer">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/user-profile" className="flex items-center cursor-pointer">
            <LuSettings className="mr-2 h-4 w-4" />
            Manage account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ redirectUrl: '/' })}
          className="cursor-pointer"
        >
          <LuLogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Secured by Clerk
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
