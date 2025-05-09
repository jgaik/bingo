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

export async function playBingo(bingoId: Tables<"bingos">["id"]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) throw new Error();

  const { data } = await supabase
    .from("bingo_sheets")
    .select("id")
    .eq("user_id", user.id)
    .eq("bingo_id", bingoId)
    .maybeSingle();

  if (data) return redirect(`/bingos/${bingoId}/play`);

  const { error } = await supabase.from("bingo_sheets").insert({
    user_id: user.id,
    bingo_id: bingoId,
  });

  if (error) {
    console.error(error);
  } else {
    redirect(`/bingos/${bingoId}/play`);
  }
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
