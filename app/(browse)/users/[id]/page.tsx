import { signOut } from "@/actions/auth";
import { BingoList } from "@/components/bingos";
import { createClient } from "@/utils/supabase/server";
import { Button, Details, Loading } from "@yamori-design/react-components";
import { Suspense } from "react";

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

  const createBingosPromise = supabase
    .from("bingos")
    .select("id, name, fields")
    .eq("user_id", id)
    .then((res) => res.data);

  const playingBingoSheetsPromise = supabase
    .from("bingo_sheets")
    .select("bingo_id, bingo: bingo_id (name, fields, user: user_id (name))")
    .eq("user_id", id)
    .then((res) =>
      res.data?.map(({ bingo_id: id, bingo }) => ({
        id,
        ...bingo,
      }))
    );

  const isMyProfile = currentUserData.user?.id === id;

  return (
    <div>
      {user?.name}
      {isMyProfile && (
        <Button variant="text" onClick={signOut}>
          Sing out
        </Button>
      )}
      <Details open summary="Playing">
        <Suspense fallback={<Loading />}>
          <BingoList
            bingosPromise={playingBingoSheetsPromise}
            linkType={isMyProfile ? "play" : "view"}
          />
        </Suspense>
      </Details>
      <Details open summary="Created">
        <Suspense fallback={<Loading />}>
          <BingoList bingosPromise={createBingosPromise} />
        </Suspense>
      </Details>
    </div>
  );
}
