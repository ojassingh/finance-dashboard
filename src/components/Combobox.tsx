"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useState } from "react";

import { Chart as Chart2 } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const FormSchema = z.object({
  symbol: z.string({
    required_error: "Please select a symbol.",
  }),
});

export function ComboboxForm() {
  Chart.register(...registerables);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [tickers, setTickers] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [chartData, setChartData] = useState(null);

  function handleInputChange(event: any) {
    const input = event;
    setSearchTerm(input);
    fetchSuggestions(input);
    // console.log(input)
  }

  async function fetchSuggestions(input: string) {
    const tickers = await fetch(`/api/suggestions?input=${input}`);
    const data = await tickers.json();
    setTickers(data.results);
    // console.log(data.results);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const response = await fetch(`/api/stock?symbol=${symbol}&interval=daily`);
    const data2 = await response.json();
    const chartData = data2.data;
    setChartData(chartData);
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };


  return (
    <div>
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
                        {field.value || "Select Symbol"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        onValueChange={(event) => {
                          handleInputChange(event);
                        }}
                        placeholder="Search framework..."
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {tickers.map((ticker: any) => (
                          <CommandItem
                            value={ticker.smybol}
                            key={ticker.symbol}
                            onSelect={() => {
                              form.setValue("symbol", ticker.symbol);
                              setSymbol(ticker.symbol);
                              // console.log(ticker.symbol);
                            }}
                          >
                            {ticker.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
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

      {chartData ? (
        <div className="">
          <Chart2
            className="h-80"
            type="line"
            options={options}
            data={chartData}
          />
        </div>
      ) : (
        <p>Enter a valid stock symbol and click Submit to view the chart.</p>
      )}
    </div>
  );
}
