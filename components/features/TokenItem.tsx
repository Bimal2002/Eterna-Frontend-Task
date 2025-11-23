"use client";

import React, { memo } from "react";
import Image from "next/image";
import { Token } from "@/types/token";
import { formatNumber, formatPercent, formatTime, cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import {
  Users,
  MessageCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

interface TokenItemProps {
  token: Token;
  onClick?: () => void;
}

const TokenItem = memo(({ token, onClick }: TokenItemProps) => {
  const isPriceUp = token.priceChange24h >= 0;
  const priceColor = isPriceUp ? "text-green-500" : "text-red-500";
  const bgColor = isPriceUp ? "bg-green-500/10" : "bg-red-500/10";

  const [imagePopoverOpen, setImagePopoverOpen] = React.useState(false);
  const [usersPopoverOpen, setUsersPopoverOpen] = React.useState(false);
  const [activityPopoverOpen, setActivityPopoverOpen] = React.useState(false);
  const [messagePopoverOpen, setMessagePopoverOpen] = React.useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative flex items-center gap-3 rounded-xl border border-zinc-900 bg-zinc-950/50 px-4 py-3 mb-3 backdrop-blur-sm transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/50 hover:shadow-xl cursor-pointer"
    >
      <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
        <PopoverTrigger asChild>
          <div
            className="shrink-0 relative cursor-pointer group/image"
            onMouseEnter={() => setImagePopoverOpen(true)}
            onMouseLeave={() => setImagePopoverOpen(false)}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 overflow-visible transition-all duration-300 hover:scale-110 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20">
              <Image
                src={token.image}
                alt={token.name}
                width={64}
                height={64}
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
            {/* Age indicator */}
            <div className="absolute -top-1.5 -right-1.5 bg-zinc-900 rounded-full px-2 py-0.5 text-[10px] font-semibold text-zinc-400 border border-zinc-800">
              {formatTime(token.age)}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[480px] p-0 border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
          side="right"
          align="start"
          sideOffset={10}
          onMouseEnter={() => setImagePopoverOpen(true)}
          onMouseLeave={() => setImagePopoverOpen(false)}
        >
          <div className="p-5 space-y-4">
            {/* Token Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-zinc-800/50">
              <Image
                src={token.image}
                alt={token.name}
                width={80}
                height={80}
                className="object-cover rounded-xl border-2 border-zinc-800"
                unoptimized
              />
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-white mb-1">
                  {token.name}
                </h3>
                <p className="text-sm text-zinc-500 mb-3">{token.symbol}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                    {token.category.toUpperCase()}
                  </span>
                  <span className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                    {formatTime(token.age)} old
                  </span>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-2 font-medium">
                  Current Price
                </p>
                <p className="text-2xl font-bold text-white">
                  ${token.price.toFixed(4)}
                </p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-2 font-medium">
                  24h Change
                </p>
                <p className={cn("text-2xl font-bold", priceColor)}>
                  {formatPercent(token.priceChange24h)}
                </p>
              </div>
            </div>

            {/* Market Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <BarChart3 className="h-3 w-3" />
                  Market Cap
                </p>
                <p className="text-base font-bold text-white">
                  {formatNumber(token.marketCap)}
                </p>
              </div>
              <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <Activity className="h-3 w-3" />
                  Volume 24h
                </p>
                <p className="text-base font-bold text-white">
                  {formatNumber(token.volume)}
                </p>
              </div>
              <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <Users className="h-3 w-3" />
                  Holders
                </p>
                <p className="text-base font-bold text-white">
                  {token.holders.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                  <Activity className="h-3 w-3" />
                  Transactions
                </p>
                <p className="text-base font-bold text-white">
                  {token.txCount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/30">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Recent Activity
              </h4>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">
                    Last Price Update
                  </span>
                  <span className="text-xs text-white font-medium">
                    {formatTime(token.age)} ago
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">
                    New Holders (24h)
                  </span>
                  <span className="text-xs text-green-400 font-medium">
                    +{Math.floor(token.holders * 0.15)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Trading Volume</span>
                  <span className="text-xs text-blue-400 font-medium">
                    {formatNumber(token.volume)}
                  </span>
                </div>
              </div>
            </div>

            {/* Community & Additional Info */}
            {(token.creator ||
              token.bumps !== undefined ||
              token.replies > 0) && (
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-400" />
                  Community
                </h4>
                <div className="space-y-2 text-sm">
                  {token.replies > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Replies</span>
                      <span className="text-white font-medium">
                        {token.replies}
                      </span>
                    </div>
                  )}
                  {token.creator && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Creator Holding</span>
                      <span className="text-blue-400 font-medium">
                        {token.creator}
                      </span>
                    </div>
                  )}
                  {token.bumps !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Total Bumps</span>
                      <span className="text-amber-400 font-medium">
                        {token.bumps}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Token Info - Compact Horizontal Layout */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="font-semibold text-zinc-50 text-sm truncate max-w-[100px]">
                  {token.name}
                </h3>
              </TooltipTrigger>
              <TooltipContent>{token.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xs text-zinc-500 truncate">{token.symbol}</span>
        </div>

        {/* Stats Row - Horizontal with Hover Popovers */}
        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <Popover open={usersPopoverOpen} onOpenChange={setUsersPopoverOpen}>
            <PopoverTrigger asChild>
              <div
                className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
                onMouseEnter={() => setUsersPopoverOpen(true)}
                onMouseLeave={() => setUsersPopoverOpen(false)}
              >
                <Users className="h-3 w-3" />
                <span>{token.holders}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[480px] p-0 border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
              side="top"
              align="start"
              sideOffset={10}
              onMouseEnter={() => setUsersPopoverOpen(true)}
              onMouseLeave={() => setUsersPopoverOpen(false)}
            >
              <div className="p-5 space-y-4">
                {/* Same content as image popover */}
                <div className="flex items-start gap-4 pb-4 border-b border-zinc-800/50">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-xl border-2 border-zinc-800"
                    unoptimized
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-white mb-1">
                      {token.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3">{token.symbol}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                        {token.category.toUpperCase()}
                      </span>
                      <span className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                        {formatTime(token.age)} old
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">
                      Current Price
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ${token.price.toFixed(4)}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">
                      24h Change
                    </p>
                    <p className={cn("text-2xl font-bold", priceColor)}>
                      {formatPercent(token.priceChange24h)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3" />
                      Market Cap
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatNumber(token.marketCap)}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Activity className="h-3 w-3" />
                      Volume 24h
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatNumber(token.volume)}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Users className="h-3 w-3" />
                      Holders
                    </p>
                    <p className="text-base font-bold text-white">
                      {token.holders.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Activity className="h-3 w-3" />
                      Transactions
                    </p>
                    <p className="text-base font-bold text-white">
                      {token.txCount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/30">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Recent Activity
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        Last Price Update
                      </span>
                      <span className="text-xs text-white font-medium">
                        {formatTime(token.age)} ago
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        New Holders (24h)
                      </span>
                      <span className="text-xs text-green-400 font-medium">
                        +{Math.floor(token.holders * 0.15)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        Trading Volume
                      </span>
                      <span className="text-xs text-blue-400 font-medium">
                        {formatNumber(token.volume)}
                      </span>
                    </div>
                  </div>
                </div>

                {(token.creator ||
                  token.bumps !== undefined ||
                  token.replies > 0) && (
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      Community
                    </h4>
                    <div className="space-y-2 text-sm">
                      {token.replies > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Replies</span>
                          <span className="text-white font-medium">
                            {token.replies}
                          </span>
                        </div>
                      )}
                      {token.creator && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Creator Holding</span>
                          <span className="text-blue-400 font-medium">
                            {token.creator}
                          </span>
                        </div>
                      )}
                      {token.bumps !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Total Bumps</span>
                          <span className="text-amber-400 font-medium">
                            {token.bumps}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <span className="text-zinc-700">•</span>

          <Popover
            open={activityPopoverOpen}
            onOpenChange={setActivityPopoverOpen}
          >
            <PopoverTrigger asChild>
              <div
                className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
                onMouseEnter={() => setActivityPopoverOpen(true)}
                onMouseLeave={() => setActivityPopoverOpen(false)}
              >
                <Activity className="h-3 w-3" />
                <span>{token.txCount}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[480px] p-0 border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
              side="top"
              align="start"
              sideOffset={10}
              onMouseEnter={() => setActivityPopoverOpen(true)}
              onMouseLeave={() => setActivityPopoverOpen(false)}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-zinc-800/50">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-xl border-2 border-zinc-800"
                    unoptimized
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-white mb-1">
                      {token.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3">{token.symbol}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                        {token.category.toUpperCase()}
                      </span>
                      <span className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                        {formatTime(token.age)} old
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">
                      Current Price
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ${token.price.toFixed(4)}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">
                      24h Change
                    </p>
                    <p className={cn("text-2xl font-bold", priceColor)}>
                      {formatPercent(token.priceChange24h)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3" />
                      Market Cap
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatNumber(token.marketCap)}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Activity className="h-3 w-3" />
                      Volume 24h
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatNumber(token.volume)}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Users className="h-3 w-3" />
                      Holders
                    </p>
                    <p className="text-base font-bold text-white">
                      {token.holders.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Activity className="h-3 w-3" />
                      Transactions
                    </p>
                    <p className="text-base font-bold text-white">
                      {token.txCount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/30">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Recent Activity
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        Last Price Update
                      </span>
                      <span className="text-xs text-white font-medium">
                        {formatTime(token.age)} ago
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        New Holders (24h)
                      </span>
                      <span className="text-xs text-green-400 font-medium">
                        +{Math.floor(token.holders * 0.15)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        Trading Volume
                      </span>
                      <span className="text-xs text-blue-400 font-medium">
                        {formatNumber(token.volume)}
                      </span>
                    </div>
                  </div>
                </div>

                {(token.creator ||
                  token.bumps !== undefined ||
                  token.replies > 0) && (
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      Community
                    </h4>
                    <div className="space-y-2 text-sm">
                      {token.replies > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Replies</span>
                          <span className="text-white font-medium">
                            {token.replies}
                          </span>
                        </div>
                      )}
                      {token.creator && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Creator Holding</span>
                          <span className="text-blue-400 font-medium">
                            {token.creator}
                          </span>
                        </div>
                      )}
                      {token.bumps !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Total Bumps</span>
                          <span className="text-amber-400 font-medium">
                            {token.bumps}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <span className="text-zinc-700">•</span>

          <Popover
            open={messagePopoverOpen}
            onOpenChange={setMessagePopoverOpen}
          >
            <PopoverTrigger asChild>
              <div
                className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
                onMouseEnter={() => setMessagePopoverOpen(true)}
                onMouseLeave={() => setMessagePopoverOpen(false)}
              >
                <MessageCircle className="h-3 w-3" />
                <span>{token.replies}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[480px] p-0 border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
              side="top"
              align="start"
              sideOffset={10}
              onMouseEnter={() => setMessagePopoverOpen(true)}
              onMouseLeave={() => setMessagePopoverOpen(false)}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-zinc-800/50">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-xl border-2 border-zinc-800"
                    unoptimized
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-white mb-1">
                      {token.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3">{token.symbol}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                        {token.category.toUpperCase()}
                      </span>
                      <span className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                        {formatTime(token.age)} old
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">
                      Current Price
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ${token.price.toFixed(4)}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">
                      24h Change
                    </p>
                    <p className={cn("text-2xl font-bold", priceColor)}>
                      {formatPercent(token.priceChange24h)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3" />
                      Market Cap
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatNumber(token.marketCap)}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Activity className="h-3 w-3" />
                      Volume 24h
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatNumber(token.volume)}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Users className="h-3 w-3" />
                      Holders
                    </p>
                    <p className="text-base font-bold text-white">
                      {token.holders.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                    <p className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                      <Activity className="h-3 w-3" />
                      Transactions
                    </p>
                    <p className="text-base font-bold text-white">
                      {token.txCount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/30">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Recent Activity
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        Last Price Update
                      </span>
                      <span className="text-xs text-white font-medium">
                        {formatTime(token.age)} ago
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        New Holders (24h)
                      </span>
                      <span className="text-xs text-green-400 font-medium">
                        +{Math.floor(token.holders * 0.15)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400">
                        Trading Volume
                      </span>
                      <span className="text-xs text-blue-400 font-medium">
                        {formatNumber(token.volume)}
                      </span>
                    </div>
                  </div>
                </div>

                {(token.creator ||
                  token.bumps !== undefined ||
                  token.replies > 0) && (
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      Community
                    </h4>
                    <div className="space-y-2 text-sm">
                      {token.replies > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Replies</span>
                          <span className="text-white font-medium">
                            {token.replies}
                          </span>
                        </div>
                      )}
                      {token.creator && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Creator Holding</span>
                          <span className="text-blue-400 font-medium">
                            {token.creator}
                          </span>
                        </div>
                      )}
                      {token.bumps !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Total Bumps</span>
                          <span className="text-amber-400 font-medium">
                            {token.bumps}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Right Side - Pricing Info */}
      <div className="flex flex-col items-end gap-1">
        {/* Market Cap */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer hover:text-blue-400 transition-colors">
              <div className="text-[10px] text-zinc-500 mb-0.5">MC</div>
              <div className="font-semibold text-zinc-100 text-sm">
                {formatNumber(token.marketCap)}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Market Details</h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Market Cap:</span>
                  <span className="text-zinc-100">
                    {formatNumber(token.marketCap)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Volume:</span>
                  <span className="text-zinc-100">
                    {formatNumber(token.volume)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Price:</span>
                  <span className="text-zinc-100">
                    ${token.price.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Volume */}
        <div className="text-right">
          <div className="text-zinc-400 text-xs">
            {formatNumber(token.volume)}
          </div>
        </div>
      </div>

      {/* Price Change Badge */}
      <div
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-all duration-300",
          bgColor,
          priceColor
        )}
      >
        {isPriceUp ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span>{formatPercent(token.priceChange24h)}</span>
      </div>

      {/* Category-specific indicator */}
      {token.category === "new" && token.creator && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-2 bg-blue-500/20 border border-blue-500/40 rounded px-1.5 py-0.5 text-[9px] font-medium text-blue-400">
                {token.creator}
              </div>
            </TooltipTrigger>
            <TooltipContent>Creator holding</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {token.category === "final" && token.bumps !== undefined && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-2 bg-amber-500/20 border border-amber-500/40 rounded px-1.5 py-0.5 text-[9px] font-medium text-amber-400">
                {token.bumps} bumps
              </div>
            </TooltipTrigger>
            <TooltipContent>Total bumps</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});

TokenItem.displayName = "TokenItem";

export default TokenItem;
