import { createContext, useContext } from "react";
import type { PopoverContextValue } from "./popover.type";

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopoverContext(componentName: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`<${componentName}> must be used within <Popover>`);
  return ctx;
}
