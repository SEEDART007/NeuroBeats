export async function fetchTracksByMood(emotion) {
  const response = await fetch(`/api/spotify?emotion=${emotion}`);
  return response.json();
}