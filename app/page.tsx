"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Sparkles,
  BookOpen,
  Code,
  Search,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-all duration-500 relative">
      {/* Full Page Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100/20 via-gray-50/50 to-pink-100/20 dark:from-purple-900/15 dark:via-gray-950/50 dark:to-pink-900/15 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-100/15 via-transparent to-purple-100/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/15 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-purple-50/10 via-transparent to-pink-50/10 dark:from-purple-800/8 dark:via-transparent dark:to-pink-800/8 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-purple-100/8 via-transparent to-pink-100/8 dark:from-purple-900/5 dark:via-transparent dark:to-pink-900/5 pointer-events-none z-0"></div>

      {/* Full Coverage Floating Gradient Orbs */}
      {/* Top section orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-200/15 dark:bg-purple-600/8 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div
        className="fixed top-0 right-0 w-80 h-80 bg-pink-200/12 dark:bg-pink-600/6 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed top-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-blue-200/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none z-0"
      ></div>

      {/* Middle section orbs */}
      <div
        className="fixed top-1/2 left-0 transform -translate-y-1/2 w-64 h-64 bg-purple-200/12 dark:bg-purple-600/7 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 w-88 h-88 bg-pink-200/10 dark:bg-pink-600/6 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed top-1/3 left-1/4 w-56 h-56 bg-blue-200/8 dark:bg-blue-600/4 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed top-2/3 right-1/4 w-72 h-72 bg-purple-200/10 dark:bg-purple-600/6 rounded-full blur-3xl pointer-events-none z-0"
      ></div>

      {/* Bottom section orbs */}
      <div
        className="fixed bottom-0 left-0 w-80 h-80 bg-pink-200/12 dark:bg-pink-600/7 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed bottom-0 right-0 w-96 h-96 bg-purple-200/15 dark:bg-purple-600/8 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-200/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none z-0"
      ></div>

      {/* Additional edge coverage */}
      <div
        className="fixed top-1/4 left-0 w-48 h-48 bg-purple-200/8 dark:bg-purple-600/4 rounded-full blur-3xl pointer-events-none z-0"
      ></div>
      <div
        className="fixed bottom-1/4 right-0 w-52 h-52 bg-pink-200/10 dark:bg-pink-600/5 rounded-full blur-3xl pointer-events-none z-0"
      ></div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">T3.chat</span>
          </div>

          <div className="flex items-center space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 backdrop-blur-sm"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <SignInButton>
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 backdrop-blur-sm"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                Get Started
              </Button>
            </SignUpButton>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
              <Badge
                variant="secondary"
                className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Next-generation AI chat experience
              </Badge>
              
              <a
                href="https://github.com/debsouryadatta/t3-chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Open Source • Star on GitHub
              </a>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-gray-900 dark:text-white">How can we</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of AI-powered conversations. Built for creators, developers, and innovators.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  label: "Create",
                  description: "Generate content",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: <Search className="w-8 h-8" />,
                  label: "Explore",
                  description: "Discover ideas",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Code className="w-8 h-8" />,
                  label: "Code",
                  description: "Build projects",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  label: "Learn",
                  description: "Expand knowledge",
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((action, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-500 hover:scale-105 cursor-pointer shadow-sm hover:shadow-lg"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative p-8 flex flex-col items-center text-center space-y-4">
                    {/* Icon with gradient background */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${action.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-gray-700 dark:text-white group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                        {action.icon}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle glow effect */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-br ${action.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Example Questions */}
            <div className="space-y-4 mb-16 max-w-2xl mx-auto">
              {[
                "How does AI work?",
                "What are the latest trends in web development?",
                "Can you help me write better code?",
                "What's the future of technology?",
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start h-auto p-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-xl transition-all duration-300"
                >
                  {question}
                </Button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignUpButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Start New Chat
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-purple-500 backdrop-blur-sm transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 border-t border-gray-200 dark:border-gray-800/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Why Choose T3.chat?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Advanced AI capabilities designed for the modern world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Instant AI responses with zero lag. Experience the speed of next-generation technology.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Private",
                description: "Your conversations are encrypted and private. We never store or share your data.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Team Collaboration",
                description: "Share conversations, collaborate on projects, and work together seamlessly.",
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Cross-Platform",
                description: "Access your chats from any device. Seamless sync across all platforms.",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global AI Models",
                description: "Access to the latest AI models from around the world in one platform.",
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Code Assistant",
                description: "Advanced code generation, debugging, and optimization capabilities.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-900/50 dark:to-pink-900/50 rounded-3xl p-12 md:p-16 border border-purple-200 dark:border-purple-700/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-pink-200/20 dark:from-purple-600/10 dark:to-pink-600/10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-transparent to-purple-100/10 dark:from-blue-600/5 dark:via-transparent dark:to-purple-600/5"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Start Chatting?</h2>
                <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300">
                  Join thousands of users already experiencing the future of AI conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SignUpButton>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      Start Free Chat
                    </Button>
                  </SignUpButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-500 text-purple-600 dark:text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-6 text-lg rounded-full font-semibold backdrop-blur-sm transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">T3.chat</span>
            </div>
            <div className="flex space-x-6 text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
        
        {/* Disclaimer */}
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200/30 dark:border-gray-800/30">
          <p>
            This is a clone of T3 Chat built for the{" "}
            <a 
              href="https://cloneathon.t3.chat/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline transition-colors"
            >
              T3 Chat Cloneathon
            </a>
            {" "}competition by Theo.
          </p>
        </div>
      </div>
    </div>
  )
}
