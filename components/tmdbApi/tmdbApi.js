import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMjkyODk3My4wNzQxMiwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FtDKh6tJRrHz-13hHF2shi7SfvUU7tG82dK7p7DKoZU"; // replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
});

export const searchMovies = async (query) => {
	const response = await tmdbApi.get(`/search/movie`, {
		params: {
			query: query,
			include_adult: true,
			language: "en-US",
			page: 1,
		},
	});
	return response.data;
};


export const MovieDetails = async (query) => {
	const response = await tmdbApi.get(`/movie/`, {
		params: {
			query: query,
			language: "en-US",
		},
	});
	return response.data;
}