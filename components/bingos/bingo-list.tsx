"use client";
import { List } from "@yamori-design/react-components";
import { BingoCard, BingoCardProps } from "./bingo-card";
import { Nullable } from "@yamori-shared/react-utilities";
import { use } from "react";

type BingoListProps = {
  bingosPromise: PromiseLike<Nullable<Array<Omit<BingoCardProps, "link">>>>;
  linkType: "view" | "play";
};

export const BingoList: React.FC<BingoListProps> = ({
  bingosPromise,
  linkType,
}) => {
  const bingos = use(bingosPromise);

  if (!bingos) return "No bingos";

  return (
    <List>
      {bingos.map((bingo) => (
        <List.Item
          key={bingo.id}
          label={
            <BingoCard
              {...bingo}
              link={`/bingos/${bingo.id}${linkType === "play" ? "/play" : ""}`}
            />
          }
        />
      ))}
    </List>
  );
};
