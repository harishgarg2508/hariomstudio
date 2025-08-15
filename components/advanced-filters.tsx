"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Filter, CalendarIcon, X, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import type { FilterOptions, Tag } from "@/lib/types"

interface AdvancedFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  tags: Tag[]
  totalItems: number
  filteredCount: number
}

export function AdvancedFilters({ filters, onFiltersChange, tags, totalItems, filteredCount }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(filters.dateRange?.start)
  const [endDate, setEndDate] = useState<Date | undefined>(filters.dateRange?.end)

  const handleDateRangeApply = () => {
    onFiltersChange({
      ...filters,
      dateRange: startDate && endDate ? { start: startDate, end: endDate } : undefined,
    })
    setIsOpen(false)
  }

  const handleDateRangeClear = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    onFiltersChange({
      ...filters,
      dateRange: undefined,
    })
  }

  const handleResetAllFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    onFiltersChange({
      tags: [],
      mediaType: "all",
      sortBy: "latest",
      dateRange: undefined,
    })
  }

  const toggleTagFilter = (tagName: string) => {
    const newTags = filters.tags.includes(tagName)
      ? filters.tags.filter((t) => t !== tagName)
      : [...filters.tags, tagName]

    onFiltersChange({
      ...filters,
      tags: newTags,
    })
  }

  const hasActiveFilters = filters.tags.length > 0 || filters.mediaType !== "all" || filters.dateRange !== undefined

  return (
    <div className="space-y-4">
      {/* Filter Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredCount} of {totalItems} items
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetAllFilters}
              className="text-slate-500 hover:text-slate-700"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                  {filters.tags.length + (filters.mediaType !== "all" ? 1 : 0) + (filters.dateRange ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Media Type Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Media Type</Label>
                  <Select
                    value={filters.mediaType}
                    onValueChange={(value: any) => onFiltersChange({ ...filters, mediaType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Media</SelectItem>
                      <SelectItem value="image">Images Only</SelectItem>
                      <SelectItem value="video">Videos Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sort By</Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value: any) => onFiltersChange({ ...filters, sortBy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Date Range Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MMM dd") : "Start"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MMM dd") : "End"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleDateRangeApply}
                      disabled={!startDate || !endDate}
                      className="flex-1"
                    >
                      Apply Range
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDateRangeClear} disabled={!filters.dateRange}>
                      Clear
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Tag Filters */}
                {tags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Filter by Tags</Label>
                    <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                      {tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={filters.tags.includes(tag.name) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 text-xs"
                          onClick={() => toggleTagFilter(tag.name)}
                        >
                          {tag.name} ({tag.count})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.mediaType !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.mediaType}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => onFiltersChange({ ...filters, mediaType: "all" })}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}

          {filters.dateRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {format(filters.dateRange.start, "MMM dd")} - {format(filters.dateRange.end, "MMM dd")}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => onFiltersChange({ ...filters, dateRange: undefined })}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}

          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => toggleTagFilter(tag)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
