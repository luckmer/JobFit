import type {
  NewModelPayload,
  OpencodeActiveModelResponse,
  OpencodeModelsResponse,
} from "@interfaces/opencode/types";
import { getApi } from "@libs/ApiService";
import { ENDPOINTS } from "@static/endpoints";

export const getModelsApi = async (): Promise<
  OpencodeModelsResponse[] | undefined
> => {
  const api = getApi();

  try {
    return await api.get<OpencodeModelsResponse[]>(ENDPOINTS.OPENCODE_MODELS);
  } catch (err) {
    console.error(err);
  }
};

export const getActiveModelApi =
  async (): Promise<OpencodeActiveModelResponse> => {
    const api = getApi();

    try {
      return await api.get<OpencodeActiveModelResponse>(
        ENDPOINTS.OPENCODE_ACTIVE_MODEL,
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

export const setModelApi = async (
  payload: NewModelPayload,
): Promise<OpencodeActiveModelResponse> => {
  const api = getApi();

  try {
    return await api.post<OpencodeActiveModelResponse>(
      ENDPOINTS.OPENCODE_SET_MODEL,
      payload,
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
