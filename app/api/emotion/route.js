export const runtime = 'edge';

export async function POST(request) {
  const { inputs } = await request.json();

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs }),
      }
    );

    const data = await response.json();
    const topEmotion = data[0][0];
    
    return Response.json({
      emotion: topEmotion.label,
      score: topEmotion.score,
    });
  } catch (error) {
    return Response.json(
      { error: 'Emotion detection failed' },
      { status: 500 }
    );
  }
}