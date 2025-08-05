 'use client'
import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trash2, MessageCircle } from "lucide-react"

export const ChatInterface = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 使用 useChat hook 管理聊天状态
  const {
    messages,
    sendMessage,
    status,
    stop,
    setMessages
  } = useChat({
    onError: (error) => {
      console.error('Chat error:', error)
    },
    onFinish: (message) => {
      console.log('Chat finished:', message)
    }
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const clearChat = () => {
    setMessages([])
  }

  const handleSendMessage = async (message: string) => {
    // 使用 AI SDK 推荐的 sendMessage 方法
    if (message.trim()) {
      await sendMessage({ text: message })
    }
  }

  const stopGenerating = () => {
    stop()
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-background">
      {/* Header */}
      <div className="border-b border-chat-border bg-background/80 backdrop-blur-sm p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">AI Chatbot</h1>
              <p className="text-sm text-muted-foreground">
                Powered by Fireworks AI
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                onClick={clearChat}
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to AI Chatbot</h2>
              <p className="text-muted-foreground max-w-md">
                Start a conversation by typing a message below. I'm here to help with any questions or tasks you have.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.parts.map((part) =>
                    part.type === 'text' ? part.text : ''
                  ).join('')}
                  role={message.role as 'user' | 'assistant'}
                />
              ))}
              {status === 'streaming' && (
                <ChatMessage
                  content=""
                  role="assistant"
                  isLoading={true}
                />
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={status === 'streaming'}
        onStopGenerating={stopGenerating}
      />
    </div>
  )
}