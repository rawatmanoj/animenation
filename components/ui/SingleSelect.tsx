"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { submitSearch } from "@/app/actions/action";

export function SingleSelect({
  lists,
  searchParams,
  type,
  paramYear,
  setIsPending,
  submitSearch,
}: {
  lists: Array<{ value: string; label: string }>;
  searchParams: string;
  type: string;
  paramYear?: string;
  setIsPending: (isPending: boolean) => void;
  submitSearch: (data: string, type: string, searchParams: string) => any;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(paramYear || "");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:w-[200px] w-full justify-between bg-transparent text-muted-foreground "
        >
          {value
            ? lists.find((list) => list.value === value)?.label
            : "Select list..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search list..." />
          <CommandEmpty>No list found.</CommandEmpty>
          <CommandGroup>
            {lists.length > 0 &&
              lists?.map((list) => (
                <CommandItem
                  key={list.value}
                  value={list.value}
                  onSelect={async (currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setIsPending(true);
                    submitSearch(
                      currentValue === value ? "" : currentValue,
                      type,
                      searchParams
                    );
                    setIsPending(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === list.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {list.label}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
