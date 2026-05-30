"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils"

import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from "lucide-react"

function Select({
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Root
>) {

  return (
    <SelectPrimitive.Root
      data-slot="select"
      {...props}
    />
  )
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Group
>) {

  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(
        "scroll-my-1 p-1",
        className
      )}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Value
>) {

  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  size?: "sm" | "default"
}) {

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition-all",
        "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >

      {children}

      <SelectPrimitive.Icon asChild>

        <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />

      </SelectPrimitive.Icon>

    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "start",
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Content
>) {

  return (

    <SelectPrimitive.Portal>

      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        align={align}
        sideOffset={8}
        className={cn(
          "relative z-[999] max-h-96 min-w-[220px] overflow-hidden rounded-xl border border-white/10 bg-black text-white shadow-2xl backdrop-blur-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >

        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >

          {children}

        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />

      </SelectPrimitive.Content>

    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Label
>) {

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Item
>) {

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors",
        "focus:bg-violet-500/20 focus:text-white",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >

      <span className="absolute right-3 flex items-center justify-center">

        <SelectPrimitive.ItemIndicator>

          <CheckIcon className="h-4 w-4" />

        </SelectPrimitive.ItemIndicator>

      </span>

      <SelectPrimitive.ItemText>

        {children}

      </SelectPrimitive.ItemText>

    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.Separator
>) {

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "my-1 h-px bg-white/10",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>) {

  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex items-center justify-center py-2 text-white",
        className
      )}
      {...props}
    >

      <ChevronUpIcon className="h-4 w-4" />

    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
>) {

  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex items-center justify-center py-2 text-white",
        className
      )}
      {...props}
    >

      <ChevronDownIcon className="h-4 w-4" />

    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}