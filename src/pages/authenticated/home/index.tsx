import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import apiClient from '@/api';
import Search from '@/components/search';
import { getUser } from '@/lib/utils';
import { TGetAlbums, TGetArtist, TGetSong } from '@/types';
import ArtistsSugestions from './_sugestions';

function Home() {
  const [artists, setArtists] = useState<TGetArtist[]>([])
  const [resAlbums, setResAlbums] = useState<TGetAlbums[]>([])
  const [resSongs, setResSongs] = useState<TGetSong[]>([])
  const processedArtists = useRef(new Set<string>());

  useEffect(() => {
    const user = getUser();
    setArtists(user.cantores || []);

    async function fetchAlbums(id: string) {
      if (processedArtists.current.has(id)) return;
      processedArtists.current.add(id);

      try {
        const getBody = (assetType: "album" | "song", key: any, parent: "artist" | "album") => ({
          "query": {
            "selector": {
              "@assetType": assetType,
              [`${parent}.@key`]: key
            }
          }
        });

        const _resAlbum: { data: { result: TGetAlbums[] } } = await apiClient.post('/api/query/search', getBody("album", id, "artist"));
        const albumKeys = _resAlbum.data.result.map((res) => res["@key"]);

        const _resSong: { data: { result: TGetSong[] } } = await apiClient.post('/api/query/search', getBody("song", { "$in": albumKeys }, "album"));

        setResAlbums((previous) => [...previous, ..._resAlbum.data.result]);
        setResSongs((previous) => [...previous, ..._resSong.data.result]);

      } catch (error: any) {
        console.error('Erro ao obter dados:', error.response?.data || error.message);
      }
    }

    if (user.cantores) {
      Promise.all(user.cantores.map((c) => fetchAlbums(c["@key"]))).then(() => {
        console.log("Succes.",);
      });
    }
  }, []);


  useEffect(() => {
  }, [setResAlbums.length, setResSongs.length])

  return (
    <>
      <Search />
      <div className='container !pt-10'>
        {
          <ArtistsSugestions artists={artists} songs={resSongs} />
        }
      </div>
    </>
  )
}

export default Home
