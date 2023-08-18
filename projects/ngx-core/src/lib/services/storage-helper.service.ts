export class StorageHelper {
  private static cookieStore: any = {};

  /**
   * Set cookie
   * @param key Key name of cookie
   * @param value Value string for cookie
   * @param domain Domain to apply
   * @param expires Expires time: Date string format
   * @param maxAge Others way to set expires and cookie will be deleted
   */
  public static set(
    key: string,
    value: string,
    domain?: string,
    path?: string,
    expires?: string,
    maxAge?: number
  ) {
    // eslint-disable-next-line max-len
    const _cookieStr = `${key}=${value || ''}${
      domain ? ';domain=' + domain : ''
    }${expires ? ';max-age=' + expires : ''}${
      maxAge ? ';max-age=' + maxAge : ''
    }${path ? ';path=' + path : ';path=/;'}`;
    document.cookie = _cookieStr;
  }

  public static get(key: string) {
    StorageHelper.parseCookies();
    return !!StorageHelper.cookieStore[key]
      ? StorageHelper.cookieStore[key]
      : null;
  }

  public static parseCookies(cookies = document.cookie) {
    StorageHelper.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      StorageHelper.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  public static remove(key: string) {
    document.cookie = `${key}=;;domain=${'localhost'};expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  public static getCurrentLang = (): string => {
    return StorageHelper.get('lang') || 'vi';
  };

  public static clearAll() {
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
      const index = cookie.indexOf('=');

      const name = ~index ? cookie.substr(0, index) : cookie;

      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }
}
