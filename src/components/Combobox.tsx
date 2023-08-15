"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ToastAction } from "@radix-ui/react-toast";

import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import fetchTickers from "@/functions/fetchTickers";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const FormSchema = z.object({
  symbol: z.string({
    required_error: "Please select a symbol.",
  }),
});

export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [tickers, setTickers] = useState([]);


  function handleInputChange(event: any){
    const input = event;
    setSearchTerm(input)
    fetchSuggestions(input)
    // console.log(input)
  };

  async function fetchSuggestions(input: string){
    const tickers = await fetch(`/api/suggestions?input=${input}`);
    const data = await tickers.json();
    console.log(data)
  }

  // useEffect(()=>{
  //   fetchSuggestions('msft')
  // }), []



  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl id=":R7kracq:-form-item-description">
                    <Button
                      id=":R7kracq:-form-item"
                      aria-describedby=":R7kracq:-form-item-description"
                      aria-controls="radix-:R2nkracq:"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {/* {field.value
                        ? tickers.find(
                            (symbol: any) => symbol.symbol === field.value
                          )?.name
                        : "Select Symbol"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}

                      Hi there
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput onValueChange={(event)=>{
                      handleInputChange(event)
                    }} placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    {/* <CommandGroup>
                      {tickers.map((ticker: any) => (
                        <CommandItem
                          value={ticker.smybol}
                          key={ticker.symbol}
                          onSelect={() => {
                            form.setValue("symbol", ticker.symbol);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              ticker.symbol === field.symbol
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {ticker.name}
                        </CommandItem>
                      ))}
                    </CommandGroup> */}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription id=":R7kracq:-form-item-description">
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
