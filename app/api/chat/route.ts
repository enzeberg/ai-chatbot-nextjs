import { createFireworks } from '@ai-sdk/fireworks'
import { streamText, UIMessage, convertToModelMessages } from 'ai'
import { NextRequest } from 'next/server'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  const apiKey = process.env.FIREWORKS_API_KEY
  console.log('apiKey', apiKey)

  if (!apiKey) {
    const encoder = new TextEncoder()
    const id = 'demo-response'
    const demoText = "I'm a demo AI assistant. To use real AI responses, please configure your Fireworks API key in the .env file. For now, I can show you how the interface works with this simulated response."

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-start', id })}\n\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-delta', id, delta: demoText })}\n\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-end', id })}\n\n`))
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  }

  try {
    const fireworks = createFireworks({ apiKey })
    const model = fireworks('accounts/fireworks/models/llama-v3p1-70b-instruct')

    const result = streamText({
      model,
      messages: convertToModelMessages(messages),
      temperature: 0.7,
      // maxTokens: 1000,
    })

    // 用 ai SDK 官方推荐的流式返回
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}