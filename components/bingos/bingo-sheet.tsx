"use client";

import { startTransition, useCallback, useMemo, useOptimistic } from "react";
import styles from "./bingo-sheet.module.scss";

type BingoSheetFieldProps = {
  children: BingoSheetProps["fields"][number];
  index: number;
  isChecked: (fieldBit: bigint) => boolean;
} & Pick<BingoSheetProps, "readonly" | "onChange">;

const BingoSheetField: React.FC<BingoSheetFieldProps> = ({
  children,
  readonly,
  index,
  isChecked,
  onChange,
}) => {
  const fieldBit = 1n << BigInt(index);

  return (
    <label className={styles["field"]}>
      {children}
      <input
        readOnly={readonly}
        disabled={readonly}
        type="checkbox"
        checked={isChecked(fieldBit)}
        onChange={() => {
          onChange?.(fieldBit);
        }}
      />
    </label>
  );
};

type BingoSheetProps = {
  fields: string[];
  checked?: bigint;
  permutation?: number[];
  readonly?: boolean;
  onChange?: (flip: bigint) => void;
};

export const BingoSheet: React.FC<BingoSheetProps> = ({
  fields,
  permutation,
  readonly,
  checked = BigInt(0),
  onChange,
}) => {
  const [optimisticChecked, setOptimisticChecked] = useOptimistic(
    checked,
    (state, flip: bigint) => state ^ flip
  );

  const isFieldChecked = useCallback(
    (fieldBit: bigint) => (optimisticChecked & fieldBit) !== 0n,
    [optimisticChecked]
  );

  const columns = Math.ceil(Math.sqrt(fields.length));

  const orderedFields = useMemo(() => {
    if (permutation) return permutation.map((idx) => fields[idx]);

    return fields.concat(new Array(columns * columns - fields.length).fill(""));
  }, [fields, permutation, columns]);

  return (
    <div
      className={styles["bingo-sheet"]}
      role={readonly ? "presentation" : "grid"}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {orderedFields.map((field, index) => (
        <BingoSheetField
          index={index}
          isChecked={isFieldChecked}
          onChange={(flip) => {
            startTransition(() => {
              setOptimisticChecked(flip);
              onChange?.(flip);
            });
          }}
          readonly={readonly}
          key={field}
        >
          {field}
        </BingoSheetField>
      ))}
    </div>
  );
};
