export interface Foto {
    id: string,
    url: string,
    usuario: string,
    fecha: string,
    likes: Like[],
    color?: string
}

export interface Like {
    usuario: string,
    estado: boolean,
}
