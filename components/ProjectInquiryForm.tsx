"use client";

import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { budgetOptions, projectTypeOptions } from "@/data/portfolio";

const monthlySupportOptions = ["Yes", "No", "Not sure yet"] as const;

export function ProjectInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [resetKey, setResetKey] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = buildPayload(formData);
    const phoneDigitCount = phoneDigits(payload.phone).length;

    if (phoneDigitCount !== 10) {
      setStatus("error");
      setMessage("Please enter a 10-digit phone number.");
      return;
    }

    if (!payload.projectType || !payload.budgetRange || !payload.monthlySupport) {
      setStatus("error");
      setMessage("Please choose an option for each dropdown.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await readInquiryResponse(response);
        setStatus("success");
        setMessage(data.message ?? "Thanks. Your project inquiry was received.");
        form.reset();
        setPhoneValue("");
        setResetKey((current) => current + 1);
        return;
      }

      const data = await readInquiryResponse(response);
      setStatus("error");
      setMessage(data.message ?? "The inquiry could not be submitted. Please try again.");
    } catch {
      setStatus("error");
      setMessage("The inquiry could not be submitted. Please try again.");
    }
  }

  return (
    <form
      id="inquiry"
      action="/api/project-inquiry"
      method="post"
      onSubmit={handleSubmit}
      className="inquiry-form section-anchor"
    >
      <div className="inquiry-form-grid">
        <FormField label="Name" name="name" autoComplete="name" required />
        <FormField label="Email" name="email" type="email" autoComplete="email" required />
        <PhoneField value={phoneValue} onChange={setPhoneValue} />
        <FormField label="Business name" name="business" autoComplete="organization" />
        <FormField label="Website URL (optional)" name="website" autoComplete="url" />
        <SelectField
          key={`project-type-${resetKey}`}
          label="Project type"
          name="project_type"
          options={projectTypeOptions}
        />
        <SelectField
          key={`budget-range-${resetKey}`}
          label="Budget range"
          name="budget_range"
          options={budgetOptions}
        />
        <SelectField
          key={`monthly-support-${resetKey}`}
          label="Ongoing monthly support"
          name="monthly_support"
          options={monthlySupportOptions}
        />
      </div>

      <div className="form-field">
        <label htmlFor="inquiry-project-details">What do you need help with?</label>
        <textarea id="inquiry-project-details" name="project_details" rows={6} required />
      </div>

      <button type="submit" className="primary-button w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending inquiry" : "Send project inquiry"}
        <IconArrowUpRight size={17} stroke={1.8} aria-hidden="true" />
      </button>

      <div className={`form-status ${status === "error" ? "is-error" : ""}`} aria-live="polite">
        {message}
      </div>
    </form>
  );
}

function buildPayload(formData: FormData) {
  return {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    business: field(formData, "business"),
    website: field(formData, "website"),
    projectType: field(formData, "project_type"),
    budgetRange: field(formData, "budget_range"),
    monthlySupport: field(formData, "monthly_support"),
    projectDetails: field(formData, "project_details"),
  };
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

async function readInquiryResponse(response: Response): Promise<{ ok?: boolean; message?: string }> {
  try {
    return (await response.json()) as { ok?: boolean; message?: string };
  } catch {
    return {};
  }
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhoneInput(value: string) {
  const digits = phoneDigits(value).slice(0, 16);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function FormField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const fieldId = `inquiry-${name}`;

  return (
    <div className="form-field">
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}

function PhoneField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const digitCount = phoneDigits(value).length;
  const isTooLong = digitCount > 10;

  return (
    <div className="form-field">
      <label htmlFor="inquiry-phone">Phone</label>
      <input
        id="inquiry-phone"
        name="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        required
        value={value}
        placeholder="000-000-0000"
        className={isTooLong ? "is-invalid" : ""}
        aria-invalid={isTooLong}
        aria-describedby="inquiry-phone-hint"
        onChange={(event) => onChange(formatPhoneInput(event.currentTarget.value))}
      />
      <p id="inquiry-phone-hint" className={`field-hint ${isTooLong ? "is-danger" : ""}`}>
        {isTooLong ? "Use 10 numbers only." : "Numbers are formatted automatically."}
      </p>
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  const fieldId = `inquiry-${name}`;
  const listboxId = `${fieldId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = selectedOption ? options.indexOf(selectedOption) : -1;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function openMenu() {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  }

  function toggleMenu() {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    openMenu();
  }

  function chooseOption(option: string) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  function handleSelectKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!isOpen) {
        openMenu();
        return;
      }

      setActiveIndex((current) => (current + 1) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!isOpen) {
        openMenu();
        return;
      }

      setActiveIndex((current) => (current - 1 + options.length) % options.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      setIsOpen(true);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      setIsOpen(true);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isOpen) {
        openMenu();
        return;
      }

      chooseOption(options[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="form-field" ref={rootRef}>
      <label htmlFor={fieldId}>{label}</label>
      <div className="custom-select">
        <input type="hidden" name={name} value={selectedOption} />
        <button
          id={fieldId}
          type="button"
          className={`custom-select-trigger ${selectedOption ? "" : "is-placeholder"}`}
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-activedescendant={isOpen ? `${listboxId}-option-${activeIndex}` : undefined}
          aria-required="true"
          onClick={toggleMenu}
          onKeyDown={handleSelectKeyDown}
        >
          <span>{selectedOption || "Select one"}</span>
          <span className="custom-select-chevron" aria-hidden="true" />
        </button>

        {isOpen ? (
          <div id={listboxId} className="custom-select-menu" role="listbox">
            {options.map((option, index) => (
              <button
                key={option}
                id={`${listboxId}-option-${index}`}
                type="button"
                className={`custom-select-option ${
                  index === activeIndex ? "is-active" : ""
                } ${option === selectedOption ? "is-selected" : ""}`}
                role="option"
                aria-selected={option === selectedOption}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
