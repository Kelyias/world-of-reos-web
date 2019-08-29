import {Reosean} from "../../../common-models/reosean";
import {HealthStatus} from "../../../common-models/health-status";
import {SecureRandom} from "../security/secure-random";

export class HealthStatusRoller {


    public static rollHealthStatus(offspring: Reosean[], inbred: boolean) {
        offspring.forEach(child => {
            child.healthStatus = !inbred ? HealthStatus.HEALTHY : HealthStatusRoller.rollInbred();
        });
    }

    private static rollInbred(): HealthStatus {
        let roll = SecureRandom.secureRandom();
        if (roll <= 0.1) {
            return HealthStatus.HEALTHY
        } else if (roll <= 0.5) {
            return HealthStatus.STILLBORN
        } else if (roll <= 0.8) {
            return HealthStatus.BLIND
        } else {
            return HealthStatus.INFERTILE
        }
    }
}
