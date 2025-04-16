import { BingoSheet } from "@/components/bingos";
import { createClient } from "@/utils/supabase/server";
import { Button, Form, Input } from "@yamori-design/react-components";
import { redirect } from "next/navigation";

type BingoProps = {
  params: Promise<{ id: string }>;
};

export default async function Bingo({ params }: BingoProps) {
  const bingoId = await params.then(({ id }) => parseInt(id, 10));

  const { data } = await createClient((supabase) =>
    supabase
      .from("bingos")
      .select("name,fields")
      .eq("id", bingoId)
      .maybeSingle()
  );

  if (!data) redirect("/");

  return (
    <div>
      <Form action={`/bingos/${bingoId}/play`}>
        <Form.Field label="Name">
          <Input readOnly id="name" value={data.name} />
        </Form.Field>
        <Button type="submit">Play</Button>
      </Form>
      <BingoSheet fields={data.fields} readonly />
    </div>
  );
}
