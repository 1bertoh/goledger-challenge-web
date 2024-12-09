export type TUser = {
    nome: string;
    cantores: TGetArtist[] | null
}

export type TTheme = "dark" | "light"

export type TGetArtist = {
    "@assetType": "artist";
    "@key": string;
    "@lastTouchBy": string;
    "@lastTx": string;
    "@lastUpdated": string
    "country": string
    "name": string
}

export type TGetAlbums = {
    "assetType": "album";
    "@key": string;
    "@lastTouchBy": string;
    "@lastTx": string;
    "@lastUpdated": string;
    "artist": {
        "@assetType": "artist"
        "@key": string
    }
    "name": string;
    "year": number
}

export type TGetSong = {
    "@assetType": "song",
      "@key": string,
      "@lastTouchBy": string,
      "@lastTx": string,
      "@lastUpdated": string,
      "album": {
        "@assetType": "album",
        "@key": string
      },
      "name": string
}