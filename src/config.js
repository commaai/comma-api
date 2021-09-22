export let COMMA_URL_ROOT = 'https://api.comma.ai/';
if (typeof window !== 'undefined' && window.COMMA_URL_ROOT) {
  COMMA_URL_ROOT = window.COMMA_URL_ROOT;
}

export let ATHENA_URL_ROOT = 'https://athena.comma.ai/';
if (typeof window !== 'undefined' && window.ATHENA_URL_ROOT) {
  ATHENA_URL_ROOT = window.ATHENA_URL_ROOT;
}

export let BILLING_URL_ROOT = 'https://billing.comma.ai/';
if (typeof window !== 'undefined' && window.BILLING_URL_ROOT) {
  BILLING_URL_ROOT = window.BILLING_URL_ROOT;
}

export let VIDEO_HOST = 'https://my-comma-video.azureedge.net';
if (typeof window !== 'undefined' && window.VIDEO_HOST) {
  VIDEO_HOST = window.VIDEO_HOST;
}
