import { signOut } from "@/actions/auth";
import { BingoList } from "@/components/bingos";
import { createClient } from "@/utils/supabase/server";
import { Button, Details } from "@yamori-design/react-components";

type UserProps = {
  params: Promise<{ id: string }>;
};

export default async function User({ params }: UserProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: user } = await supabase
    .from("user_profiles")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  const { data: currentUserData } = await supabase.auth.getUser();

  const { data: createBingos } = await supabase
    .from("bingos")
    .select("id, name, fields")
    .eq("user_id", id);

  const { data: playingBingoSheets } = await supabase
    .from("bingo_sheets")
    .select("bingo_id, bingo: bingo_id (name, fields, user: user_id (name))")
    .eq("user_id", id);

  const isMyProfile = currentUserData.user?.id === id;

  return (
    <div>
      {user?.name}
      {isMyProfile && (
        <Button variant="text" onClick={signOut}>
          Sing out
        </Button>
      )}
      {playingBingoSheets && (
        <Details summary="Playing">
          <BingoList
            bingos={playingBingoSheets.map(({ bingo_id: id, bingo }) => ({
              id,
              ...bingo,
            }))}
            linkType={isMyProfile ? "play" : "view"}
          />
        </Details>
      )}
      {createBingos && (
        <Details summary="Created">
          <BingoList bingos={createBingos} linkType="view" />
        </Details>
      )}
    </div>
  );
}
