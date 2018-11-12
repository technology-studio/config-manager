/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-11-09T16:03:16+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

'use strict'; // eslint-disable-line

export class ConfigManager<CONFIG: Object> {
  config: CONFIG

  constructor (config: CONFIG) {
    this.config = config
  }

  update (config: $Shape<CONFIG>) {
    this.config = {
      ...this.config,
      ...config,
    }
  }
}
