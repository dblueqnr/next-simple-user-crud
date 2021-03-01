import Link from "next/link";

export function Home() {
  return (
    <div>
      <Link href="/users">
        <a>Administrar Usuários</a>
      </Link>
    </div>
  );
}
