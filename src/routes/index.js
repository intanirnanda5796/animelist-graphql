export const RouteParams = {
    ID: ':id',
    NAME: ':name'
}

export const ROUTES = {
    ROOT: '/',
    ANIME_DETAIL: `/anime-detail/${RouteParams.ID}`,
    COLLECTION: '/collection',
    COLLECTION_DETAIL: `/collection-detail/${RouteParams.NAME}`,
    PAGE_NOT_FOUND: '/page-not-found',
    ALL: '*',
}