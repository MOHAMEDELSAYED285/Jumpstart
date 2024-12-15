import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { stageName, stageDescription } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Write a professional email for a ${stageName} stage in a hiring process. The stage description is: ${stageDescription}. The email should be concise, friendly, and informative.`,
      max_tokens: 200,
      temperature: 0.7,
    });

    const generatedEmail = completion.data.choices[0].text.trim();
    res.status(200).json({ generatedEmail });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to generate email' });
  }
}

