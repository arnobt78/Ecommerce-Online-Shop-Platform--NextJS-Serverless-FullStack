import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Image
        src="/logo.png"
        alt="Next Store"
        width={32}
        height={32}
        className="shrink-0"
        unoptimized
      />
      <span className="font-bold text-lg bg-gradient-to-r from-primary via-blue-600 to-blue-700 dark:from-primary dark:via-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
        Next Store
      </span>
    </Link>
  );
}
export default Logo;
