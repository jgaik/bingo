"use client";

import { Tables } from "@/types";
import { useReducer } from "react";
import { BingoSheet } from "./bingo-sheet";
import { updateBingoSheet } from "@/actions/bingos";

type PlayBingoSheetProps = Pick<
  Tables<"bingo_sheets">,
  "id" | "permutation" | "checked_fields"
> & { bingo: Pick<Tables<"bingos">, "fields"> };

export const PlayBingoSheet: React.FC<PlayBingoSheetProps> = ({
  id,
  checked_fields,
  bingo,
  permutation,
}) => {
  const [checked, setChecked] = useReducer(
    (_, next: string) => BigInt(next),
    checked_fields,
    BigInt
  );

  return (
    <BingoSheet
      fields={bingo.fields}
      permutation={permutation}
      checked={checked}
      onChange={(flip) => {
        updateBingoSheet(id, (checked ^ flip).toString())
          .then(({ checked_fields }) => setChecked(checked_fields))
          .catch(console.error);
      }}
    />
  );
};
