export interface BtcFsResult {
  content: string;
  content_type: string;
}

export type BtcFsURI = `btcfs://${string}`;

export type QueryBtcFsFn = (uri: BtcFsURI) => Promise<BtcFsResult>;

export class Config {
  private _dobDecodeServerURL: string = "https://dob-decoder.rgbpp.io";
  private _queryBtcFsFn: QueryBtcFsFn = async (uri) => {
    return fetch(`https://api.joy.id/api/v1/wallet/dob_imgs?uri=${uri}`).then(
      (res) => res.json(),
    );
  };

  get dobDecodeServerURL() {
    return this._dobDecodeServerURL;
  }

  setDobDecodeServerURL(dobDecodeServerURL: string) {
    this._dobDecodeServerURL = dobDecodeServerURL;
  }

  setQueryBtcFsFn(fn: QueryBtcFsFn) {
    this._queryBtcFsFn = fn;
  }

  get queryBtcFsFn() {
    return this._queryBtcFsFn;
  }
}

export const config = new Config();
