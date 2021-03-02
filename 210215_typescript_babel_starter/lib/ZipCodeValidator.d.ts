import { StringValidator } from "./StringValidator";
export declare const numberRegexp: RegExp;
export declare class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string): boolean;
    isAcceptables(s: string): boolean;
}
