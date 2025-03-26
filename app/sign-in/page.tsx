import Form from "next/form";
import { signIn } from "../actions";
import Link from "../components/link";

export default async function SignIn() {
  return (
    <Form action={signIn}>
      <Link href="/sign-up">Sign up</Link>
      <input name="email" autoComplete="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button type="submit">Sign In</button>
    </Form>
  );
}
