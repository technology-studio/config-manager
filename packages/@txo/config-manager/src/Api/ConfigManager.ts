/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-04-05T14:04:71+02:00
 * @Copyright: Technology Studio
**/

import type { OnChange, ConfigValue } from '../Model/Types'
import { shallowEqualObjects } from './ShallowEqualObjects'

function isValueFunction<VALUE> (value: ConfigValue<VALUE>): value is () => VALUE {
  return typeof value === 'function'
}

const evaluate = <VALUE>(value: ConfigValue<VALUE>): VALUE => (
  isValueFunction(value) ? value() : value
)

type InternalConfig<CONFIG> = Partial<Record<keyof CONFIG, ConfigValue<CONFIG[keyof CONFIG]>>>

export class ConfigManager<CONFIG extends Record<string, unknown>> {
  _internalConfig: InternalConfig<CONFIG>
  config: CONFIG
  subscriptionSet: Set<OnChange<CONFIG>>

  constructor (internalConfig: InternalConfig<CONFIG>) {
    this._internalConfig = internalConfig
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const manager = this
    const handlers = {
      has: (target: CONFIG, key: string) => {
        // log.debug('has', { typeof: typeof columnKey, columnKey })

        return key in manager._internalConfig
      },
      ownKeys: (target: CONFIG) => {
        return Reflect.ownKeys(manager._internalConfig)
      },
      getOwnPropertyDescriptor (target: CONFIG, key: string) {
        // log.debug('getOwnPropertyDescriptor', { typeof: typeof columnKey, columnKey })
        return {
          writable: false,
          enumerable: true,
          configurable: true,
          value: this.get(target, key),
        }
      },
      get: (target: CONFIG, key: keyof CONFIG) => {
        // log.debug('get', { typeof: typeof columnKey, columnKey })
        if (key in manager._internalConfig) {
          return evaluate(manager._internalConfig[key])
        }
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`config attribute ${key} has not been initialized`)
      },
      set: (target: CONFIG, key: keyof CONFIG, value: CONFIG[typeof key]) => {
        // log.debug('set', { changesTable, initialTable })

        return false
      },
    }

    this.config = new Proxy<CONFIG>(
      // @ts-expect-error NOTE: intentionally return this structure
      { 'use JSON.stringify instead': true },
      handlers,
    )

    this.subscriptionSet = new Set()
  }

  update (internalConfig: InternalConfig<CONFIG>): void {
    const nextInternalConfig = {
      ...this._internalConfig,
      ...internalConfig,
    }
    if (!shallowEqualObjects(this._internalConfig, nextInternalConfig)) {
      this._internalConfig = nextInternalConfig
      this.subscriptionSet.forEach(onChange => onChange(this.config))
    }
  }

  subscribe (onChange: (config: CONFIG) => void): () => void {
    this.subscriptionSet.add(onChange)
    return () => this.unsubscribe(onChange)
  }

  unsubscribe (onChange: (config: CONFIG) => void): void {
    this.subscriptionSet.delete(onChange)
  }
}
