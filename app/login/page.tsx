export default function Page() {
  return (
    <main className="flex flex-col gap-3 h-screen items-center justify-center ">
      <a
        href="/api/auth/signin"
        className="text-2xl bg-red-500 p-1 pb-2 pl-2 pr-2 rounded-md"
      >
        Sign In with Google
      </a>
    </main>
  );
}
