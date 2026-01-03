"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card" // Kept for layout if needed, though we can use divs
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog"
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
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters)
  
  // Sync local filters with actual filters when dialog opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters)
    }
  }, [isOpen, filters])

  const handleApply = () => {
    onFiltersChange(localFilters)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const handleResetLocal = () => {
    setLocalFilters({
      tags: [],
      mediaType: "all",
      sortBy: "latest",
      dateRange: undefined,
    })
  }
  
  // Global reset (outside dialog)
  const handleResetAllFilters = () => {
    onFiltersChange({
      tags: [],
      mediaType: "all",
      sortBy: "latest",
      dateRange: undefined,
    })
  }

  const toggleLocalTagFilter = (tagName: string) => {
    const newTags = localFilters.tags.includes(tagName)
      ? localFilters.tags.filter((t) => t !== tagName)
      : [...localFilters.tags, tagName]
    
    setLocalFilters({
      ...localFilters,
      tags: newTags
    })
  }

  // Helper for date range in local state
  const setLocalStartDate = (date: Date | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange: date ? { start: date, end: prev.dateRange?.end || date } : undefined 
    })) // Simplified logic: if start is set, ensure range exists. 
        // Actually, let's keep it flexible. If users pick start, we need a way to support just start? 
        // The original logic required both. Let's stick to that pattern or just updating the object.
        
        // Correct logic based on original Date Range handling:
        const currentEnd = localFilters.dateRange?.end
        if (!date) {
             // Clearing start usually means clearing range or invalid state. 
             // Let's just update the start property of the range object if it exists, or create new.
             if (localFilters.dateRange) {
                 setLocalFilters({...localFilters, dateRange: { ...localFilters.dateRange, start: date as any }}) 
             }
             return
        }
        
        setLocalFilters({
            ...localFilters,
            dateRange: { start: date, end: currentEnd || date }
        })
  }

  const setLocalEndDate = (date: Date | undefined) => {
      const currentStart = localFilters.dateRange?.start
      if (!date || !currentStart) return // Need start to have end usually
      
      setLocalFilters({
          ...localFilters,
          dateRange: { start: currentStart, end: date }
      })
  }
  
  // Simplified Date Setters for the calendar
  const onSelectStartDate = (date: Date | undefined) => {
       const newRange = { 
           start: date || new Date(), 
           end: localFilters.dateRange?.end || date || new Date() 
       }
       if (!date) {
           setLocalFilters({ ...localFilters, dateRange: undefined })
       } else {
           setLocalFilters({ ...localFilters, dateRange: newRange })
       }
  }

  const onSelectEndDate = (date: Date | undefined) => {
      if (!localFilters.dateRange?.start) return; // Should pick start first
      if (!date) return;
      setLocalFilters({
          ...localFilters,
          dateRange: { ...localFilters.dateRange, end: date }
      })
  }

  const hasActiveFilters = filters.tags.length > 0 || filters.mediaType !== "all" || filters.dateRange !== undefined

  return (
    <div className="space-y-4">
      {/* Filter Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Showing {filteredCount} of {totalItems} items
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetAllFilters}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900 dark:border-gray-800 dark:text-gray-50">
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                    {filters.tags.length + (filters.mediaType !== "all" ? 1 : 0) + (filters.dateRange ? 1 : 0)}
                  </Badge>
                )}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50">
            <DialogHeader>
              <DialogTitle>Advanced Filters</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Media Type Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Media Type</Label>
                <Select
                  value={localFilters.mediaType}
                  onValueChange={(value: any) => setLocalFilters({ ...localFilters, mediaType: value })}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border-slate-200 dark:border-slate-800">
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
                  value={localFilters.sortBy}
                  onValueChange={(value: any) => setLocalFilters({ ...localFilters, sortBy: value })}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border-slate-200 dark:border-slate-800">
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                            <span className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {localFilters.dateRange?.start ? format(localFilters.dateRange.start, "MMM dd, yyyy") : "Pick date"}
                            </span>
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border-slate-200 dark:border-slate-800" align="start">
                        <Calendar 
                            mode="single" 
                            selected={localFilters.dateRange?.start} 
                            onSelect={onSelectStartDate} 
                            initialFocus
                            className="bg-white dark:bg-slate-950 rounded-md" 
                        />
                        </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">End Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                            disabled={!localFilters.dateRange?.start}
                        >
                            <span className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {localFilters.dateRange?.end ? format(localFilters.dateRange.end, "MMM dd, yyyy") : "Pick date"}
                            </span>
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border-slate-200 dark:border-slate-800" align="start">
                        <Calendar 
                            mode="single" 
                            selected={localFilters.dateRange?.end} 
                            onSelect={onSelectEndDate} 
                            initialFocus 
                            disabled={(date) => date < (localFilters.dateRange?.start || new Date())}
                            className="bg-white dark:bg-slate-950 rounded-md"
                        />
                        </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              {/* Tag Filters */}
              {tags.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Filter by Tags</Label>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto border rounded-md p-2 bg-slate-50 dark:bg-slate-900/50">
                    {tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant={localFilters.tags.includes(tag.name) ? "default" : "outline"}
                        className={`cursor-pointer text-xs transition-colors duration-200
                          ${localFilters.tags.includes(tag.name)
                            ? 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
                            : 'bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'}`}
                        onClick={() => toggleLocalTagFilter(tag.name)}
                      >
                        {tag.name} ({tag.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex gap-2 sm:gap-0">
               <Button variant="outline" onClick={handleResetLocal} className="mr-auto">
                 Reset All
               </Button>
               <Button variant="ghost" onClick={handleCancel}>
                 Cancel
               </Button>
               <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700 text-white">
                 Apply Filters
               </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.mediaType !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              Type: {filters.mediaType}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent text-gray-600 dark:text-gray-400"
                onClick={() => onFiltersChange({ ...filters, mediaType: "all" })}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}

          {filters.dateRange && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              {format(filters.dateRange.start, "MMM dd")} - {format(filters.dateRange.end, "MMM dd")}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent text-gray-600 dark:text-gray-400"
                onClick={() => onFiltersChange({ ...filters, dateRange: undefined })}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}

          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent text-gray-600 dark:text-gray-400"
                onClick={() => {
                     const newTags = filters.tags.filter(t => t !== tag)
                     onFiltersChange({ ...filters, tags: newTags })
                }}
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