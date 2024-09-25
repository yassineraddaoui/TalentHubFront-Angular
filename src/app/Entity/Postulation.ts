import {Image} from "./image";

export interface Postulation{
    id: number,
    date_postulation: string,
    decision_recruteur: string,
    cv: Image;
}
