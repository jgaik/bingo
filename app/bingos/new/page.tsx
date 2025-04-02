import { createBingo } from "@/app/actions";
import { Button, Input, Textarea } from "@yamori-design/react-components";
import Form from "next/form";

export default function CreateNew() {
  return (
    <Form action={createBingo}>
      <Input name="name" required />
      <Textarea name="fields" required resizable />
      <Button type="submit">Create New Bingo</Button>
    </Form>
  );
}
