import OpenAI from "openai";
import { ResolutionType } from "@/types/image-generation";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
  organization: process.env.ORGANISATION_ID
});

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Process a POST request
    const { searchText: text, resolution, model } = req.body
    if(!text) {
      res.status(401).json({ type: 'error', message: 'Please add a text'})
    }
    if (text.length < 3) {
      res.status(401).json({ type: 'error', message: 'Too short text'})
    }

    try  {
    const image = await getImage(text, model, resolution)
    res.status(200).json(image)

  } catch(e) {
    res.status(401).json({ error: e})
  }

  } else {
  }
}

const getImage = async (text: string, model: string, resolution: string) => {
  const image = await openai.images.generate({ model, prompt: text, size: resolution as ResolutionType });
  console.log('image', image)
  return image.data
}

export default handler

/**
 * [
  {
    revised_prompt: "A delightful baby with a blush of playfulness in his eye, exercising caution as he interacts with a lion. Keep the atmosphere light and innocent, focusing on the gentle lion as an exceedingly tame creature. The lion should appear beautiful and majestic, yet utterly harmless, allowing the tiny tot, of Caucasian descent, to frolic around without any fear. The setting is a sunny outdoor landscape, with the sun's delicate rays bathing the scene in a soft, gentle glow. Please do not create a dangerous or fearful scenario.",
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-OozkG59BgSO1t10iPg6gosOK/user-Vb58CjaCp6ngScKzWmKzaojq/img-u3V4MfsPtySUNMfipxb1xL8S.png?st=2023-11-20T14%3A35%3A55Z&se=2023-11-20T16%3A35%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-19T20%3A49%3A56Z&ske=2023-11-20T20%3A49%3A56Z&sks=b&skv=2021-08-06&sig=U0BEjmM7Pv0oG%2BSkEBKhFio6eCiRz61fQI0MaMD8WdY%3D'
  }
]
 */
