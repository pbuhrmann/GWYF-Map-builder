import { Basic } from "./basic";
import { Global } from "../config";

export class Spawn extends Basic {

    constructor(x: number, y: number, z: number) {
        super();
        this.pX = x;
        this.pZ = y;
        this.pY = z;
    }

    toString() {
        return `{"sType": 4,"pX": ${this.pX},"pY": ${this.pY},"pZ": ${this.pZ},"rW": 0.0,"rX": 0.0,"rY": 1.0,"rZ": 0.0,"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "SingleSpawn","spawnName": "Spawn 1","par": 99,"photonData": {"photonViewID": []}}`;
    }
}