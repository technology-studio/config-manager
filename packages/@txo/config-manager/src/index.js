/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-11-09T16:03:16+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import update from 'immutability-helper'

type OnChange<CONFIG> = (config: CONFIG) => void

export class ConfigManager<CONFIG: Object> {
  config: CONFIG
  subscriptionSet: Set<OnChange<CONFIG>>

  constructor (config: CONFIG) {
    this.config = config
    this.subscriptionSet = new Set()
  }

  update (config: $Shape<CONFIG>) {
    const nextConfig = update(this.config, { $merge: config })
    if (this.config !== nextConfig) {
      this.config = nextConfig
      this.subscriptionSet.forEach(onChange => onChange(this.config))
    }
  }

  subscribe (onChange: (config: CONFIG) => void): () => void {
    this.subscriptionSet.add(onChange)
    return () => this.unsubscribe(onChange)
  }

  unsubscribe (onChange: (config: CONFIG) => void) {
    this.subscriptionSet.delete(onChange)
  }
}
