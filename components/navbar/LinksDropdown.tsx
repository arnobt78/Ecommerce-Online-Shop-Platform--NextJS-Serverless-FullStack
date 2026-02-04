'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft, LuUser } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import UserProfileDropdown from './UserProfileDropdown';

export default function LinksDropdown() {
  return (
    <>
      <SignedOut>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-4 max-w-[100px]">
              <LuAlignLeft className="w-6 h-6" />
              <LuUser className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
            <DropdownMenuItem asChild>
              <Link href="/sign-in" className="w-full cursor-pointer">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/sign-up" className="w-full cursor-pointer">
                Register
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedOut>
      <SignedIn>
        <UserProfileDropdown />
      </SignedIn>
    </>
  );
}
