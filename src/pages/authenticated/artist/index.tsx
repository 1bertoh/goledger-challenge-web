import apiClient from '@/api';
import Search from '@/components/search';
import { getUser } from '@/lib/utils';
import { TGetAlbums, TGetArtist, TGetSong } from '@/types';
import { Image, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Albums from './_albums';
import DropdownCRUD from './_dropdownCRUD';
import { EllipsisVertical, Plus } from 'lucide-react';

const Artist = () => {
    const { id, name } = useParams();
    const [artist, setArtist] = useState<TGetArtist>({} as TGetArtist)
    const [resAlbums, setResAlbums] = useState<TGetAlbums[]>([])
    const [resSongs, setResSongs] = useState<TGetSong[]>([])
    const [reqStatus, setReqStatus] = useState<"loading" | "complete" | "404">("loading")

    const getArtist = async (id: string, name: string) => {
        const user = getUser()
        const artistLocal = user.cantores?.filter((c) => c['@key'] === id)

        const body = {
            "key": {
                "@assetType": "artist",
                "id": id,
                "name": name
            }
        }
        const _resArtist: { data:  TGetArtist  } = await apiClient.post('/api/query/readAsset', body);
        if (_resArtist.data) return _resArtist.data
        setReqStatus("404")

    }

    async function fetchAlbumsAndSongs(id: string) {

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

    useEffect(() => {
        const fetch = async () => {
            const _artist = await getArtist(String(id), String(name));
            if (!_artist) return;
            setArtist(_artist)
            fetchAlbumsAndSongs(_artist['@key'])
            setReqStatus("complete")
        }

        fetch()
    }, [])

    const getRandomNumber = () => {
        return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    }
    return (
        <>
            <Search />
            <div className='container !pt-10'>
                <div className='flex gap-10 w-full '>
                    <div className='w-[600px]'>
                        <Image
                            src={`https://picsum.photos/600?random=1`}
                            alt="cantor"
                            className=" !w-[300px] cursor-pointer"
                            // width={400}
                            // height={300}
                            loading="eager"
                            radius="sm"
                            isZoomed
                            isBlurred
                        />
                    </div>
                    <div className='flex flex-col justify-around ps-10'>
                        <div className='flex justify-between items-top'>
                            <div>
                                <h1 className='text-4xl font-bold mb-5'>{artist.name}</h1>
                                <span>{artist.country}</span>
                            </div>
                            <DropdownCRUD update type='artist' name={artist.name} onActionComplete={() => { }}>
                                <EllipsisVertical className="cursor-pointer" />
                            </DropdownCRUD>
                        </div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur quod fugit delectus in illum nemo praesentium sunt beatae molestiae, mollitia nihil quos harum nostrum voluptatem obcaecati dolorum dolores, quisquam quaerat!
                        </p>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='flex justify-between'>
                        <h2 className='text-3xl font-bold'>Músicas</h2>
                        <DropdownCRUD albums={resAlbums} name={artist.name} onActionComplete={() => {}} create type='song' >
                            <Plus className='cursor-pointer' />
                        </DropdownCRUD>
                    </div>
                    <Table
                        hideHeader
                        aria-label="Example static collection table"
                        shadow='md'
                        classNames={{
                            table: "",
                            tbody: "",
                            base: "",
                            td: " font-bold text-md",
                            wrapper: "border-none bg-[#754F34] backdrop-blur-sm shadow-sm bg-opacity-[0.17]"
                        }}
                    >
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>Artists</TableColumn>
                            <TableColumn>Play</TableColumn>
                            <TableColumn>Album</TableColumn>
                        </TableHeader>
                        <TableBody
                            isLoading={reqStatus === "loading"}
                            loadingState={reqStatus === "loading" ? reqStatus : undefined}
                            loadingContent={<Spinner />}
                            emptyContent={<span className='text-black'>Sem músicas</span>}

                        >
                            {
                                resSongs.map((s, i) => (
                                    <TableRow key={s.name}>
                                        <TableCell>
                                            <div className='flex gap-4'>
                                                <MusicImage index={i} />{s.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{artist.name}</TableCell>
                                        <TableCell>Tocou {getRandomNumber()} vezes</TableCell>
                                        <TableCell>{resAlbums.filter((a) => a['@key'] === s.album['@key'])[0].name}</TableCell>
                                    </TableRow>

                                ))

                            }
                        </TableBody>
                    </Table>
                </div>
                <div className='mt-10'>
                    <h2 className='text-3xl font-bold'>Albums</h2>
                    <Albums albums={resAlbums} />
                </div>
            </div>
        </>
    )
}

const MusicImage = (props: { index: number }) => {
    const { index } = props
    return (
        <Image
            src={`https://picsum.photos/600?random=${index + 1}`}
            alt="cantor"
            className=" !w-[300px] cursor-pointer"
            width={30}
            height={30}
            loading="eager"
            radius="sm"
        />
    )
}

export default Artist