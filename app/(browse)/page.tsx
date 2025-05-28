import { BingoList } from "@/components/bingos";
import { createClient } from "@/utils/supabase/server";

export default async function Browse() {
  const supabase = await createClient();
  const bingosPromise = supabase
    .from("bingos")
    .select("id, name, fields, user: user_id (name)")
    .then((res) => res.data);

  return <BingoList bingosPromise={bingosPromise} linkType="view" />;
}
