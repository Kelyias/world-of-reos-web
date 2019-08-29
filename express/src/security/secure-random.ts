import crypto from "crypto";

export class SecureRandom {

    public static secureRandom(): number {
        return parseInt(crypto.randomBytes(4).toString('hex'), 16) / (4_294_967_295);
    }

    public static secureCheckRoll(targetPassPercentage: number): boolean {
        return this.secureRandom() <= targetPassPercentage;
    }

    public static secureRangeRoll(min: number, max: number): number {
        return Math.floor(this.secureRandom() * (max - min + 1)) + min;
    }
}

