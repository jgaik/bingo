import { signOut } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@yamori-design/react-components";

type UserProps = {
  params: Promise<{ id: string }>;
};

export default async function User({ params }: UserProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from("user_profiles")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      {data?.name}
      {userData.user?.id === id && (
        <Button variant="text" onClick={signOut}>
          Sing out
        </Button>
      )}
    </>
  );
}
