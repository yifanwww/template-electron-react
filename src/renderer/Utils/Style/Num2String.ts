export type Num2String = (num: number) => string;

export const num2pt: Num2String = (num) => `${num}pt`;
export const num2px: Num2String = (num) => `${num}px`;
export const percent2string: Num2String = (num) => `${num}%`;
