"use server";

import { Tables } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { getObjectFromFormData } from "@yamori-shared/react-utilities";
import { redirect } from "next/navigation";

export async function createBingo(formData: FormData) {
  const { name, fields } = getObjectFromFormData(formData);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) throw new Error();

  const { data, error } = await supabase
    .from("bingos")
    .insert({ name, fields: fields.split(","), user_id: user.id })
    .select();

  if (error) {
    console.error(error);
  } else {
    redirect(`/bingos/${data[0].id}`);
  }
}

export async function playBingo(bingoId: Tables<"bingos">["id"]): Promise<
  Pick<Tables<"bingo_sheets">, "id" | "permutation" | "checked_fields"> & {
    bingo: Pick<Tables<"bingos">, "name" | "fields">;
  }
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) redirect(`bingos/${bingoId}/play/local`);

  let { data, error } = await supabase
    .from("bingo_sheets")
    .select(
      `id,
      permutation,
      checked_fields,
      bingo: bingo_id (name, fields)`
    )
    .eq("user_id", user.id)
    .eq("bingo_id", bingoId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (data) return data;

  ({ data, error } = await supabase
    .from("bingo_sheets")
    .insert({
      user_id: user.id,
      bingo_id: bingoId,
    })
    .select(
      `id,
      permutation,
      checked_fields,
      bingo: bingo_id (name, fields)`
    )
    .single());

  if (error) throw new Error(error.message);
  if (!data) redirect(`/bingos/${bingoId}`);

  return data;
}

export async function updateBingoSheet(
  id: Tables<"bingo_sheets">["id"],
  checkedFields: Tables<"bingo_sheets">["checked_fields"]
) {
  const { data, error } = await createClient((supabase) =>
    supabase
      .from("bingo_sheets")
      .update({ checked_fields: checkedFields })
      .eq("id", id)
      .select()
      .single()
  );

  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
}
