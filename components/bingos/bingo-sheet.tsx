import { useMemo } from "react";
import styles from "./bingo-sheet.module.scss";

type BingoSheetProps = {
  fields: string[];
  checkedFields?: number;
  permutation?: number[];
  readonly?: boolean;
};

export const BingoSheet: React.FC<BingoSheetProps> = ({
  fields,
  permutation,
  readonly,
}) => {
  const width = Math.ceil(Math.sqrt(fields.length));

  const orderedFields = useMemo(() => {
    const ordered = permutation
      ? permutation.map((idx) => fields[idx])
      : fields;

    const filled = ordered.concat(
      new Array(width * width - ordered.length).fill("")
    );

    return filled;
  }, [fields, permutation, width]);

  return (
    <div
      className={styles["bingo-sheet"]}
      style={{
        gridTemplate: `repeat(${width}, 1fr) / repeat(${width}, 1fr)`,
      }}
    >
      {orderedFields.map((field) => (
        <button disabled={readonly} className={styles["button"]} key={field}>
          {field}
        </button>
      ))}
    </div>
  );
};
