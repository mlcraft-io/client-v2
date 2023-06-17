import { message } from "antd";
import { useDeepCompareEffect } from "ahooks";

import type { MutationResult, QueryResult } from "@apollo/client";

const noop = () => {};
const DEFAULT_SUCCESS = "Succefully finished";
const DEFAULT_FAILURE = "Something went wrong";

type Meta = {
  successMessage?: string;
  errorMessage?: string;
};

type Callback = (data: any, error?: any) => void;

const useCheckResponse = (
  response: MutationResult | QueryResult,
  cb: Callback = noop,
  meta: Meta = {}
) => {
  const history: string[] = [];
  // const history = useHistory();

  const { successMessage = DEFAULT_SUCCESS, errorMessage = DEFAULT_FAILURE } =
    meta;

  useDeepCompareEffect(() => {
    if (response.data) {
      if (successMessage) {
        message.success(successMessage);
      }

      cb(response.data);
      response.data = undefined;
    }
  }, [cb, response.data, successMessage]);

  useDeepCompareEffect(() => {
    if (response.error) {
      const responseMessage = response.error?.message;

      if (responseMessage?.includes("JWSInvalidSignature")) {
        history.push("/403");
      }

      message.error(responseMessage || errorMessage);
      cb(null, response.error);

      response.error = undefined;
    }
  }, [cb, errorMessage, response.error, history]);
};

export default useCheckResponse;
