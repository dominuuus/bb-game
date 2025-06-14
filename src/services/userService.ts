import { api } from "../lib/axios";
import gameData from "../assets/db/db.json";

export interface User {
  id: number;
  Nome: string;
  Email: string;
  Imagem: string | null;
  Descrição: string;
  Estelares: number;
  Nível: number;
  Equipe_Nome: string | null;
  Cargo: string;
}

interface RawUser {
  id: number;
  nome: string;
  email_mascado: string;
  imagem: string | null;
  descricao: string;
  estelares: number;
  nivel: number;
  equipe: {
    id: number;
    nome: string;
    status: { id: number; nome: string };
  } | null;
  cargo: string;
}

const mapRawUserToUser = (raw: RawUser): User => ({
  id: raw.id,
  Nome: raw.nome,
  Email: raw.email_mascado,
  Imagem: raw.imagem,
  Descrição: raw.descricao,
  Estelares: raw.estelares,
  Nível: raw.nivel,
  Equipe_Nome: raw.equipe ? raw.equipe.nome : null,
  Cargo: raw.cargo,
});

export async function fetchUser(): Promise<User[]> {
  try {
    const response = await api.get("/usuarios");
    const rawUsers: RawUser[] = response.data;
    if (!Array.isArray(rawUsers)) {
      throw new Error("Dados de usuários inválidos retornados pela API");
    }
    return rawUsers.map(mapRawUserToUser);
  } catch (error) {
    console.error("Erro ao buscar usuários via API:", error);
    try {
      const rawUsers: RawUser[] = gameData.usuarios;
      if (!Array.isArray(rawUsers)) {
        throw new Error("Dados de usuários inválidos no db.json");
      }
      return rawUsers.map(mapRawUserToUser);
    } catch (fallbackError) {
      console.error("Erro no fallback para db.json:", fallbackError);
      throw new Error(
        "Falha ao carregar usuários. Verifique o JSON Server ou o arquivo db.json."
      );
    }
  }
}
