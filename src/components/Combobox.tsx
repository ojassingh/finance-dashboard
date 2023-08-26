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
import { useEffect, useState } from "react";
import { Chart as Chart2 } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ModeToggle } from "./Toggle";
import axios from "axios";
const FormSchema = z.object({
  symbol: z.string({
    required_error: "Please select a symbol.",
  }),
});

import { CircleDashed } from "lucide-react";

export function ComboboxForm() {
  Chart.register(...registerables);

  const [allData, setAllData] = useState(null);

  async function getData() {
    const data = await fetch("/api/tickers");
    const stockTicers = await data.json();
    setAllData(stockTicers.response);
  }

  useEffect(() => {
    getData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [tickers, setTickers] = useState<any>([]);
  const [symbol, setSymbol] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleInputChange(event: any) {
    setLoading(true)
    const input = event;
    fetchSuggestions(input);
    setLoading(false);
  }

  async function fetchSuggestions(input: string) {


    const tickers: any = await axios
      .post(`/api/suggestions?input=${input}`, {
        body: allData,
      })
      .catch(function (error) {
        console.log(error);
      });

    const data = await tickers.data.results;
    console.log(data)
    setTickers(data);
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
        text: "Daily data",
      },
      title: {
        display: true,
        text: "Daily Chart",
      },
    },
  };

  return (
    <div className={`grid place-content-center min-h-screen`}>
      <div className="fixed top-0 right-0 p-4 ">
        <ModeToggle />
      </div>
      <div className="">
        {allData ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
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
                              placeholder="Search ticker or name..."
                            />
                            <CommandEmpty>{loading ? " Loading...:":  "Not found "}</CommandEmpty>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="outline" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        ) : (<div className="flex gap-4"><CircleDashed className="animate-spin-slow" />Loading...</div>)}
      </div>

      {chartData && (
        <div className="">
          <Chart2
            className="h-80"
            type="line"
            options={options}
            data={chartData}
          />
        </div>
      )}
    </div>
  );
}
