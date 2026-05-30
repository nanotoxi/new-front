export interface LoginCredentials {

  email: string;

  password: string;
}

/* REAL BACKEND LOGIN RESPONSE */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

/* SIGNUP */
export interface SignupPayload {

  email: string;

  name: string;

  password: string;
}

export interface SignupResponse {

  id: string;

  email: string;

  name: string;

  role: string;

  is_email_verified: boolean;

  created_at: string;
}

/* PREDICTION INPUT */
/* TEMPORARY until senior gives actual predict schema */
export interface PredictionInput {

  nanoparticle_name: string;

  np_type: string;

  primary_size_nm: number;

  hydrodynamic_size_nm: number;

  zeta_potential_mv: number;

  morphology: string;

  cell_type: string;

  dose_max_ugml: number;

  dose_min_ugml: number;

  exposure_time_h: number;

  ph: number;

  temperature_c: number;

  is_coated: boolean;

  is_therapeutic: boolean;

  include_shap: boolean;

  include_rag: boolean;
}

export interface PredictionResponse {

  toxicity_label: string;

  confidence: number;

  risk_level?: string;

  shap_explanation?: string;
}

/* HEALTH */
export interface HealthResponse {

  status: string;
}