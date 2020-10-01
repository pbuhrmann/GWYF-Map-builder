import { Basic } from "./basic";

export class SRamp2FoundationWall extends Basic {

    constructor(x: number, y: number, z: number, dir: 'RL' | 'DT' | 'LR' | 'TD') { // Top->down, Left->right, Right->left, Down->top
        super();
        this.pX = x;
        this.pZ = y;
        this.pY = z;

        switch (dir) {
            case 'RL':
                this.rW = 0.7071;
                this.rY = 0.7071;
                break;
            case 'DT':
                this.rW = 0.0;
                this.rY = 1.0;
                break;
            case 'LR':
                this.rW = -0.7071;
                this.rY = 0.7071;
                break;
            case 'TD':
                this.rW = 1.0;
                this.rY = 0.0;
                break;

        }
    }

    toString() {
        return `{"sType": 0,"pX": ${this.pX},"pY": ${this.pY},"pZ": ${this.pZ},"rW": ${this.rW},"rX": 0.0,"rY": ${this.rY},"rZ": 0.0,"sX": 1.0,"sY": 1.0,"sZ": 1.0,"obName": "Wall_Foundation 6x6_smooth+2","photonData": {"photonViewID": []}}`;
    }
}