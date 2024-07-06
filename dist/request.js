import Config from './config';
import ConfigRequest from './instance';
export const StagingRequest = new ConfigRequest(Config.STAGING_URL_ROOT);
export default new ConfigRequest(Config.COMMA_URL_ROOT);
