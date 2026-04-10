import { type Verse } from "@/data/bible/web";

type Props = {
  verse: Verse;
};

export default function VerseBlock({ verse }: Props) {
  return (
    <span className="inline">
      <sup className="text-xs font-semibold text-gray-400 mr-1 select-none leading-none">
        {verse.number}
      </sup>
      <span className="text-gray-800 leading-relaxed">{verse.text} </span>
    </span>
  );
}
