"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";
import { useFormStatus } from "react-dom";
import { submitSearch } from "@/app/actions/action";
import { useRouter } from "next/navigation";
type listItem = Record<"value" | "label", string>;

const lists = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  },
] satisfies listItem[];

export default function FancyMultiSelect({
  lists,
  type,
  searchParams,
  setIsPending,
  paramGenres,
  submitSearch,
}: {
  lists: Array<{ value: string; label: string }>;
  searchParams: string;
  type: string;
  setIsPending: (isPending: boolean) => any;
  submitSearch: (data: listItem[], type: string, searchParams: string) => any;
  paramGenres: Array<any>;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<listItem[]>(paramGenres || []);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((listItem: listItem) => {
    setSelected((prev) => prev.filter((s) => s.value !== listItem.value));
  }, []);
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = lists.filter((listItem) => !selected.includes(listItem));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent text-white"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((listItem) => {
            return (
              <Badge key={listItem?.value} variant="secondary">
                {listItem?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(listItem);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={async () => {
                    setIsPending(true);
                    submitSearch(
                      [...selected.filter((s) => s.value !== listItem.value)],
                      type,
                      searchParams
                    );
                    handleUnselect(listItem);
                    setIsPending(false);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select lists..."
            // aria-disabled={true}
            // disabled={isPending}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((listItem) => {
                return (
                  <CommandItem
                    key={listItem.value}
                    onMouseDown={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={async (value) => {
                      setInputValue("");
                      setIsPending(true);
                      setSelected((prev) => [...prev, listItem]);
                      submitSearch([...selected, listItem], type, searchParams);
                      setIsPending(false);
                    }}
                    className={"cursor-pointer"}
                  >
                    {listItem.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
