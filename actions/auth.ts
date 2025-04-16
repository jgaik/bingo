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
