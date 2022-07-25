import { gql } from "@apollo/client";

export const LIST_ANIME = gql`
  query getListAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(type: ANIME, status: FINISHED, season: SPRING, seasonYear: 2022) {
        id
        title {
          romaji
          native
          english
        }
        coverImage {
          large
        }
        popularity
        description
        status
        tags {
          name
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
      }
    }
  }
`;

export const DETAIL_ANIME = gql`
  query getListAnimeDetail($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        native
        english
      }
      coverImage {
        large
      }
      type
      status
      tags {
        name
      }
      format
      description
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
    }
  }
`;
