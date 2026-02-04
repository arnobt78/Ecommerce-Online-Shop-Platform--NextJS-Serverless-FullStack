import SignInForm from "@/components/auth/SignInForm";

interface SignInPageProps {
  searchParams?: { guest?: string };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const guest = searchParams?.guest;
  const isGuest = guest === "true" ? true : guest === "admin" ? "admin" : false;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <SignInForm isGuest={isGuest} />
    </div>
  );
}
