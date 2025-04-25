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
import { emailInsertFormSchema } from "@/lib/validations/email";
import { useGetInboxSelectOptions } from "@/lib/queries/inbox";
import { useCreateEmail } from "@/lib/queries/email";

export function ChatInput() {
  const { mutateAsync } = useCreateEmail();
  const {
    data: inboxes = [],
    isLoading: isInboxesLoading,
    isError: isInboxesError,
  } = useGetInboxSelectOptions();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      inboxId: "",
    },
    validators: {
      onChange: emailInsertFormSchema,
      onMount: emailInsertFormSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(
        {
          json: value,
        },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
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
          <form.Field name="message">
            {(field) => (
              <Textarea
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                variant="autoGrow"
                placeholder="Paste your email here..."
                className="max-h-60 rounded-none"
              />
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.errors,
            ]}
          >
            {([canSubmit, isSubmitting, errors]) => {
              const errorMessages =
                Array.isArray(errors) && errors.length > 0 && errors[0]
                  ? Object.entries(
                      errors[0] as Record<string, Array<{ message: string }>>
                    )

                      .map(([, fieldErrors]) => fieldErrors[0].message)
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
                          disabled={!canSubmit || !isMounted}
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
                          {errorMessages.map((message, index) => (
                            <li key={index}>{message}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>
                          {!isMounted
                            ? "Form is initializing..."
                            : isSubmitting
                            ? "Submitting form"
                            : "Submit form"}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }}
          </form.Subscribe>
        </div>
        <div className="flex items-center -ml-2 -mb-2">
          <form.Field name="inboxId">
            {(field) => (
              <Select
                onValueChange={field.handleChange}
                value={field.state.value}
              >
                <SelectTrigger className="border-none shadow-none !bg-transparent">
                  <SelectValue placeholder="Select a inbox" />
                </SelectTrigger>
                <SelectContent>
                  {isInboxesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading inboxes...
                    </SelectItem>
                  ) : isInboxesError ? (
                    <SelectItem value="error" disabled>
                      Failed to load inboxes
                    </SelectItem>
                  ) : inboxes.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No inboxes available
                    </SelectItem>
                  ) : (
                    inboxes.map((item) => (
                      <SelectItem key={item.value} value={String(item.value)}>
                        {item.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <Input
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="ml-1 border-none shadow-none focus-visible:ring-0 !bg-transparent"
                placeholder="Customer email here..."
              />
            )}
          </form.Field>
        </div>
      </div>
    </form>
  );
}
