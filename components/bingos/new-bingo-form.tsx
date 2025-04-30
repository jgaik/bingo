"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Textarea,
} from "@yamori-design/react-components";
import { ComponentProps } from "react";
import { BingoSheet } from "./bingo-sheet";

const SEPARATORS = [
  ["\\n", "New Line"],
  [",", "Comma"],
  [";", "Semicolon"],
  [".", "Dot"],
];

type NewBingoFormProps = {
  action: ComponentProps<typeof Form>["action"];
};

export const NewBingoForm: React.FC<NewBingoFormProps> = ({ action }) => {
  const [separator, setSeparator] = useState<string | null>("\\n");
  const [customSeparator, setCustomSeparator] = useState<string | null>(null);
  const [fieldsString, setFieldsString] = useState<string>("");

  const fields = useMemo(
    () =>
      fieldsString
        .trim()
        .split(RegExp(customSeparator ?? separator ?? "\n"))
        .map((field) => field.trim()),
    [customSeparator, fieldsString, separator]
  );

  return [
    <Form key="bingo-form" action={action}>
      <Form.Field label="Name">
        <Input id="name" name="name" required />
      </Form.Field>
      <Form.Field label="Fields">
        <Textarea
          id="fields"
          name="fields"
          required
          resizable
          onChange={(e) => setFieldsString(e.currentTarget.value)}
        />
      </Form.Field>
      <Form.Field label="Separator">
        <Select
          id="separator"
          value={separator}
          onChange={(value) => {
            if (value) {
              setCustomSeparator(null);
            }
            setSeparator(value);
          }}
        >
          {[
            ...SEPARATORS.map(([value, label]) => (
              <Select.Option key={value} value={value}>
                {label} (<b>{value}</b>)
              </Select.Option>
            )),
            <Select.Option key="custom" value="">
              Custom
            </Select.Option>,
          ]}
        </Select>
      </Form.Field>
      <Form.Field label="Custom separator" hidden={!!separator}>
        <Input
          id="custom-separator"
          name="separator"
          value={customSeparator ?? separator ?? ""}
          onChange={(e) => {
            setCustomSeparator(e.currentTarget.value);
          }}
          required
        />
      </Form.Field>
      <Button type="submit">Create New Bingo</Button>
    </Form>,
    <BingoSheet key="bingo-sheet" fields={fields} readonly />,
  ];
};
