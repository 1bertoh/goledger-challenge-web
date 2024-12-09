import { TGetArtist, TUser } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getUser = ():TUser => {
  const user = localStorage.getItem("user") || "{}" ;
  const userParsed: TUser = JSON.parse(user);
  
  return {
    nome: userParsed.nome || "",
    cantores: userParsed.cantores || null
  }
} 

const postUser = (nome?: string | null, cantores?: TGetArtist[] | null): TUser => {
  const user = getUser()
  const newUserState: TUser = {
    nome: nome || user.nome,
    cantores: cantores || user.cantores
  }
  const stringUser = JSON.stringify(newUserState)
  localStorage.setItem('user', stringUser)

  return newUserState
}

export {getUser, postUser}