import React, { ChangeEvent, FormEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Candidate } from "../types/Candidate";
import { createCandidate } from "../services/candidateService";
import { FormInput } from "../components/form/FormInput";
import { FormTextarea } from "../components/form/FormTextarea";
import { FileUploadField } from "../components/form/FileUploadField";

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
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f5f3f0" }}>
      <div className="container-lg">
        <div className="row g-4 align-items-center">
          {/* Left Column: Recruiter Information */}
          <div className="col-lg-5 col-12">
            <div className="pe-lg-4">
              <h1
                className="display-5 fw-bold mb-3"
                style={{ color: "#1a202c" }}
              >
                Manage Your Talent Pipeline
              </h1>
              <h3 className="h5 fw-semibold mb-3" style={{ color: "#1a202c" }}>
                Add a New Candidate
              </h3>
              <p className="lead mb-5" style={{ color: "#4b5563" }}>
                Add candidate information to your recruitment system to start
                tracking their progress in the hiring pipeline. Keep your talent
                database organized and accessible for your team.
              </p>

              {/* Contact Details */}
              <div className="d-flex align-items-center mb-3">
                <i
                  className="bi bi-telephone me-3"
                  style={{ fontSize: "1.25rem", color: "#d97706" }}
                >
                  📞
                </i>
                <span style={{ color: "#4b5563" }}>+1(555) 123-4567</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <i
                  className="bi bi-geo-alt me-3"
                  style={{ fontSize: "1.25rem", color: "#d97706" }}
                >
                  📍
                </i>
                <span style={{ color: "#4b5563" }}>San Francisco, CA</span>
              </div>

              <div className="d-flex align-items-center">
                <i
                  className="bi bi-envelope me-3"
                  style={{ fontSize: "1.25rem", color: "#d97706" }}
                >
                  📧
                </i>
                <span style={{ color: "#4b5563" }}>
                  hello@digitalolagency.com
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="col-lg-7 col-12">
            <div
              className="card border-0 shadow-lg"
              style={{
                backgroundColor: "#fed966",
                borderRadius: "2rem",
              }}
            >
              <div className="card-body p-5">
                <h2 className="h4 fw-bold mb-4" style={{ color: "#1a202c" }}>
                  Your Details
                </h2>

                <form onSubmit={handleSubmit}>
                  <FormInput
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />

                  <FormInput
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />

                  <FormInput
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />

                  <FormInput
                    id="phone"
                    name="phone"
                    label="Phone"
                    type="text"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />

                  <FormInput
                    id="address"
                    name="address"
                    label="Address"
                    type="text"
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Your address"
                  />

                  <FormTextarea
                    id="education"
                    name="education"
                    label="Education"
                    value={formData.education || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your educational background"
                  />

                  <FormTextarea
                    id="experience"
                    name="experience"
                    label="Experience"
                    value={formData.experience || ""}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your professional experience"
                  />

                  <FileUploadField
                    id="cv"
                    name="cv"
                    label="CV (PDF or DOCX)"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />

                  {/* Alert Messages */}
                  {message && (
                    <div
                      className="alert alert-success alert-dismissible fade show mb-4"
                      role="alert"
                    >
                      {message}
                    </div>
                  )}
                  {error && (
                    <div
                      className="alert alert-danger alert-dismissible fade show mb-4"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-lg w-100"
                    style={{
                      backgroundColor: "#2c3e50",
                      color: "#ffffff",
                      borderRadius: "50px",
                      fontWeight: 600,
                      padding: "12px 24px",
                      border: "none",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCandidatePage;
