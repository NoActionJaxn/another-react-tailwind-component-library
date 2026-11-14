import { getCountries, getCountryCallingCode } from "libphonenumber-js";

export interface PhoneCountry {
  /** ISO 3166-1 alpha-2 code, e.g. "US". Used for formatting. */
  code: string;
  /** Calling code including "+", e.g. "+1". */
  dialCode: string;
  /** Name shown in the list. */
  name: string;
}

/** Common countries from every region; pass `countries` to replace it. */
export const defaultPhoneCountries: PhoneCountry[] = [
  // Americas
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "MX", dialCode: "+52", name: "Mexico" },
  { code: "BR", dialCode: "+55", name: "Brazil" },
  { code: "AR", dialCode: "+54", name: "Argentina" },
  { code: "CO", dialCode: "+57", name: "Colombia" },
  { code: "CL", dialCode: "+56", name: "Chile" },
  { code: "PE", dialCode: "+51", name: "Peru" },
  // Europe
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "IE", dialCode: "+353", name: "Ireland" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "ES", dialCode: "+34", name: "Spain" },
  { code: "IT", dialCode: "+39", name: "Italy" },
  { code: "NL", dialCode: "+31", name: "Netherlands" },
  { code: "SE", dialCode: "+46", name: "Sweden" },
  { code: "CH", dialCode: "+41", name: "Switzerland" },
  { code: "PL", dialCode: "+48", name: "Poland" },
  { code: "UA", dialCode: "+380", name: "Ukraine" },
  { code: "RU", dialCode: "+7", name: "Russia" },
  { code: "TR", dialCode: "+90", name: "Turkey" },
  // Middle East
  { code: "AE", dialCode: "+971", name: "United Arab Emirates" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia" },
  { code: "IL", dialCode: "+972", name: "Israel" },
  { code: "IR", dialCode: "+98", name: "Iran" },
  { code: "IQ", dialCode: "+964", name: "Iraq" },
  // Africa
  { code: "EG", dialCode: "+20", name: "Egypt" },
  { code: "NG", dialCode: "+234", name: "Nigeria" },
  { code: "KE", dialCode: "+254", name: "Kenya" },
  { code: "ET", dialCode: "+251", name: "Ethiopia" },
  { code: "GH", dialCode: "+233", name: "Ghana" },
  { code: "MA", dialCode: "+212", name: "Morocco" },
  { code: "ZA", dialCode: "+27", name: "South Africa" },
  // Asia
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "PK", dialCode: "+92", name: "Pakistan" },
  { code: "BD", dialCode: "+880", name: "Bangladesh" },
  { code: "CN", dialCode: "+86", name: "China" },
  { code: "HK", dialCode: "+852", name: "Hong Kong" },
  { code: "TW", dialCode: "+886", name: "Taiwan" },
  { code: "JP", dialCode: "+81", name: "Japan" },
  { code: "KR", dialCode: "+82", name: "South Korea" },
  { code: "ID", dialCode: "+62", name: "Indonesia" },
  { code: "PH", dialCode: "+63", name: "Philippines" },
  { code: "VN", dialCode: "+84", name: "Vietnam" },
  { code: "TH", dialCode: "+66", name: "Thailand" },
  { code: "MY", dialCode: "+60", name: "Malaysia" },
  { code: "SG", dialCode: "+65", name: "Singapore" },
  // Oceania
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "NZ", dialCode: "+64", name: "New Zealand" },
];

/**
 * Every country and territory libphonenumber-js knows (about 245), named in
 * `locale` with the browser's Intl.DisplayNames and sorted by name.
 * getPhoneCountries("ar") gives Arabic names, getPhoneCountries("ja") Japanese.
 */
export function getPhoneCountries(locale = "en"): PhoneCountry[] {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  return getCountries()
    .map((code) => ({
      code,
      dialCode: `+${getCountryCallingCode(code)}`,
      name: names.of(code) ?? code,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}
