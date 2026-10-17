import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { services } from "../../shared/content.mjs";
export default function useConsultationForm() {
  const [params] = useSearchParams(),
    navigate = useNavigate(),
    id = useRef(crypto.randomUUID()),
    errorRef = useRef();
  const initial = params.get("service");
  const [form, setForm] = useState({
      name: "",
      email: "",
      organization: "",
      phone: "",
      country: "",
      service: services.some((s) => s.slug === initial) ? initial : "",
      message: "",
      employeeCountRange: "",
      payFrequency: "",
      consent: false,
      website: "",
    }),
    [errors, setErrors] = useState({}),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((old) => ({ ...old, [name]: undefined }));
  }
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setErrors({});
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, requestId: id.current }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.fieldErrors || {});
        throw Error(
          data.error || "We could not send your enquiry. Please try again.",
        );
      }
      navigate("/thank-you", {
        state: { reference: data.reference },
        replace: true,
      });
    } catch (e) {
      setError(
        e.message === "Failed to fetch"
          ? "We couldn’t reach the server. Your details are still here. Please try again."
          : e.message,
      );
      requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      setBusy(false);
    }
  }

  return { form, errors, busy, error, errorRef, update, submit };
}
