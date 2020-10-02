import { Basic } from "./basic";

export class Water extends Basic {

    constructor(x: number, y: number, z: number) {
        super();
        this.pX = x;
        this.pZ = y;
        this.pY = z;
    }

    toString() {
        return `{"sType": 0,"pX": ${this.pX},"pY": ${this.pY - 1.5},"pZ": ${this.pZ},"rW": 1.0,"rX": 0.0,"rY": 0.0,"rZ": 0.0,"sX": 6.0,"sY": 3.0,"sZ": 6.0,"obName": "Pirate_Water","photonData": {"photonViewID": []}}`;
    }
}