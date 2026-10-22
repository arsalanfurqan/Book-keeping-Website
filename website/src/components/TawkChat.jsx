import { useEffect } from "react";
import { chat, chatEnabled } from "../../shared/chat.mjs";

export default function TawkChat() {
  useEffect(() => {
    if (!chatEnabled() || document.getElementById("ledgerlyapps-chat")) return;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const script = document.createElement("script");
    script.id = "ledgerlyapps-chat";
    script.async = true;
    script.src = `https://embed.tawk.to/${chat.propertyId}/${chat.widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);
  }, []);
  return null;
}
