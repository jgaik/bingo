import Form from "next/form";
import { signIn } from "../actions";
import { Link } from "@/components";
import { Button, Input, PasswordInput } from "@yamori-design/react-components";

export default function SignIn() {
  return (
    <Form action={signIn}>
      <Link href="/sign-up">Sign up</Link>
      <Input name="email" autoComplete="email" required />
      <PasswordInput name="password" autoComplete="current-password" required />
      <Button type="submit">Sign In</Button>
    </Form>
  );
}
