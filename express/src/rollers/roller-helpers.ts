export class RollerHelpers {

    public static isSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
}
