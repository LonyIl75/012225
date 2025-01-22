import type { NextApiRequest, NextApiResponse } from 'next'


export async function GET(req:Request , res:NextApiRequest){
  //NEXT_PUBLIC_WEBHOOK_YOUNESFORM_GPT

}


export  async function POST(req: Request, res: NextApiResponse) {
      // Envoi de la requête à Airtable depuis le serveur
      const body = await req.json()
      const response = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_YOUNESFORM_CREATE as string , {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),  // Les données envoyées par le formulaire
      })
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données à Airtable')
      }

      // Retourner la réponse à l'appelant
      const data = await response.json()
      return data.success ? new Response('Successfull submission!', {
        status: 200
      }) : new Response('Failed submission!', {
        status: 500
      })
  }