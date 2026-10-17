import { services } from "../../shared/content.mjs";
const fields = {
  name: 100,
  email: 254,
  organization: 160,
  phone: 40,
  country: 100,
  service: 80,
  message: 3000,
  employeeCountRange: 20,
  payFrequency: 20,
  website: 200,
  requestId: 80,
};
export function validate(input) {
  const errors = {},
    value = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { form: "Please enter your enquiry details." } };
  for (const key of Object.keys(input))
    if (!(key in fields) && key !== "consent")
      errors.form = "The form includes an unsupported field.";
  for (const [key, max] of Object.entries(fields)) {
    if (input[key] !== undefined && typeof input[key] !== "string")
      errors[key] = "Enter a valid value.";
    value[key] = typeof input[key] === "string" ? input[key].trim() : "";
    if (value[key].length > max)
      errors[key] = `Use ${max} characters or fewer.`;
  }
  if (!value.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    errors.email = "Enter a valid email address.";
  if (![...services.map((s) => s.slug), "not-sure"].includes(value.service))
    errors.service = "Choose a service.";
  if (value.message.length < 10)
    errors.message = "Tell us a little more (at least 10 characters).";
  if (input.consent !== true)
    errors.consent = "Please agree to being contacted about your enquiry.";
  if (
    value.employeeCountRange &&
    !["1-10", "11-50", "51-200", "201+"].includes(value.employeeCountRange)
  )
    errors.employeeCountRange = "Choose a listed range.";
  if (
    value.payFrequency &&
    !["weekly", "biweekly", "monthly", "other"].includes(value.payFrequency)
  )
    errors.payFrequency = "Choose a listed frequency.";
  if (!/^[a-zA-Z0-9-]{10,80}$/.test(value.requestId))
    errors.form = "Refresh this page and try again.";
  if (value.website) errors.form = "Unable to accept this enquiry.";
  value.consent = input.consent === true;
  return { errors, value };
}
