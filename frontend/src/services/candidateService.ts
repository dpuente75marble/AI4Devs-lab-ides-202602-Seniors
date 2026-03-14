import { Candidate } from "../types/Candidate";

const API_URL = "http://localhost:3010/candidates";

export const createCandidate = async (candidate: Candidate) => {
  const formData = new FormData();

  formData.append("firstName", candidate.firstName);
  formData.append("lastName", candidate.lastName);
  formData.append("email", candidate.email);

  if (candidate.phone) formData.append("phone", candidate.phone);
  if (candidate.address) formData.append("address", candidate.address);
  if (candidate.education) formData.append("education", candidate.education);
  if (candidate.experience) formData.append("experience", candidate.experience);

  if (candidate.cv) {
    formData.append("cv", candidate.cv);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
