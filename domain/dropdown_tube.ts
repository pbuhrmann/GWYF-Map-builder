import { Basic } from "./basic";
import { Global } from "../config";

export class DropdownTube extends Basic {

    width: number = 6;
    height: number = 1;
    depth: number = 6;

    constructor(x: number, y: number, z: number) {
        super();
        this.pX = x;
        this.pZ = y;
        this.pY = z;
    }

    toString() {
        return `{"sType": 0,"pX": ${this.pX},"pY": ${this.pY},"pZ": ${this.pZ},"rW": 1.0,"rX": 0.0,"rY": 0.0,"rZ": 0.0,"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "6x6_DropdownTube_${Global.theme}","photonData": {"photonViewID": []}}`;
    }
}