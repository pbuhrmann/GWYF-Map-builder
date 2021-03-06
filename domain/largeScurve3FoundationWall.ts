import { Basic } from "./basic";

export class LargeSCurve3FoundationWall extends Basic {

    constructor(x: number, y: number, z: number, dir: 'RL' | 'DT' | 'LR' | 'TD') { // Top->down, Left->right, Right->left, Down->top
        super();
        this.pX = x;
        this.pZ = y;
        this.pY = z;

        switch (dir) {
            case 'RL':
                this.rW = 1.0;
                this.rY = 0.0;
                break;
            case 'DT':
                this.rW = 0.7071;
                this.rY = 0.7071;
                break;
            case 'LR':
                this.rW = 0.0;
                this.rY = 1.0;
                break;
            case 'TD':
                this.rW = -0.7071;
                this.rY = 0.7071;
                break;

        }
    }

    toString() {
        return `{"sType": 0,"pX": ${this.pX},"pY": ${this.pY-1},"pZ": ${this.pZ},"rW": ${this.rW},"rX": 0.0,"rY": ${this.rY},"rZ": 0.0,"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "Large_SCurve_Forest_Foundation","photonData": {"photonViewID": []}}`;
    }
}