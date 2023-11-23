import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
  organization: process.env.ORGANISATION_ID
});

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Process a POST request
    const { base64Image } = req.body

    if(!base64Image) {
      res.status(401).json({ type: 'error', message: 'Image missing'})
    }

    const response = await getImage(base64Image)
    res.status(200).json(response)
  } else {
    // Handle any other HTTP method
  }
}
const systemPrompt = `You are an proficient react Material UI developer. A user will provide you with a
 low-fidelity wireframe of an application and you will return
 a single html file that uses material ui to create the website. Use creative license to make the application more fleshed out.
if you need to insert an image, use placehold.co to create a placeholder image. Respond only with the typescript tsx file.`;


const getImage = async (base64Image: any) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: base64Image
          }
        ]
      }
    ]
  });

  console.log('response api choices', response['choices'])

  return response['choices']
}

export default handler
