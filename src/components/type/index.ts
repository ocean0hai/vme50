interface selectsType {
    name: string;
    price: number;
    checked?: boolean;
}
interface ChargesType {
    nametype: string;
    type: string;
    selects: Array<selectsType>;
}

export { selectsType, ChargesType };
