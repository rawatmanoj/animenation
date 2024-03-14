// axiosInterceptor.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Create an instance of Axios
const api: AxiosInstance = axios.create({
  //  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 5000, // Adjust timeout as needed
});

// Request interceptor
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // You can modify the request config here (e.g., adding headers)
    // For example, you might want to add an authorization header
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Methods for making HTTP requests
export const apiGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const apiPost = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const apiPut = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const apiDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export const getAnime = async (id: any) => {
  let query = `
  {

      Media(id:${id}) {
        idMal
        format
        type
        tags {
          id
          name
        }
        studios {
          nodes {
            id
            name
          }
         
        }
        averageScore
        description
        popularity
        seasonYear
        season
        favourites
        countryOfOrigin
        episodes
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        genres
        recommendations(page:1,perPage:60,sort:RATING_DESC) {
    
          edges {
            node {
              id
             rating
              mediaRecommendation{
                id
                title {
                  romaji
                  english
                  native
                  userPreferred
                }
                bannerImage
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
              }
            }
          
          }
        }
        
       
        rankings {
      
          rank
        }
        title {
        
        
          userPreferred
        }
        coverImage {
          large
          medium
      
        }
        bannerImage
      }
    }
  
  
  `;

  let url = "https://graphql.anilist.co";
  let options = (query: any) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        //variables: variables,
      }),
    };
  };
  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};
export const getQuery = async (id: any) => {
  let query = `
  query ($search: String, $isAdult: Boolean) {
    anime: Page(perPage: 2) {
      pageInfo {
        total
      }
      results: media(type: ANIME, isAdult: $isAdult, search: $search) {
        id
        title {
          userPreferred
        }
        coverImage {
          medium
        }
        type
        format
        bannerImage
        isLicensed
        startDate {
          year
        }
      }
    }
    manga: Page(perPage: 2) {
      pageInfo {
        total
      }
      results: media(type: MANGA, isAdult: $isAdult, search: $search) {
        id
        title {
          userPreferred
        }
        coverImage {
          medium
        }
        type
        format
        bannerImage
        isLicensed
        startDate {
          year
        }
      }
    }
    characters: Page(perPage: 2) {
      pageInfo {
        total
      }
      results: characters(search: $search) {
        id
        name {
          userPreferred
        }
        image {
          medium
        }
      }
    }
    staff: Page(perPage: 2) {
      pageInfo {
        total
      }
      results: staff(search: $search) {
        id
        primaryOccupations
        name {
          userPreferred
        }
        image {
          medium
        }
      }
    }
    studios: Page(perPage: 2) {
      pageInfo {
        total
      }
      results: studios(search: $search) {
        id
        name
      }
    }
    users: Page(perPage: 2) {
      results: users(search: $search) {
        id
        name
        avatar {
          medium
        }
      }
    }
  }
  
  `;

  let url = "https://graphql.anilist.co";
  let options = (query: any) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          isAdult: false,
          search: id,
        },
      }),
    };
  };
  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};
export const getSeasonalAnime = async () => {
  let query = `
  query ($page: Int = 1, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $seasonYear: Int, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [Int], $isLicensed: Boolean, $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, seasonYear: $seasonYear, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedById_in: $licensedBy, isLicensed: $isLicensed, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {
        id
        title {
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        season
        seasonYear
        description
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        mediaListEntry {
          id
          status
        }
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
      }
    }
  }
  
  `;

  let url = "https://graphql.anilist.co";
  let options = (query: any) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          page: 1,
          season: "WINTER",
          seasonYear: 2024,
          sort: "POPULARITY_DESC",
          type: "ANIME",
        },
      }),
    };
  };
  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};
