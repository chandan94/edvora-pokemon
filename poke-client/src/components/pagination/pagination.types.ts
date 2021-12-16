export interface IPagingProps {
    total? : number,
    current? : number,
    active? : number,
    search? : string,
    setActivePage?: (page: number) => void,
    getAllPokemon?:() => void,
}