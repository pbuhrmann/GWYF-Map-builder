import { Basic } from "./basic";
import { Global } from "../config";

export class FoundationWallV extends Basic {

    constructor(x: number, y: number, z: number) {
        super();
        this.pX = x;
        this.pZ = y;
        this.pY = z;
    }

    toString() {
        return `{"sType": 0,"pX": ${this.pX},"pY": ${this.pY},"pZ": ${this.pZ},"rW": 0.7071,"rX": 0.0,"rY": 0.7071,"rZ": 0.0,"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "6x6Foundation_Wall_Forest","photonData": {"photonViewID": []}}`;
    }
}