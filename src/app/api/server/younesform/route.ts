import type { NextApiRequest, NextApiResponse } from 'next'

export  async function POST(req: Request, res: NextApiResponse) {
      const body = await req.json()
      console.log("POST server younesform" , {body})
      return new Response('Test', { status: 200 })
  }