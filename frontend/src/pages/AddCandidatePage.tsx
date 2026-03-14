import React, { ChangeEvent, FormEvent, useState } from "react";
import { Candidate } from "../types/Candidate";
import { createCandidate } from "../services/candidateService";

const initialForm: Candidate = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  education: "",
  experience: "",
  cv: null,
};

function AddCandidatePage() {
  const [formData, setFormData] = useState<Candidate>(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setFormData((prev) => ({
        ...prev,
        cv: null,
      }));
      return;
    }

    const allowedExtensions = ["pdf", "docx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setError("Only PDF and DOCX files are allowed");
      setFormData((prev) => ({
        ...prev,
        cv: null,
      }));
      event.target.value = "";
      return;
    }

    setError("");
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("First name, last name and email are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await createCandidate(formData);
      setMessage(response.message || "Candidate created successfully");
      setFormData(initialForm);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Recruiter Dashboard</h1>
        <button type="button" style={styles.primaryButton}>
          Add Candidate
        </button>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label htmlFor="firstName">First name *</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="lastName">Last name *</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              name="education"
              value={formData.education || ""}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="experience">Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience || ""}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="cv">CV (PDF or DOCX)</label>
            <input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
          </div>

          {message && <p style={styles.successMessage}>{message}</p>}
          {error && <p style={styles.errorMessage}>{error}</p>}

          <button
            type="submit"
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Candidate"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    padding: "32px",
  },
  title: {
    marginTop: 0,
    marginBottom: "16px",
    color: "#1f2937",
  },
  primaryButton: {
    marginBottom: "24px",
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
  form: {
    display: "grid",
    gap: "16px",
  },
  fieldGroup: {
    display: "grid",
    gap: "8px",
    textAlign: "left",
  },
  submitButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
  successMessage: {
    color: "#166534",
    backgroundColor: "#dcfce7",
    padding: "12px",
    borderRadius: "8px",
  },
  errorMessage: {
    color: "#991b1b",
    backgroundColor: "#fee2e2",
    padding: "12px",
    borderRadius: "8px",
  },
};

export default AddCandidatePage;
