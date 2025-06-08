export async function detectEmotion(text) {
  const response = await fetch('/api/emotion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: text }),
  });
  return response.json();
}