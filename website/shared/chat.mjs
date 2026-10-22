// Public widget identifiers, not passwords. Add the IDs from Tawk.to's Chat Widget settings.
export const chat = { propertyId: "", widgetId: "" };
export function chatEnabled(config = chat) {
  return (
    /^[a-f0-9]{24}$/i.test(config.propertyId) &&
    /^[a-z0-9]+$/i.test(config.widgetId)
  );
}
