import Form from "next/form";
import { signUp } from "../actions";

export default async function SignUp() {
  return (
    <Form action={signUp}>
      <input name="email" autoComplete="email" required />
      <input
        type="password"
        name="password"
        autoComplete="new-password"
        required
      />
      <input name="name" autoComplete="nickname" required />
      <button type="submit">Sign Up</button>
    </Form>
  );
}
