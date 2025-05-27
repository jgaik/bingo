"use client";
import { List } from "@yamori-design/react-components";
import { BingoCard, BingoCardProps } from "./bingo-card";
import { Nullable } from "@yamori-shared/react-utilities";

type BingoListProps = {
  bingos: Nullable<Array<Omit<BingoCardProps, "link">>>;
  linkType: "view" | "play";
};

export const BingoList: React.FC<BingoListProps> = ({ bingos, linkType }) => {
  return (
    <List>
      {bingos?.map((bingo) => (
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
