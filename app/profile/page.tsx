 "use client"

import { useAuth } from "@/lib/auth"
import { useProfile } from "@/hooks/use-profile"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, CheckCircle, Phone, Mail, Building, Calendar, Shield, FileText, Trophy, Upload, MapPin, Users, Clock, Eye, EyeOff } from "lucide-react"


export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { profile, loading: profileLoading, error: profileError } = useProfile(user?.phone || null)

  // Debug logging for profile data

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-3xl border bg-gradient-to-br from-card to-muted/20 p-12 text-center shadow-lg animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">Not Logged In</h2>
          <p className="text-muted-foreground mb-6">Please log in to access your profile</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  const displayName = profile?.name?.trim() || user.name?.trim() || user.phone || "User"

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-3xl bg-gradient-to-br from-secondary via-secondary to-primary/10 p-8 shadow-lg animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-white/20">
              <AvatarImage src={profile?.profilePhotoUrl || "/generic-user-avatar.jpg"} alt="Profile" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {profile?.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-secondary-foreground">{displayName}</h1>
            <p className="text-secondary-foreground/80 text-sm">
              {profile?.businessName || "Pharmacy Professional"}
            </p>
            {profile?.isVerified && (
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Verified Account</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Client Information Card */}
        <div className="rounded-3xl border bg-gradient-to-br from-card to-muted/20 shadow-lg overflow-hidden animate-fade-in">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Client Information</h2>
                <p className="text-muted-foreground">Your account details and preferences</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Phone Number</p>
                  <p className="font-semibold text-lg">{profile?.phone || user.phone}</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Email Address</p>
                  <p className="font-semibold text-lg">{profile?.email || user.email || 'Not set'}</p>
                </div>
              </div>
              {profile?.year && (
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Member Since</p>
                    <p className="font-semibold text-lg">{profile.year}</p>
                  </div>
                </div>
              )}
              {profile?.type && (
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Account Type</p>
                    <p className="font-semibold text-lg">{profile.type}</p>
                  </div>
                </div>
              )}
              {profile?.isVerified !== undefined && (
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${profile.isVerified ? 'bg-green-500/10' : 'bg-muted/50'}`}>
                    <CheckCircle className={`h-5 w-5 ${profile.isVerified ? 'text-green-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Verification Status</p>
                    <p className={`font-semibold text-lg ${profile.isVerified ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {profile.isVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              )}
              {profile?.address && Array.isArray(profile.address) && profile.address.length > 0 && (
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Address</p>
                    <p className="font-semibold text-lg">{profile.address.join(', ')}</p>
                  </div>
                </div>
              )}
              {profile?.assignedEmployee && typeof profile.assignedEmployee === 'object' && profile.assignedEmployee !== null && (
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Assigned Employee</p>
                    <p className="font-semibold text-lg">{String((profile.assignedEmployee as any)?.name || 'N/A')}</p>
                    {(profile.assignedEmployee as any)?.phone && <p className="text-sm text-muted-foreground">{String((profile.assignedEmployee as any)?.phone)}</p>}
                    {(profile.assignedEmployee as any)?.businessName && <p className="text-sm text-muted-foreground">{String((profile.assignedEmployee as any)?.businessName)}</p>}
                  </div>
                </div>
              )}
              {/* {profile?.uploadOn !== undefined && ( */}
                {/* <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${profile.uploadOn ? 'bg-green-500/10' : 'bg-muted/50'}`}>
                    <Upload className={`h-5 w-5 ${profile.uploadOn ? 'text-green-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Upload Status</p>
                    <p className={`font-semibold text-lg ${profile.uploadOn ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {profile.uploadOn ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div> */}
              {/* )} */}
              {/* {profile?.showStock !== undefined && ( */}
                {/* <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${profile.showStock ? 'bg-blue-500/10' : 'bg-muted/50'}`}>
                    {profile.showStock ? <Eye className="h-5 w-5 text-blue-600" /> : <EyeOff className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Show Stock</p>
                    <p className={`font-semibold text-lg ${profile.showStock ? 'text-blue-600' : 'text-muted-foreground'}`}>
                      {profile.showStock ? 'Visible' : 'Hidden'}
                    </p>
                  </div>
                </div> */}
              {/* )} */}
              {/* {profile?.requestLedger !== undefined && ( */}
                {/* <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${profile.requestLedger ? 'bg-purple-500/10' : 'bg-muted/50'}`}>
                    <FileText className={`h-5 w-5 ${profile.requestLedger ? 'text-purple-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Ledger Request</p>
                    <p className={`font-semibold text-lg ${profile.requestLedger ? 'text-purple-600' : 'text-muted-foreground'}`}>
                      {profile.requestLedger ? 'Requested' : 'Not Requested'}
                    </p>
                  </div>
                </div> */}
              {/* )} */}
            </div>
          </div>
        </div>

        {/* Business Details Card */}
        <div className="rounded-3xl border bg-gradient-to-br from-card to-muted/20 shadow-lg overflow-hidden animate-fade-in">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/10">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Business Details</h2>
                <p className="text-muted-foreground">Your business information and credentials</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-orange-500/5 hover:to-orange-500/10 transition-all duration-300 border border-transparent hover:border-orange-500/20">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <Building className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Business Name</p>
                  <p className="font-semibold text-lg">{profile?.businessName || 'Not Set'}</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-orange-500/5 hover:to-orange-500/10 transition-all duration-300 border border-transparent hover:border-orange-500/20">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <Upload className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Business Photo</p>
                  <p className="font-semibold text-lg">{profile?.businessPhotoUrl ? 'Uploaded' : 'Not Uploaded'}</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-orange-500/5 hover:to-orange-500/10 transition-all duration-300 border border-transparent hover:border-orange-500/20 md:col-span-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">License Documents</p>
                  <div className="mt-2 grid grid-cols-1 gap-3">
                    {profile?.licenseUrl && typeof profile.licenseUrl === 'object' && Object.keys(profile.licenseUrl).length > 0 ? (
                      Object.entries(profile.licenseUrl).map(([key, value]) => (
                        <div key={key} className="p-3 bg-white/50 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{key}</span>
                            {value ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => window.open(value as string, '_blank')}
                              >
                                View Document
                              </Button>
                            ) : (
                              <span className="text-xs text-red-600">Not Uploaded</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">No licenses uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {/* Removed View Reference button */}
        <Button asChild variant="outline" className="rounded-full bg-transparent">
          <Link href="/deleteaccount">Delete Account</Link>
        </Button>
        <Button className="rounded-full" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
