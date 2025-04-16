import { signIn } from "@/actions/auth";
import {
  Button,
  Input,
  PasswordInput,
  Form,
  Link,
} from "@yamori-design/react-components";

export default function SignIn() {
  return (
    <Form action={signIn}>
      <Link href="/sign-up">Sign up</Link>
      <Form.Field label="E-mail">
        <Input id="email" name="email" autoComplete="email" required />
      </Form.Field>
      <Form.Field label="Password">
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </Form.Field>
      <Button type="submit">Sign In</Button>
    </Form>
  );
}
