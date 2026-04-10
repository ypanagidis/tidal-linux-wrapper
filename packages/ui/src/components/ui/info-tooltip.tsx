import { cn } from "../../lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

type InfoTooltipProps = {
  label: string
  className?: string
}

function InfoTooltip({ label, className }: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="More info"
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-700",
          "hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
          className
        )}
      >
        i
      </TooltipTrigger>
      <TooltipContent className="max-w-64 rounded-md bg-slate-900 px-2 py-1.5 text-xs text-white shadow-lg">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export { InfoTooltip }
