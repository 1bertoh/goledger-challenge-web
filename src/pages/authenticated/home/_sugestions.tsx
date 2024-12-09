import Card from '@/components/card';
import { TGetArtist, TGetSong } from '@/types'
import { Image } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

type Props = {
    artists: TGetArtist[],
    songs: TGetSong[]
}

const ArtistsSugestions = (props: Props) => {
    const { artists, songs } = props;
    const route = useNavigate()

    const settings = {
        dots: true,
        infinite: songs.length > 4,
        speed: 500,
        slidesToShow: Math.min(songs.length, 4),
        slidesToScroll: 1
    };

    return (
        <div>
            {
                artists.map((artist, i) => (
                    <div key={artist['@key'] + i} className='mb-12'>
                        <div className='flex justify-between mb-8'>
                            <div className='flex w-4/6 items-center gap-4'>
                                <Image
                                    src={`https://picsum.photos/200?random=${i + 1}`}
                                    alt={artist.name}
                                    className="w-fit cursor-pointer"
                                    width={50}
                                    height={50}
                                    loading="eager"
                                    onClick={() => route(`/artist/${artist['@key']}/${artist.name}`)}
                                    radius="full"
                                    isBlurred
                                />
                                <p
                                    className="text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer w-fit"
                                    onClick={() => route(`/artist/${artist['@key']}/${artist.name}`)}
                                >{artist.name}  </p>
                            </div>
                            <span
                                className='underline font-extrabold w-1/6 cursor-pointer'
                                onClick={() => route(`/artist/${artist['@key']}/${artist.name}`)}
                            >Ver mais</span>
                        </div>
                        <div>
                            <Slider {...settings}>
                                {
                                    songs.map((s, i) => (
                                        <div className="!w-[230px]" key={s['@key']} style={{ width: 230 }}>
                                            <Card>
                                                <div className="flex flex-col items-center gap-2 relative">
                                                    <Image
                                                        src={`https://picsum.photos/200?random=${i + 1}`}
                                                        alt="cantor"
                                                        className="mx-auto cursor-pointer"
                                                        style={{ margin: "auto" }}
                                                        width={200}
                                                        height={200}
                                                        loading="eager"
                                                        onClick={() => { }}
                                                        radius="sm"
                                                    />
                                                    <p className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full ">{s.name}  </p>
                                                </div>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ArtistsSugestions