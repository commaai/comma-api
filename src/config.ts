interface CommaApiConfig {
  COMMA_API_URL: string
  ATHENA_API_URL: string
  BILLING_API_URL: string
}

declare global {
  interface Window {
    Comma: CommaApiConfig
  }
}

export default {
  COMMA_API_URL: window?.Comma.COMMA_API_URL || 'https://api.comma.ai/',
  ATHENA_API_URL: window?.Comma.ATHENA_API_URL || 'https://athena.comma.ai/',
  BILLING_API_URL: window?.Comma.BILLING_API_URL || 'https://billing.comma.ai/',
}
