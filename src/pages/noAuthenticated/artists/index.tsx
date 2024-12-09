import apiClient from "@/api";
import Button from "@/components/button";
import Card from "@/components/card";
import { getUser, postUser } from "@/lib/utils";
import { TGetArtist } from "@/types";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Artists = () => {
  const user = getUser();
  const [response, setResponse] = useState<TGetArtist[] | null>(null)
  const [showList, setShowList] = useState(false)
  const [selectedArtists, setSelectedArtists] = useState<TGetArtist[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      const data = {
        "query": {
          "selector": {
            "@assetType": "artist"
          }
        }
      }

      try {
        const res: { data: { result: TGetArtist[] } } = await apiClient.post('/api/query/search', data); // Substitua com o endpoint correto
        setResponse(res.data.result)
      } catch (error: any) {
        console.error('Erro ao obter dados:', error.response?.data || error.message);
      }
    }
    fetch()
  }, [])

  const insertArtist = (artist: TGetArtist) => {
    const index = selectedArtists!.findIndex((a) => a["@key"] === artist["@key"])

    setSelectedArtists((previous) => {
      let p = previous
      if (index !== -1) p.splice(index, 1)
      else p.push(artist)

      return [...p]
    })

  }

  const submitArtists = () => {
    if(selectedArtists.length > 3 ) {
      postUser(null, selectedArtists)
      navigate("/home")
    } else {
      alert("Slecione pelo menos três cantores")
    }
  }

  return (
    <div className="container">
      <motion.h1
        className="text-6xl font-extrabold text-center mt-8"
        initial={{
          y: 100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 2
        }}
        onAnimationComplete={() => setShowList(true)}

      >
        {
          `${user.nome}, precisamos que você escolha os seus artistas favoritos`
        }
      </motion.h1>
      <>
        {
          showList && response ?
            (
              <>
                <motion.div
                  className="flex flex-wrap justify-center mt-8"
                  style={{ gap: 30 }}
                  initial={{ y: 100, opacity: 0, display: "none" }}
                  animate={{ y: 0, opacity: 1, display: "flex" }}
                  transition={{ duration: 2 }}
                >
                  {
                    response.map((c, i) => (
                      <div className="!w-[230px]" key={c["@key"]} style={{ width: 230 }}>
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
                              onClick={() => insertArtist(c)}
                              radius={selectedArtists!.some((a) => a["@key"] === c["@key"]) ? "full" : "none"}
                              // width={150}
                              isBlurred={selectedArtists!.some((a) => a["@key"] === c["@key"]) ? true : false}
                            />
                            <p className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full ">{c.name}  </p>
                          </div>
                        </Card>
                      </div>
                    ))
                  }
                </motion.div>
                <Button callback={submitArtists} text="Pronto" type="success" />
              </>
            ) :
            (<p>Loading</p>)
        }
      </>
    </div>
  )
}

export default Artists