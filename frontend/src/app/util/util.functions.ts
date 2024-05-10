import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UtilFunction {

    capitalize(cad: string) {
        return cad.replace(/\b\w/g, (char) => char.toUpperCase());
    }

}