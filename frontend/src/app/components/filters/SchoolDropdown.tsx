"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const schools = [
  {
    value: "TUNI",
    label: "TUNI",
  },
  {
    value: "LUT",
    label: "LUT",
  },
  {
    value: "JYU",
    label: "JYU",
  },
];

const SchoolDropdown = ({ setSchool, selectedSchool }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedSchool
            ? schools.find((school) => school.value === selectedSchool)?.label
            : "Valite oppilaitos"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Valite oppilaitos" />
          <CommandList>
            <CommandEmpty>Oppilaitosta ei löytynyt</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school.value}
                  value={school.value}
                  onSelect={(currentValue) => {
                    setSchool(
                      currentValue === selectedSchool ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedSchool === school.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {school.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SchoolDropdown;
