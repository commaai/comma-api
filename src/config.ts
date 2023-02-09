interface CommaApiConfig {
  COMMA_API_URL: string
  ATHENA_API_URL: string
  BILLING_API_URL: string
}

declare global {
  interface Window {
    Comma?: CommaApiConfig
  }
}

const config = {
  COMMA_API_URL: typeof window !== 'undefined' && window.Comma?.COMMA_API_URL || 'https://api.comma.ai/',
  ATHENA_API_URL: typeof window !== 'undefined' && window.Comma?.ATHENA_API_URL || 'https://athena.comma.ai/',
  BILLING_API_URL: typeof window !== 'undefined' && window.Comma?.BILLING_API_URL || 'https://billing.comma.ai/',
}

export default config
