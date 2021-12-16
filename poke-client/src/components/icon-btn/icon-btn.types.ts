
export interface IconBtnProps {
    iconName: string,
    btnName: string,
    url: string,
    quantity : number,
    disabled: boolean,
};

export interface IconBtn {
    button: IconBtnProps,
    setCurrentUser ?:any
    user: any,
    getFavPokemon?: () => void,
}