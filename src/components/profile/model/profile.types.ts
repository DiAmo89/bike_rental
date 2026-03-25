import type { UpdateProfileFieldErrors } from "./updateProfile.schema";

export type UpdateProfileValues = {
  avatar: string;
  avatarKey: string;
  full_name: string;
  telephone: string;
};

export type UpdateProfileState = {
  success: boolean;
  successMessage: string;
  timestamp: number;
  fieldErrors: UpdateProfileFieldErrors;
  values: UpdateProfileValues;
};