import { createBingo } from "@/actions/bingos";
import { Button, Form, Input, Textarea } from "@yamori-design/react-components";

export default function CreateNew() {
  return (
    <Form action={createBingo}>
      <Form.Field label="Name">
        <Input id="name" name="name" required />
      </Form.Field>
      <Form.Field label="Fields">
        <Textarea id="fields" name="fields" required resizable />
      </Form.Field>
      <Button type="submit">Create New Bingo</Button>
    </Form>
  );
}
