import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type RacquetImageProps = {
  imageUrl?: string | null;
  label: string;
  className?: string;
  iconClassName?: string;
};

export function RacquetImage({ imageUrl, label, className, iconClassName }: RacquetImageProps) {
  if (!imageUrl) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-slate-100 text-slate-400",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <ImageIcon className={cn("h-8 w-8", iconClassName)} aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            No image
          </p>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={label} className={cn("h-full w-full object-cover", className)} src={imageUrl} />;
}
