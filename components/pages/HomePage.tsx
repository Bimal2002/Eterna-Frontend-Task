"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setTokens, updateTokenPrice, setLoading } from "@/store/tokens";
import { getMockTokens } from "@/lib/data";
import { wsService } from "@/lib/realtime";
import TokenItem from "@/components/features/TokenItem";
import TokenItemLoading from "@/components/features/TokenItemLoading";
import Header from "@/components/features/Header";
import PageContainer from "@/components/features/PageContainer";
import ErrorHandler from "@/components/ErrorHandler";
import { Token } from "@/types/token";
import {
  ChevronDown,
  ArrowUpDown,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { tokens, isLoading, searchQuery } = useAppSelector((state) => state.tokens);

  const [newPairsSort, setNewPairsSort] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({ field: "age", direction: "desc" });
  const [finalStretchSort, setFinalStretchSort] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({ field: "marketCap", direction: "desc" });
  const [migratedSort, setMigratedSort] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({ field: "marketCap", direction: "desc" });

  useEffect(() => {
    dispatch(setLoading(true));

    setTimeout(() => {
      const tokenData = getMockTokens();
      dispatch(setTokens(tokenData));
      dispatch(setLoading(false));
      wsService.connect(tokenData);
    }, 800);

    return () => {
      wsService.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    const handlePriceUpdate = (
      tokenId: string,
      newPrice: number,
      percentChange: number
    ) => {
      dispatch(
        updateTokenPrice({ tokenId, price: newPrice, change: percentChange })
      );
    };

    wsService.subscribe(handlePriceUpdate);

    return () => {
      wsService.unsubscribe(handlePriceUpdate);
    };
  }, [dispatch]);

  const sortTokens = useCallback(
    (
      tokenList: Token[],
      sortConfig: { field: string; direction: "asc" | "desc" }
    ) => {
      return [...tokenList].sort((a, b) => {
        let aValue: number | string = 0;
        let bValue: number | string = 0;

        switch (sortConfig.field) {
          case "marketCap":
            aValue = a.marketCap;
            bValue = b.marketCap;
            break;
          case "price":
            aValue = a.price;
            bValue = b.price;
            break;
          case "priceChange24h":
            aValue = a.priceChange24h;
            bValue = b.priceChange24h;
            break;
          case "volume":
            aValue = a.volume;
            bValue = b.volume;
            break;
          case "age":
            aValue = a.age;
            bValue = b.age;
            break;
          case "holders":
            aValue = a.holders;
            bValue = b.holders;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    },
    []
  );

  const sortedNewPairs = useMemo(() => {
    let filtered = tokens.filter((t: Token) => t.category === "new");
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.id.toLowerCase().includes(query)
      );
    }
    
    return sortTokens(filtered, newPairsSort);
  }, [tokens, newPairsSort, sortTokens, searchQuery]);

  const sortedFinalStretch = useMemo(() => {
    let filtered = tokens.filter((t: Token) => t.category === "final");
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.id.toLowerCase().includes(query)
      );
    }
    
    return sortTokens(filtered, finalStretchSort);
  }, [tokens, finalStretchSort, sortTokens, searchQuery]);

  const sortedMigrated = useMemo(() => {
    let filtered = tokens.filter((t: Token) => t.category === "migrated");
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.id.toLowerCase().includes(query)
      );
    }
    
    return sortTokens(filtered, migratedSort);
  }, [tokens, migratedSort, sortTokens, searchQuery]);

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <Header />

      <PageContainer>
        <ErrorHandler>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 h-full">
            <div className="min-w-0 flex flex-col h-full overflow-hidden pl-0 lg:pl-4 xl:pl-6">
              <div className="flex items-center justify-between mb-5 px-2 shrink-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    New Pairs
                  </h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-zinc-900 transition-colors">
                      <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500" />
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          setNewPairsSort({
                            field: "age",
                            direction:
                              newPairsSort.field === "age" &&
                              newPairsSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <TrendingUp className="h-3 w-3 mr-2" /> Age
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setNewPairsSort({
                            field: "marketCap",
                            direction:
                              newPairsSort.field === "marketCap" &&
                              newPairsSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <BarChart3 className="h-3 w-3 mr-2" /> Market Cap
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setNewPairsSort({
                            field: "price",
                            direction:
                              newPairsSort.field === "price" &&
                              newPairsSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <DollarSign className="h-3 w-3 mr-2" /> Price
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setNewPairsSort({
                            field: "priceChange24h",
                            direction:
                              newPairsSort.field === "priceChange24h" &&
                              newPairsSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <TrendingUp className="h-3 w-3 mr-2" /> 24h Change
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-xs md:text-sm text-zinc-500">
                  {sortedNewPairs.length} tokens
                </span>
              </div>
              <div className="flex-1 px-4 md:px-5 lg:px-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent min-h-0">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <TokenItemLoading key={i} />
                    ))
                  : sortedNewPairs.map((token) => (
                      <TokenItem key={token.id} token={token} />
                    ))}
              </div>
            </div>

            <div className="min-w-0 flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between mb-5 px-2 shrink-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    Final Stretch
                  </h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-zinc-900 transition-colors">
                      <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500" />
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          setFinalStretchSort({
                            field: "marketCap",
                            direction:
                              finalStretchSort.field === "marketCap" &&
                              finalStretchSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <BarChart3 className="h-3 w-3 mr-2" /> Market Cap
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setFinalStretchSort({
                            field: "volume",
                            direction:
                              finalStretchSort.field === "volume" &&
                              finalStretchSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <BarChart3 className="h-3 w-3 mr-2" /> Volume
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setFinalStretchSort({
                            field: "priceChange24h",
                            direction:
                              finalStretchSort.field === "priceChange24h" &&
                              finalStretchSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <TrendingUp className="h-3 w-3 mr-2" /> 24h Change
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setFinalStretchSort({
                            field: "holders",
                            direction:
                              finalStretchSort.field === "holders" &&
                              finalStretchSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <TrendingUp className="h-3 w-3 mr-2" /> Holders
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-xs md:text-sm text-zinc-500">
                  {sortedFinalStretch.length} tokens
                </span>
              </div>
              <div className="flex-1 px-4 md:px-5 lg:px-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent min-h-0">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <TokenItemLoading key={i} />
                    ))
                  : sortedFinalStretch.map((token) => (
                      <TokenItem key={token.id} token={token} />
                    ))}
              </div>
            </div>

            <div className="min-w-0 flex flex-col h-full overflow-hidden pr-0 lg:pr-4 xl:pr-6">
              <div className="flex items-center justify-between mb-5 px-2 shrink-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    Migrated
                  </h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-zinc-900 transition-colors">
                      <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500" />
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          setMigratedSort({
                            field: "marketCap",
                            direction:
                              migratedSort.field === "marketCap" &&
                              migratedSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <BarChart3 className="h-3 w-3 mr-2" /> Market Cap
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setMigratedSort({
                            field: "volume",
                            direction:
                              migratedSort.field === "volume" &&
                              migratedSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <BarChart3 className="h-3 w-3 mr-2" /> Volume
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setMigratedSort({
                            field: "priceChange24h",
                            direction:
                              migratedSort.field === "priceChange24h" &&
                              migratedSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <TrendingUp className="h-3 w-3 mr-2" /> 24h Change
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setMigratedSort({
                            field: "price",
                            direction:
                              migratedSort.field === "price" &&
                              migratedSort.direction === "desc"
                                ? "asc"
                                : "desc",
                          })
                        }
                      >
                        <DollarSign className="h-3 w-3 mr-2" /> Price
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-xs md:text-sm text-zinc-500">
                  {sortedMigrated.length} tokens
                </span>
              </div>
              <div className="flex-1 px-4 md:px-5 lg:px-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent min-h-0">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <TokenItemLoading key={i} />
                    ))
                  : sortedMigrated.map((token) => (
                      <TokenItem key={token.id} token={token} />
                    ))}
              </div>
            </div>
          </div>
        </ErrorHandler>
      </PageContainer>
    </div>
  );
}
