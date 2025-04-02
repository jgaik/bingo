import Form from "next/form";
import { signUp } from "../actions";
import { Button, Input, PasswordInput } from "@yamori-design/react-components";

export default function SignUp() {
  return (
    <Form action={signUp}>
      <Input name="email" autoComplete="email" required />
      <PasswordInput name="password" autoComplete="new-password" required />
      <Input name="name" autoComplete="nickname" required />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
}
