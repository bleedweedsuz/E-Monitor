export async function loadEarthquakeData(EARTHQUAKE_API_QUERY, funTry, funCatch) {
  let limit = "limit=100";
  try {
    const response = await fetch(EARTHQUAKE_API_QUERY);
    const responseData = await response.json();
    funTry(responseData);
  } catch (e) {
    funCatch();
  }
}
