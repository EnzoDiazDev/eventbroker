export type KeysOfKeyOrAnys<T, Tkey extends keyof T> = T[Tkey] extends [...unknown[]] ? T[Tkey] : any[]
