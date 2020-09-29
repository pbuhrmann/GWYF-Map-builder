import { Global } from "../config";
import { Basic } from "../domain/basic";
import { FourWingSpinner, GhostSpinner, LightningStrike, Mine, OilDrum, Rock01, SpinningFloor, WalkingTurtle, WebSpinner } from "../domain/traps";

export class TrapGenerator {

    // private traps = [FourWingSpinner, LightningStrike, Mine, OilDrum, Rock01, SpinningFloor, WalkingTurtle, WebSpinner]
    private traps = [FourWingSpinner, FourWingSpinner, Mine, Rock01, OilDrum, OilDrum, OilDrum, OilDrum, OilDrum, OilDrum, OilDrum]

    constructor() {

    }

    public createTrap(x: number, y: number, z: number): Basic {
        if (Math.random() >= 1 - Global.trapProbability) {
            const random = Math.floor(Math.random() * this.traps.length);
            return new this.traps[random](x, y, z);
        }
    }

}