import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { ApiError } from 'types/api';
import { ChatToken } from 'types/conversations';
import { supabase } from 'utils/supabaseClient';

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const serviceSid = process.env.TWILIO_SERVICE_SID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatToken | ApiError>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ status: 405, message: `Method ${req.method} Not Allowed` });
    return;
  }

  if (!twilioAccountSid || !twilioApiKey || !twilioApiSecret || !serviceSid) {
    res.status(500).json({ status: 500, message: 'Please check your environment variables' });
    return;
  }

  const jwt = req.headers.authorization?.replace(/[Bb]earer /, '');
  if (!jwt) {
    res.status(401).json({ status: 401, message: 'authorization header is required.' });
    return;
  }

  const { user, error } = await supabase.auth.api.getUser(jwt);
  if (error) {
    res.status(400).json({ status: 400, message: error.message });
    return;
  }

  const identity = user?.email;

  // Create a "grant" which enables a client to use Chat as a given user, on a given device
  const chatGrant = new ChatGrant({ serviceSid });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, { identity });
  token.addGrant(chatGrant);

  // Serialize the token to a JWT string
  res.status(200).json({ chatToken: token.toJwt() });
}
