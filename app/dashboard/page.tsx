'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Bot, BarChart3, CreditCard, Settings } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name || 'User'}!</h1>
          <p className="text-muted-foreground">
            Manage your voice bots and track your usage
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {session?.user?.creditsMinutes || 0} min
              </div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversations</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 min</div>
              <p className="text-xs text-muted-foreground">
                22% of plan limit
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                Create New Bot
              </CardTitle>
              <CardDescription>
                Build a new voice assistant with custom personality and knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/bots/new">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Bot
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Analytics
              </CardTitle>
              <CardDescription>
                Track usage, conversations, and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your subscription, billing, and account preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full">
                  Manage Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bots */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Bots</h2>
          <Card>
            <CardHeader>
              <CardTitle>Recent Voice Bots</CardTitle>
              <CardDescription>
                Your most recently created and active bots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No bots created yet</p>
                <p className="text-sm">Create your first voice bot to get started</p>
                <Link href="/dashboard/bots/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Bot
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}