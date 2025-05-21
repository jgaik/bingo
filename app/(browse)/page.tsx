import { BingoList } from "@/components/bingos";
import { createClient } from "@/utils/supabase/server";

export default async function Browse() {
  const { data } = await createClient((supabase) =>
    supabase.from("bingos").select("id, name, fields, user: user_id (name)")
  );

  return <BingoList bingos={data} />;
}
