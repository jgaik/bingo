import { signUp } from "@/actions/auth";
import {
  Button,
  Form,
  Input,
  PasswordInput,
} from "@yamori-design/react-components";

export default function SignUp() {
  return (
    <Form action={signUp}>
      <Form.Field label="E-mail">
        <Input id="email" name="email" autoComplete="email" required />
      </Form.Field>
      <Form.Field label="Password">
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          required
        />
      </Form.Field>
      <Form.Field label="Name">
        <Input id="name" name="name" autoComplete="nickname" required />
      </Form.Field>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
}
