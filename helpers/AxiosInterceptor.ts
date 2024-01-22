// axiosInterceptor.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const apiPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const apiPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export const getAnime = async (id:any) => {
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


  let url = 'https://graphql.anilist.co';
  let options = (query:any) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        //variables: variables,
      }),
    };
  }
  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};
