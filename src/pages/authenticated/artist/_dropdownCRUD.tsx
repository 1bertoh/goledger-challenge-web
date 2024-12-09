import { useEffect, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import Input from "@/components/input";
import { TGetAlbums, TGetArtist } from "@/types";
import apiClient from "@/api";

type Props = {
    onActionComplete: () => void; // Callback para recarregar dados após criar ou atualizar
    name: string;
    type: "artist" | "album" | "song";
    children: JSX.Element;
    update?: boolean;
    create?: boolean;
    _delete?: boolean;
    idAlbum?: string;
    idArtist?: string;
    albums?: TGetAlbums[]
};

const DropdownCRUD = (props: Props) => {
    const {name, onActionComplete, children, type, create, update, _delete, idAlbum, idArtist, albums} = props
    const [modal, setModal] = useState<"create" | "update" | "delete" | null>(null);
    const [assetType, setAssetType] = useState<"artist" | "album" | "song" | null>(type);

    const items = [
        { key: "create", label: "Criar", enabled: create },
        { key: "update", label: "Atualizar", enabled: update},
        { key: "delete", label: "Apagar", enabled: _delete },
    ];

    const handleDropdownAction = (key: string, type: "artist" | "album" | "song") => {
        setModal(key as "create" | "update" | "delete");
        setAssetType(type);
    };

    return (
        <>
            <Dropdown shouldBlockScroll={false} className="rounded-r-none border-none bg-[#754F34] backdrop-blur-sm shadow-xl bg-opacity-[0.17]">
                <DropdownTrigger>
                    {children}
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                    {items.map((item) => (
                        <>
                            {
                                item.enabled &&
                                <DropdownItem
                                    key={item.key}
                                    onClick={() => handleDropdownAction(item.key, "artist")} // Exemplo para "artist"
                                    className={`${item.key === "delete" ? "text-danger" : ""} font-bold`}
                                    color={item.key === "delete" ? "danger" : "default"}
                                >
                                    {item.label}
                                </DropdownItem>

                            }
                        </>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {modal && (
                <CreateUpdateModal
                    isOpen={modal !== null}
                    type={type}
                    crud={modal as "create" | "update"}
                    onClose={() => setModal(null)}
                    onActionComplete={onActionComplete}
                    name={name}
                    idAlbum={idAlbum}
                    idArtist={idArtist}
                    albums={albums || []}
                />
            )}
        </>
    );
};

type TCreateUpdateModal = {
    isOpen: boolean;
    type: "artist" | "album" | "song" | null;
    crud: "create" | "update";
    onClose: () => void;
    onActionComplete: () => void;
    name: string;
    idArtist?: string;
    idAlbum?: string
    albums: TGetAlbums[];
};

const CreateUpdateModal = (props: TCreateUpdateModal) => {
    const { isOpen, type, crud, onClose, onActionComplete, name, idAlbum, idArtist, albums } = props;
    const [formData, setFormData] = useState({ name: "", country: "", year: undefined });
    const [albumId, setAlbumId] = useState<any>(idAlbum)

    useEffect(() => {
        // Limpar dados ao abrir a modal
        if (isOpen) setFormData({ name: "", country: "", year: undefined });
    }, [isOpen]);

    const handleInputChange = (field: string, value: string | number | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
          let body: any;
      
          if (crud === "create") {
            // Corpo para criar um novo asset
            body = {
              asset: [
                {
                  "@assetType": type,
                  name: formData.name,
                  ...(type === "artist" && { country: formData.country }),
                  ...(type === "album" && { 
                        year: formData.year,
                        artist: {
                            "@assetType": "artist",
                            "@key": idArtist
                        }
                    }),
                    ...(type === "song" && {
                        "album": {
                            "@assetType": "album",
                            "name": albums.find((a) => a["@key"] === albumId)?.name,
                            "artist": {
                                name: name
                            }
                        }
                    })
                },
              ],
            };
          } else if (crud === "update") {
            // Corpo para atualizar um asset existente
            body = {
              update: {
                "@assetType": type,
                name: name,
                ...(type === "artist" && { country: formData.country }),
                ...(type === "album" && { year: formData.year }),
              },
            };
          }

      
          // Enviar requisição
          const endpoint =
            crud === "create"
              ? "/api/invoke/createAsset"
              : "/api/invoke/updateAsset";
      
          const response = await apiClient.put(endpoint, body);
      
      
          // Fechar modal e atualizar lista após sucesso
          onClose();
          onActionComplete();
        } catch (error) {
        }
      };
      

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="bg-background">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {crud === "create" ? `Criar Novo ${type}` : `Atualizar ${name}`}
                        </ModalHeader>
                        <ModalBody>
                            {
                                crud === "create" &&
                                <>
                                    {
                                        type === "song" && (
                                            <Select
                                            onChange={(e) => setAlbumId(e.target.value)}
                                            label="Selecione o album">
                                            {albums.map((album) => (
                                            <SelectItem key={album["@key"]}>{album.name}</SelectItem>
                                            ))}
                                        </Select>
                                        )
                                    }
                                    <Input label="Nome" value={formData.name} onChange={(e) => handleInputChange("name", e)} />
                                </>
                            }
                            {type === "artist" && (
                                <Input label="País" onChange={(e) => handleInputChange("country", e)} value={formData.country} />
                            )}
                            {type === "album" && (
                                <>
                                <Input label="Ano" value={formData.year || 0} onChange={(e) => handleInputChange("year", Number(e))} />
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onClick={handleSubmit}>
                                {crud === "create" ? "Criar" : "Atualizar"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DropdownCRUD;
