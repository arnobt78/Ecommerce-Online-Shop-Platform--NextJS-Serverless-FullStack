import SignInForm from "@/components/auth/SignInForm";

interface SignInPageProps {
  searchParams?: { guest?: string; redirect_url?: string };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const guest = searchParams?.guest;
  const isGuest = guest === "true" ? true : guest === "admin" ? "admin" : false;
  const redirectUrl = searchParams?.redirect_url || "/products";

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <SignInForm isGuest={isGuest} redirectUrl={redirectUrl} />
    </div>
  );
}
