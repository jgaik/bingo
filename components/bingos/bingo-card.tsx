"use client";
import { Tables } from "@/types";
import { Card } from "@yamori-design/react-components";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { ComponentRef, useRef } from "react";
import styles from "./bingo-card.module.scss";

const imageLoader: ImageLoader = ({ src, quality }) => {
  return `https://placehold.co/${src}?text=${quality}x${quality}`;
};

export type BingoCardProps = Pick<
  Tables<"bingos">,
  "id" | "name" | "fields"
> & {
  user?: Pick<Tables<"user_profiles">, "name">;
  link: string;
};

export const BingoCard: React.FC<BingoCardProps> = ({
  name,
  fields,
  user,
  link,
}) => {
  const linkRef = useRef<ComponentRef<typeof Link>>(null);
  const size = Math.sqrt(fields.length);
  return (
    <Card
      className={styles["bingo-card"]}
      onClick={() => linkRef.current?.click()}
      header={
        <Link ref={linkRef} href={link}>
          {name}
        </Link>
      }
      image={
        <Image
          className={styles["image"]}
          loader={imageLoader}
          alt="Bingo size"
          width={100}
          height={100}
          quality={size}
          src={"100x100"}
        />
      }
    >
      {user && <span>Author: {user.name}</span>}
    </Card>
  );
};
