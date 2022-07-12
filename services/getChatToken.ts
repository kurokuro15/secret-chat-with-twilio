async function getChatToken(jwt: string) {
  return await fetch('/api/get-chat-token', { headers: { authorization: jwt } });
}

export default getChatToken;
