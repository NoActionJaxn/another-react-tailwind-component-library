import {
  AsYouType,
  Metadata,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import { hasContent, schemeVars, tw } from "../../utils";
import { InputGroup } from "../InputGroup";
import { Label } from "../Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";
import { InputField, type InputFieldProps } from "../TextInput/InputField";
import { defaultPhoneCountries, type PhoneCountry } from "./countries";

export type PhoneInputLabelPlacement = "top" | "left";
export interface PhoneInputProps extends Omit<
  InputFieldProps,
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "label"
  | "labelPlacement"
  | "prependElement"
> {
  /** E.164 number, e.g. "+15555555555". */
  value?: string;
  defaultValue?: string;
  /** Called with the E.164 number ("" when empty). */
  onValueChange?: (value: string) => void;
  countries?: PhoneCountry[];
  defaultCountry?: string;
  onCountryChange?: (country: PhoneCountry) => void;
  label?: ReactNode;
  labelPlacement?: PhoneInputLabelPlacement;
  countryLabel?: string;
}

// Raw digits typed, including trunk prefixes: a safety cap above any country's longest number.
const MAX_DIGITS = 20;
// E.164 allows 15 digits in all, calling code included.
const MAX_E164_DIGITS = 15;

const metadata = new Metadata();

/**
 * The longest number the country allows, without prefixes (US 10, FR 9, JP 17).
 * Countries the metadata doesn't know get whatever E.164 leaves after the calling code.
 */
function maxNumberLength(country: PhoneCountry) {
  try {
    metadata.selectNumberingPlan(country.code as CountryCode);
    return Math.max(...metadata.numberingPlan!.possibleLengths());
  } catch {
    return MAX_E164_DIGITS - country.dialCode.replace(/\D/g, "").length;
  }
}

/**
 * The number's own digits, after the trunk prefix (the UK's leading 0) and
 * any carrier or mobile codes the country's rules strip.
 */
function numberLength(country: PhoneCountry, national: string) {
  const parsed = parsePhoneNumberFromString(
    national,
    country.code as CountryCode,
  );
  return parsed ? String(parsed.nationalNumber).length : national.length;
}

/** Drops digits past the country's longest possible number. */
function limitDigits(country: PhoneCountry, national: string) {
  const max = maxNumberLength(country);
  let digits = national;
  while (digits && numberLength(country, digits) > max) {
    digits = digits.slice(0, -1);
  }
  return digits;
}

const anyDigit = /\p{Nd}/u;

/**
 * Converts digits from any script (Arabic-Indic ٥, Persian ۵, Devanagari ५,
 * full-width ５, …) to 0-9. Unicode keeps each script's digits as a run of ten,
 * so a digit's value is its distance from the start of its run.
 */
function toAsciiDigits(text: string) {
  return text
    .replace(/\p{Nd}/gu, (digit) => {
      const point = digit.codePointAt(0)!;
      let start = point;
      while (anyDigit.test(String.fromCodePoint(start - 1))) start--;
      return String((point - start) % 10);
    })
    .replace(/\uFF0B/g, "+");
}

function digitsOf(text: string) {
  return toAsciiDigits(text).replace(/\D/g, "").slice(0, MAX_DIGITS);
}

/** "+1" + "5555555555" → "+15555555555", using the country's rules when they apply (e.g. dropping a leading 0). */
function toE164(country: PhoneCountry, national: string) {
  if (!national) return "";
  return (
    parsePhoneNumberFromString(national, country.code as CountryCode)?.number ??
    `${country.dialCode}${national}`
  );
}

/** Splits an E.164 number into a listed country and its national digits. */
function fromE164(value: string, countries: PhoneCountry[]) {
  const parsed = parsePhoneNumberFromString(value);
  const country =
    countries.find((c) => c.code === parsed?.country) ??
    countries.find((c) => value.startsWith(c.dialCode));
  if (!country) return null;
  // The digits as dialled inside the country (with any trunk prefix, e.g. the
  // UK's leading 0), which is what the as-you-type formatter expects.
  const national = parsed
    ? digitsOf(parsed.formatNational())
    : digitsOf(value.slice(country.dialCode.length));
  return { country, national };
}

/** A phone number field: a calling-code select plus a field that formats as you type. */
export function PhoneInput({
  value,
  defaultValue,
  onValueChange,
  countries = defaultPhoneCountries,
  defaultCountry,
  onCountryChange,
  label,
  labelPlacement = "top",
  countryLabel = "Country code",
  variant,
  size,
  colorScheme,
  block = false,
  disabled,
  required,
  name,
  id,
  className,
  style,
  ...props
}: PhoneInputProps) {
  const initial = fromE164(value ?? defaultValue ?? "", countries);
  const [country, setCountry] = useState<PhoneCountry>(
    initial?.country ??
      countries.find((c) => c.code === defaultCountry) ??
      countries[0],
  );
  const [national, setNational] = useState(initial?.national ?? "");
  const e164 = toE164(country, national);

  // Controlled: follow a value set from outside (derived state, set during render).
  const [lastValue, setLastValue] = useState(value);
  if (value !== undefined && value !== lastValue) {
    setLastValue(value);
    if (value !== e164) {
      const next = fromE164(value, countries);
      setNational(next?.national ?? "");
      if (next) setCountry(next.country);
    }
  }

  function commit(nextCountry: PhoneCountry, typed: string) {
    const nextNational = limitDigits(nextCountry, typed);
    setCountry(nextCountry);
    setNational(nextNational);
    const next = toE164(nextCountry, nextNational);
    if (next !== e164) onValueChange?.(next);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    // A pasted international number ("+44 20 …") picks its own country.
    if (toAsciiDigits(raw).trim().startsWith("+")) {
      const pasted = fromE164(`+${digitsOf(raw)}`, countries);
      if (pasted) {
        if (pasted.country.code !== country.code) {
          onCountryChange?.(pasted.country);
        }
        return commit(pasted.country, pasted.national);
      }
    }
    commit(country, digitsOf(raw));
  }

  function handleCountry(code: string) {
    const next = countries.find((c) => c.code === code);
    if (!next) return;
    onCountryChange?.(next);
    commit(next, national);
  }

  const display = national
    ? new AsYouType(country.code as CountryCode).input(national)
    : "";

  const autoId = useId();
  const inputId = id ?? autoId;
  const withLabel = hasContent(label);

  const group = (
    <InputGroup
      data-phone-input
      size={size}
      colorScheme={withLabel ? undefined : colorScheme}
      block={block || (withLabel && labelPlacement === "left")}
      style={withLabel ? undefined : style}
      className={tw(
        labelPlacement === "left" && withLabel && "flex-1",
        !withLabel && className,
      )}
    >
      <Select
        value={country.code}
        onValueChange={handleCountry}
        disabled={disabled}
      >
        <SelectTrigger variant={variant} aria-label={countryLabel}>
          {/* The trigger shows just the calling code; the list shows names too. */}
          <SelectValue>{country.dialCode}</SelectValue>
        </SelectTrigger>
        <SelectContent colorScheme={colorScheme}>
          {countries.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.name} ({c.dialCode})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputField
        {...props}
        id={inputId}
        type="tel"
        inputMode="tel"
        // Phone numbers read left to right, even on right-to-left pages.
        dir="ltr"
        autoComplete="tel-national"
        variant={variant}
        disabled={disabled}
        required={required}
        value={display}
        onChange={handleInput}
      />
    </InputGroup>
  );

  // Forms submit the unformatted E.164 number. Kept out of the group so the
  // field stays its last child (and keeps its rounded end).
  const hidden = name && <input type="hidden" name={name} value={e164} />;

  if (!withLabel) {
    return (
      <>
        {group}
        {hidden}
      </>
    );
  }

  return (
    <div
      data-phone-input-field
      data-label-placement={labelPlacement}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "group/field inline-flex gap-(--_label-gap)",
        labelPlacement === "left" ? "items-center" : "flex-col",
        block && "flex w-full",
        className,
      )}
    >
      <Label
        htmlFor={inputId}
        size={size}
        className={tw(
          "cursor-pointer group-has-disabled/field:cursor-not-allowed group-has-disabled/field:opacity-50",
          labelPlacement === "left" && "w-(--_label-width) shrink-0",
        )}
      >
        {label}
        {required && (
          <span aria-hidden className="ms-0.5 text-(--_required)">
            *
          </span>
        )}
      </Label>
      {group}
      {hidden}
    </div>
  );
}
