import { Basic } from "../basic";
import { Global } from "../../config";

export class FlipGate extends Basic {

    constructor(x: number, y: number, orientation: 'V' | 'H') {
        super();
        this.pX = x;
        this.pZ = y;

        if (orientation == 'H') {
            this.rW = 1.0;
            this.rX = 0.0;
            this.rY = 0.0;
            this.rZ = 0.0;
        } else if (orientation == 'V') {
            this.rW = 0.7071;
            this.rX = 0.0;
            this.rY = 0.7071;
            this.rZ = 0.0;
        }
    }

    toString() {
        return `{"sType": 0,"pX": ${this.pX},"pY": ${Global.y},"pZ": ${this.pZ},"rW": ${this.rW},"rX": ${this.rX},"rY":${this.rY},"rZ": ${this.rZ},"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "FlipGate","photonData": {"photonViewID": []}}`;
    }
}