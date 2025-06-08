const moodToSpotifyKeyword = {
  joy: "happy",
  sadness: "melancholy",
  anger: "metal",
  surprise: "dance",
  fear: "dark",
  love: "romantic",
};

const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID}`;
const clientSecret = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENTSECRET}`

async function getSpotifyAccessToken() {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const emotion = searchParams.get('emotion');

  if (!emotion) {
    return new Response(
      JSON.stringify({ error: "Missing emotion parameter" }),
      { status: 400 }
    );
  }

  const keyword = moodToSpotifyKeyword[emotion] || "chill";

  try {
    const accessToken = await getSpotifyAccessToken();

    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=track&limit=12`;
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Spotify search API error');
    }

    const data = await response.json();
    const tracks = data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(", "),
      album: {
        name: track.album.name,
        cover_medium: track.album.images.length > 1 ? track.album.images[1].url : (track.album.images[0]?.url || null), // typically medium size
      },
      link: track.external_urls.spotify,
    }));

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return new Response(
      JSON.stringify({ error: "Spotify API request failed" }),
      { status: 500 }
    );
  }
}
