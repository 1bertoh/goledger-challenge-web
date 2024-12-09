import { TGetAlbums } from '@/types'
import { Card, Image } from '@nextui-org/react'
import Slider from 'react-slick'

type Props = {
    albums: TGetAlbums[]
}

const Albums = (props: Props) => {
    const { albums } = props;
    const settings = {
        dots: true,
        infinite: albums.length > 4,
        speed: 500,
        slidesToShow: Math.min(albums.length, 4),
        slidesToScroll: 1
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    albums.map((album, i) => (
                        <div className="!w-[230px]" key={album['@key']+i} style={{ width: 230 }}>
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
                                    <p className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full ">{album.name}  </p>
                                </div>
                            </Card>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Albums