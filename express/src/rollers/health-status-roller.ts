import {Reosean} from "../../../common-models/reosean";
import {HealthStatus} from "../../../common-models/health-status";
import {SecureRandom} from "../security/secure-random";

export class HealthStatusRoller {

    private static inbredHealthPassRates: HealthPassRate[] = [
        {healthStatus: HealthStatus.HEALTHY, passRate: 0.1},
        {healthStatus: HealthStatus.STILLBORN, passRate: 0.4},
        {healthStatus: HealthStatus.BLIND, passRate: 0.3},
        {healthStatus: HealthStatus.INFERTILE, passRate: 0.2},
    ];

    public static rollHealthStatus(offspring: Reosean[], inbred: boolean) {
        offspring.forEach(child => {
            child.healthStatus = !inbred ? HealthStatus.HEALTHY : HealthStatusRoller.rollInbred();
        });
    }

    private static rollInbred(): HealthStatus {
        let roll = SecureRandom.secureRandom();
        let prevPassRate = 0.0;
        let healthStatus = HealthStatus.HEALTHY;

        this.inbredHealthPassRates.forEach(passRate => {

            if (prevPassRate < roll && roll <= passRate.passRate) {
                healthStatus = passRate.healthStatus;
            }
        });
        return healthStatus;
    }
}

interface HealthPassRate {
    healthStatus: HealthStatus;
    passRate: number
}
