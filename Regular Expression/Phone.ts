class PhoneNumberValidator {
    private static readonly sofiaPhoneNumberRegex: RegExp = /^(?:\+|0)359([ -])2\1\d{3}\1\d{4}\b/;

    static isValidSofiaPhoneNumber(phoneNumber: string): boolean {
        return PhoneNumberValidator.sofiaPhoneNumberRegex.test(phoneNumber);
    }
}

// Example usage
const validPhoneNumber = "+359 2 222 2222";
const invalidPhoneNumber = "+359-2-222-22222";

console.log(`Is "${validPhoneNumber}" a valid Sofia phone number? ${PhoneNumberValidator.isValidSofiaPhoneNumber(validPhoneNumber)}`);
console.log(`Is "${invalidPhoneNumber}" a valid Sofia phone number? ${PhoneNumberValidator.isValidSofiaPhoneNumber(invalidPhoneNumber)}`);
