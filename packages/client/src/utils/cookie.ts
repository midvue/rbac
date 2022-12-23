export function setCookie(name: string, value: string, days = 30) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  const hostname = location.hostname;
  const hostArr = hostname.split(".");
  if (hostArr.length === 1) {
    document.cookie = name + "=" + value + expires + "; path=/";
  } else {
    let domain = hostname;
    if (!hostArr.includes("192")) {
      const length = hostArr.length;
      domain = "." + hostArr[length - 2] + "." + hostArr[length - 1];
    }
    document.cookie =
      name + "=" + value + expires + "; path=/; domain=" + domain;
  }
}

export function getCookie(name = "tz_token") {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);
  if (arr) return decodeURIComponent(arr[2]);
  else return null;
}

export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}
