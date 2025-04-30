import { createBingo } from "@/actions/bingos";
import { NewBingoForm } from "@/components/bingos";

export default function NewBingo() {
  return <NewBingoForm action={createBingo} />;
}
