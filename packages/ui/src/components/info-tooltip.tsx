import { Tooltip } from "@base-ui-components/react/tooltip";
import { cn } from "../lib/cn";

type InfoTooltipProps = {
  label: string;
  className?: string;
};

export function InfoTooltip({ label, className }: InfoTooltipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        aria-label="More info"
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-700",
          "hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
          className,
        )}
      >
        i
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup className="max-w-64 rounded-md bg-slate-900 px-2 py-1.5 text-xs text-white shadow-lg">
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
