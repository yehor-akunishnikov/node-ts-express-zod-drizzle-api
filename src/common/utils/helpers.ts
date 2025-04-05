import {LQResult, LQSuccess, LQFailure} from "@common/types/utils";

export const resSuccess = <T>(data: T): LQSuccess<T> => ({
  data,
  error: null,
  success: true
});

export const resFailure = <E>(error: E): LQFailure<E> => ({
  data: null,
  error,
  success: false
});

export const tryCatch = async <E = Error, T = null>(
  promise: Promise<T>
): Promise<LQResult<E, T>> => {
  try {
    const data = await promise;

    return resSuccess(data);
  } catch (error) {
    return resFailure(error as E);
  }
};
