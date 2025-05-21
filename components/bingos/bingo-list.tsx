"use client";
import { List } from "@yamori-design/react-components";
import { BingoCard } from "./bingo-card";
import { ComponentProps } from "react";
import { Nullable } from "@yamori-shared/react-utilities";

type BingoListProps = {
  bingos: Nullable<Array<ComponentProps<typeof BingoCard>>>;
};

export const BingoList: React.FC<BingoListProps> = ({ bingos }) => {
  return (
    <List>
      {bingos?.map((bingo) => (
        <List.Item key={bingo.id} label={<BingoCard {...bingo} />} />
      ))}
    </List>
  );
};
