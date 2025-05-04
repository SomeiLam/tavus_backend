import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      // Log the full received data for inspection
      console.log('Received callback data:', JSON.stringify(req.body, null, 2));

      // Check the event type
      if (req.body.event_type === 'application.transcription_ready') {
        console.log('Transcription data ready:', req.body.properties.transcript);
        
        // You can inspect the transcript field here
        // For example, log the first object in the transcript array:
        console.log('First transcript object:', JSON.stringify(req.body.properties.transcript[0], null, 2));
      } else {
        console.log('Unhandled event type:', req.body.event_type);
      }

      // Respond with a success message
      res.status(200).json({ message: 'Callback received successfully' });
    } catch (error) {
      console.error('Error processing callback:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
