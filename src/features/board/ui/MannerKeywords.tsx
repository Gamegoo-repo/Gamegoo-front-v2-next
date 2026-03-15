import { cn } from "@/shared/libs/cn";
import { OuterBox } from "@/shared/ui/board-detail-modal";

import {
  MANNER_KEYWORDS,
  MannerData,
  MannerKeywordsBad,
  MannerKeywordsGood
} from "@/entities/post";

export function MannerKeywords({ mannerData }: { mannerData: MannerData | undefined }) {
  if (!mannerData) return null;

  return (
    <div className="flex gap-4 *:flex-1">
      <Container
        keywords={MANNER_KEYWORDS.GOOD}
        label="매너"
        mannerKeywords={mannerData.mannerKeywords}
      />
      <Container
        keywords={MANNER_KEYWORDS.BAD}
        label="비매너"
        mannerKeywords={mannerData.mannerKeywords}
      />
    </div>
  );
}

type ContainerProps = {
  label: "매너" | "비매너";
  keywords: ReadonlyArray<MannerKeywordsGood | MannerKeywordsBad>;
  mannerKeywords: MannerData["mannerKeywords"];
};

function Container({ label, keywords, mannerKeywords }: ContainerProps) {
  return (
    <OuterBox label={`받은 ${label} 평가`}>
      <ul className="rounded-xl border border-gray-300 bg-white">
        {keywords.map((v, i) => {
          const mannerKeywordsGood =
            mannerKeywords.find((v) => v.mannerKeywordId === i + 1)?.count ?? 0;
          const mannerKeywordsBad =
            mannerKeywords.find((v) => v.mannerKeywordId === MANNER_KEYWORDS.BAD.length + 1)
              ?.count ?? 0;

          return (
            <li
              key={v}
              className={cn(
                "flex justify-between px-4 py-2 last:rounded-b-xl even:bg-gray-200",
                label === "매너" && mannerKeywordsGood > 0 && "text-violet-600",
                label === "비매너" && mannerKeywordsBad > 0 && "text-red-600"
              )}
            >
              <span className="font-medium">{v}</span>
              <span className="font-semibold">
                {label === "매너" ? mannerKeywordsGood : mannerKeywordsBad}
              </span>
            </li>
          );
        })}
      </ul>
    </OuterBox>
  );
}
