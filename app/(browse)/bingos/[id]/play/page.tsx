import { playBingo } from "@/actions/bingos";
import { PlayBingoSheet } from "@/components/bingos";

type PlayBingoProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayBingo({ params }: PlayBingoProps) {
  const { id } = await params;
  const bingoSheet = await playBingo(id);

  return (
    <div>
      <h6>{bingoSheet.bingo.name}</h6>
      <PlayBingoSheet {...bingoSheet} />
    </div>
  );
}
