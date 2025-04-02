"use server";

import { createClient } from "@/utils/supabase/server";
import { getObjectFromFormData } from "@yamori-shared/react-utilities";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const { email, password, name } = getObjectFromFormData(formData);

  const { error } = await createClient(({ auth }) =>
    auth.signUp({ email, password, options: { data: { name } } })
  );

  if (error) {
    console.error(error);
  } else {
    redirect("/");
  }
}

export async function signOut() {
  const { error } = await createClient(({ auth }) => auth.signOut());

  if (error) {
    console.log(error);
  } else {
    redirect("/");
  }
}

export async function signIn(formData: FormData) {
  const { email, password } = getObjectFromFormData(formData);

  const { error } = await createClient(({ auth }) =>
    auth.signInWithPassword({
      email,
      password,
    })
  );

  if (error) {
    console.error(error);
  } else {
    redirect("/");
  }
}

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
