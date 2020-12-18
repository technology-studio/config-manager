/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T00:56:40+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { ConfigManager } from '@txo/config-manager'

test('shoud pass', () => {
  expect(true).toBe(true)
})

type Config = {
  notTouchedValue: number,
  toBeTouchedValue: number,
  newValue?: number,
}

const INITIAL_CONFIG = {
  notTouchedValue: 123,
  toBeTouchedValue: 234,
}

const NEW_VALUE_CONFIG = {
  newValue: 456,
}
const WITH_NEW_VALUE_CONFIG = {
  ...INITIAL_CONFIG,
  ...NEW_VALUE_CONFIG,
}

const MERGE_CONFIG = {
  toBeTouchedValue: 890,
}
const MERGED_CONFIG = {
  ...INITIAL_CONFIG,
  ...MERGE_CONFIG,
}

describe('ConfigManager basic tests', () => {
  var configManager

  beforeEach(() => {
    configManager = new ConfigManager<Config>(INITIAL_CONFIG)
  })

  test('should contain the same reference when same configuration is updated', () => {
    configManager.update(INITIAL_CONFIG)
    expect(configManager.config).toBe(INITIAL_CONFIG)
  })

  test('should merge with new value', () => {
    configManager.update(NEW_VALUE_CONFIG)
    expect(configManager.config).toStrictEqual(WITH_NEW_VALUE_CONFIG)
  })

  test('should merge with override', () => {
    configManager.update(MERGE_CONFIG)
    expect(configManager.config).toStrictEqual(MERGED_CONFIG)
  })

  test('should not call onChange', () => {
    const onChange = jest.fn()
    configManager.subscribe(onChange)
    configManager.update(INITIAL_CONFIG)
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('should call onChange', () => {
    const onChange = jest.fn()
    configManager.subscribe(onChange)
    configManager.update(NEW_VALUE_CONFIG)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
