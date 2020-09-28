import { Basic } from "./basic";
import { Global } from "../config";

export class WallV extends Basic {

    width: number = 6;
    height: number = 1;
    depth: number = 1;

    constructor(x: number, y: number) {
        super();
        this.pX = x;
        this.pZ = y;
    }

    toString(){
        return `{"sType": 0,"pX": ${this.pX},"pY": ${Global.y},"pZ": ${this.pZ},"rW": 0.7071,"rX": 0.0,"rY": 0.7071,"rZ": 0.0,"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "Wall_1x6_Space","photonData": {"photonViewID": []}}`;
    }
}