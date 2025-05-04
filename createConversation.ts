import axios from 'axios';

// Define the API key and base URL
const API_KEY = 'your_tavus_api_key'; // Replace with your actual Tavus API key
const BASE_URL = 'https://api.tavus.io/v1/conversations';

// Define the interface for the request payload (you can adjust the fields based on the Tavus API documentation)
interface CreateConversationRequest {
  video_url: string;
  message: string;
}

// Create a function to create the conversation
const createConversation = async (videoUrl: string, message: string) => {
  try {
    // Construct the request body
    const body: CreateConversationRequest = {
      video_url: videoUrl,
      message: message,
    };

    // Make the API request to create a conversation
    const response = await axios.post(BASE_URL, body, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle successful response
    console.log('Conversation created:', response.data);
    return response.data;  // Return the conversation data for further use
  } catch (error) {
    // Handle any errors
    if (axios.isAxiosError(error)) {
      console.error('Error creating conversation:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

// Example usage of the function
const videoUrl = 'https://your-video-url.com'; // Replace with your video URL
const message = 'Welcome to the conversation! How can I assist you today?';

createConversation(videoUrl, message);
