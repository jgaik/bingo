import { createClient } from "@/utils/supabase/server";

type BingoProps = {
  params: Promise<{ id: string }>;
};

export default async function Bingo({ params }: BingoProps) {
  const { id } = await params;

  const { data } = await createClient((supabase) =>
    supabase
      .from("bingos")
      .select("name,fields")
      .eq("id", parseInt(id, 10))
      .maybeSingle()
  );

  return data?.name;
}
