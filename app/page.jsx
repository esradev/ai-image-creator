import Link from "next/link";
export default function Page() {
  return (
    <div>
      <h1 className="text-blue-500">My App</h1>
      <Link href="/login">Login</Link>
      <p>Isn't this cool?</p>
    </div>
  );
}
