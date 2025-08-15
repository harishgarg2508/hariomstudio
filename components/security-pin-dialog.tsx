"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Eye, EyeOff, Shield, AlertTriangle, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface SecurityPinDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function SecurityPinDialog({ open, onOpenChange, onSuccess }: SecurityPinDialogProps) {
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { authenticate, attemptCount, isBlocked, blockTimeRemaining } = useAuth()

  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      setError(`Too many failed attempts. Please wait ${formatTimeRemaining(blockTimeRemaining)} before trying again.`)
      return
    }

    if (!pin.trim()) {
      setError("Please enter the security pin")
      return
    }

    setIsLoading(true)
    setError("")

    // Add a delay to prevent brute force attempts
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isValid = authenticate(pin)

    if (isValid) {
      setPin("")
      onOpenChange(false)
      onSuccess()
    } else {
      if (isBlocked) {
        setError(`Too many failed attempts. Access blocked for ${formatTimeRemaining(blockTimeRemaining)}.`)
      } else {
        const remainingAttempts = 3 - attemptCount
        setError(`Invalid security pin. ${remainingAttempts} attempt${remainingAttempts !== 1 ? "s" : ""} remaining.`)
      }
      setPin("")
    }

    setIsLoading(false)
  }

  const handleClose = () => {
    if (!isLoading) {
      setPin("")
      setError("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-2 border-blue-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-slate-800 text-xl font-bold">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            Security Authentication
          </DialogTitle>
          <DialogDescription className="text-slate-700 leading-relaxed bg-white/70 p-3 rounded-lg border border-blue-100">
            Enter the security pin to access upload functionality. This ensures only authorized users can add content to
            the gallery.
          </DialogDescription>
        </DialogHeader>

        {isBlocked ? (
          <div className="space-y-4">
            <Alert className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 shadow-lg">
              <div className="p-1 bg-gradient-to-br from-red-500 to-orange-500 rounded-full">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <AlertDescription className="text-red-800 font-medium">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-red-500/20 rounded">
                    <Clock className="w-4 h-4 text-red-600" />
                  </div>
                  <span>Access temporarily blocked due to multiple failed attempts.</span>
                </div>
                <div className="mt-3 font-mono text-lg bg-red-100 p-2 rounded-lg text-red-900 border border-red-200">
                  Time remaining: {formatTimeRemaining(blockTimeRemaining)}
                </div>
              </AlertDescription>
            </Alert>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <Input
                type={showPin ? "text" : "password"}
                placeholder="Enter security pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e)
                  }
                }}
                className="pr-12 py-3 text-lg bg-white/90 border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-slate-800 placeholder:text-slate-500 shadow-lg"
                disabled={isLoading}
                autoFocus
                maxLength={20}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-10 px-3 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                onClick={() => setShowPin(!showPin)}
                disabled={isLoading}
              >
                {showPin ? 
                  <EyeOff className="h-5 w-5 text-slate-600" /> : 
                  <Eye className="h-5 w-5 text-slate-600" />
                }
              </Button>
            </div>

            {error && (
              <Alert className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 shadow-lg">
                <AlertDescription className="text-red-800 font-medium flex items-center gap-2">
                  <div className="p-1 bg-red-500/20 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {attemptCount > 0 && !isBlocked && (
              <Alert className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-lg">
                <div className="p-1 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <AlertDescription className="text-amber-800 font-medium">
                  {attemptCount} failed attempt{attemptCount !== 1 ? "s" : ""}.{" "}
                  <span className="font-bold text-amber-900">
                    {3 - attemptCount} remaining
                  </span> before temporary lockout.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
                disabled={isLoading}
                className="bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !pin.trim()} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Authenticate"
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="text-sm text-slate-700 mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <strong className="text-blue-900">Security Notice:</strong>
              <p className="mt-1 text-slate-600">
                Multiple failed attempts will result in temporary access restriction. Your
                authentication will remain active for this browser session only.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}