type PlayBingoProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayBingo({ params }: PlayBingoProps) {
  console.log(await params);
  return <details></details>;
}
