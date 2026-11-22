export type OpencodeCapabilities = {
  tools: boolean;
  image_input: boolean;
  realtime: boolean;
};

export type OpencodeLimits = {
  context: number;
  output: number;
};

export type OpencodeModelsResponse = {
  id: string;
  name: string;
  provider_id: string;
  factory?: string;
  capabilities: OpencodeCapabilities;
  limits: OpencodeLimits;
  reasoning_efforts: string[];
  free: boolean;
  released_at: number;
};

export type OpencodeActiveModelResponse = {
  provider_id: string;
  model_id: string;
};

export type NewModelPayload = {
  id: string;
  provider_id: string;
};
