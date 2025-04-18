"use client";

import * as React from "react";
import { ChevronDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inboxes = [
  "mydva@dotekypohybu.cz",
  "martin@dotekypohybu.cz",
  "svatuska@dotekypohybu.cz",
];

export function ChatInput() {
  return (
    <div className="relative rounded-lg border p-3">
      <div className="flex flex-grow flex-row items-start">
        <Textarea
          variant="autoGrow"
          placeholder="Paste your email here..."
          className="max-h-60"
        />
        <Button size="icon" disabled className="rounded-md">
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <div className="flex items-center -ml-2 -mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 font-normal"
            >
              {inboxes[0]}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {inboxes.map((modelOption) => (
              <DropdownMenuItem key={modelOption}>
                {modelOption}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          className="ml-1 border-none shadow-none focus-visible:ring-0 !bg-transparent"
          placeholder="Customer email here..."
        />
      </div>
    </div>
  );
}
