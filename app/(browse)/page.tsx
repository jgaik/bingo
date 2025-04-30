import { BingoCard } from "@/components/bingos";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const { data } = await createClient((supabase) =>
    supabase.from("bingos").select("id, name, user: user_id (name)")
  );
  return (
    <ul>
      {data?.map((bingo) => (
        <li key={bingo.id}>
          <BingoCard {...bingo} />
        </li>
      ))}
    </ul>
  );
}
