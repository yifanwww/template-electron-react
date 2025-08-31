export type StandardSuccessResp<T> = undefined extends T
    ? {
          status: 'success';
          data?: T;
      }
    : {
          status: 'success';
          data: T;
      };

export type StandardErrorResp<T = undefined> = undefined extends T
    ? {
          status: 'error';
          /**
           * The short description of the API error.
           */
          message: string;
          /**
           * The error detail.
           */
          error?: T;
      }
    : {
          status: 'error';
          /**
           * The short description of the API error.
           */
          message: string;
          /**
           * The error detail.
           */
          error: T;
      };

export type StandardResp<Data, Err = undefined> = StandardSuccessResp<Data> | StandardErrorResp<Err>;
