"use client";
import { Tables } from "@/types";
import { Card } from "@yamori-design/react-components";
import Link from "next/link";
import { ComponentRef, useRef } from "react";

type BingoCardProps = Pick<Tables<"bingos">, "id" | "name"> & {
  user: Pick<Tables<"user_profiles">, "name">;
};

export const BingoCard: React.FC<BingoCardProps> = ({ id, name, user }) => {
  const linkRef = useRef<ComponentRef<typeof Link>>(null);
  return (
    <Card
      onClick={() => linkRef.current?.click()}
      header={
        <Link ref={linkRef} href={`/bingos/${id}`}>
          {name}
        </Link>
      }
    >
      Author: {user.name}
    </Card>
  );
};
