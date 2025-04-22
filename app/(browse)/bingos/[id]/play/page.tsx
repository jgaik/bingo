import { PlayBingoSheet } from "@/components/bingos/play-bingo-sheet";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type PlayBingoProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayBingo({ params }: PlayBingoProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error();

  const { data: bingoSheet, error } = await supabase
    .from("bingo_sheets")
    .select(
      `id,
      permutation,
      checked_fields,
      bingo: bingo_id (name, fields)`
    )
    .eq("user_id", user.id)
    .eq("bingo_id", id)
    .maybeSingle();

  if (!bingoSheet || error) redirect(`/bingos/${id}`);

  return (
    <div>
      <h6>{bingoSheet.bingo.name}</h6>
      <PlayBingoSheet {...bingoSheet} />
    </div>
  );
}
