const API_KEY = "nqP9KcrmsZu9T8No1rbajVXjEK2zaFdL6IYbjSri";
type Params = {
  api_key?: typeof API_KEY;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
  date?: string;
};
export const PlanetaryService = async (params: Params) => {
  const queryParams = new URLSearchParams(params as string).toString();
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?${queryParams}&api_key=${API_KEY}`
  );
  return await res.json();
};
