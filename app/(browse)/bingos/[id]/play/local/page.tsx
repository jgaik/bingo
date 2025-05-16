import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type PlayLocalBingoProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayLocalBingo({ params }: PlayLocalBingoProps) {
  const { id } = await params;

  const { data } = await createClient((supabase) =>
    supabase.from("bingos").select("name,fields").eq("id", id).maybeSingle()
  );

  if (!data) redirect("/");

  return <h1>Local play is under development</h1>;
}
