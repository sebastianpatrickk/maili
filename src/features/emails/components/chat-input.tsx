"use client";

import * as React from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "@tanstack/react-form";
import { emailInsertFormSchema } from "../schemas";

const inboxes = [
  { value: 1, lable: "mydva@dotekypohybu.cz" },
  { value: 2, lable: "martin@dotekypohybu.cz" },
  { value: 3, lable: "svatuska@dotekypohybu.cz" },
];

export function ChatInput() {
  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      inboxId: "1",
    },
    validators: {
      onChange: emailInsertFormSchema,
      onMount: emailInsertFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="relative rounded-lg border p-3">
        <div className="flex flex-grow flex-row items-start">
          <form.Field
            name="message"
            children={(field) => (
              <Textarea
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                variant="autoGrow"
                placeholder="Paste your email here..."
                className="max-h-60 rounded-none"
              />
            )}
          />

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.errors,
            ]}
            children={([canSubmit, isSubmitting, errors]) => {
              const errorMessages =
                Array.isArray(errors) && errors.length > 0 && errors[0]
                  ? Object.entries(
                      errors[0] as Record<string, Array<{ message: string }>>
                    )
                      .map(([field, fieldErrors]) => fieldErrors[0].message)
                      .filter(Boolean)
                  : [];

              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
                          type="submit"
                          size="icon"
                          className="rounded-md"
                          disabled={!canSubmit}
                        >
                          {!isSubmitting ? (
                            <>
                              <ArrowUp className="h-5 w-5" />
                              <span className="sr-only">Send message</span>
                            </>
                          ) : (
                            <Loader2 className="animate-spin" />
                          )}
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {errorMessages.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {errorMessages.map(
                            (message: string, index: number) => (
                              <li key={index}>{message}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>
                          {isSubmitting ? "Submitting form" : "Submit form"}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }}
          />
        </div>
        <div className="flex items-center -ml-2 -mb-2">
          <form.Field
            name="inboxId"
            children={(field) => (
              <Select
                onValueChange={field.handleChange}
                defaultValue={field.state.value}
              >
                <SelectTrigger className="border-none shadow-none !bg-transparent">
                  <SelectValue placeholder="Select a inbox" />
                </SelectTrigger>
                <SelectContent>
                  {inboxes.map((item) => (
                    <SelectItem key={item.value} value={String(item.value)}>
                      {item.lable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <form.Field
            name="email"
            children={(field) => (
              <Input
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="ml-1 border-none shadow-none focus-visible:ring-0 !bg-transparent"
                placeholder="Customer email here..."
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
