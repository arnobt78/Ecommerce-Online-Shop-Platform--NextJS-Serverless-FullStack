'use client';
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/products?${params.toString()}`);
  }, 500);

  const searchValue = searchParams.get('search');
  useEffect(() => {
    if (!searchValue) {
      setSearch('');
    }
  }, [searchParams, searchValue]);

  return (
    <div className='relative max-w-xs'>
      <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
      <Input
        type='search'
        placeholder='Search Product...'
        className='pl-9 dark:bg-muted'
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        value={search}
      />
    </div>
  );
}
export default NavSearch;
