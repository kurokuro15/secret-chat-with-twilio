async function getChatToken(jwt: string): Promise<string> {
  try {
    const res = await fetch('/api/get-chat-token', { headers: { authorization: jwt } });
    const json = await res.json();
    return json.chatToken;
  } catch (error) {
    throw new Error('No se pudo obtener el token');
  }
}

export default getChatToken;
