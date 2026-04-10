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
          "inline-flex size-5 items-center justify-center rounded-full bg-surface-container-low text-xs text-muted-foreground ring-1 ring-border",
          "hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          className
        )}
      >
        i
      </TooltipTrigger>
      <TooltipContent className="max-w-64 rounded-md px-2 py-1.5 text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export { InfoTooltip }
