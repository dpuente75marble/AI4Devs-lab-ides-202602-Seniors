export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
  cv?: File | null;
}
