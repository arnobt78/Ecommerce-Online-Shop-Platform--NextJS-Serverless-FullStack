import Link from 'next/link';
import { Button } from '../ui/button';
import { VscCode } from 'react-icons/vsc';

function Logo() {
  return (
    <Button size='icon' variant='ghost' className='gap-2 px-2' asChild>
      <Link href='/' className='flex items-center gap-2'>
        <VscCode className='w-6 h-6 shrink-0' />
        <span className='font-bold text-lg bg-gradient-to-r from-primary via-blue-600 to-blue-700 dark:from-primary dark:via-blue-400 dark:to-blue-500 bg-clip-text text-transparent'>
          Next Store
        </span>
      </Link>
    </Button>
  );
}
export default Logo;
