import { playBingo } from "@/actions/bingos";
import { PlayBingoSheet } from "@/components/bingos";

type PlayBingoProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayBingo({ params }: PlayBingoProps) {
  const { id } = await params;
  const bingoSheet = await playBingo(id);

  return <PlayBingoSheet {...bingoSheet} />;
}
