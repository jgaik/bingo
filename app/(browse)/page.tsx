import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const { data } = await createClient((supabase) =>
    supabase.from("bingos").select("*")
  );
  return (
    <main>
      <ul>
        {data?.map((bingo) => (
          <li key={bingo.id}>
            <Link href={`/bingos/${bingo.id}`}>{bingo.id}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
