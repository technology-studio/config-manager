/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-04-05T18:04:29+02:00
 * @Copyright: Technology Studio
**/

import { ConfigManager } from '../../src'

type Test = {
  a: string,
  b: number,
  c: boolean,
}

const INITIAL_VALUES = { a: 'string', b: 1 }

test('should have the same initialized keys', () => {
  const configManager = new ConfigManager<Test>(INITIAL_VALUES)

  expect(Object.keys(configManager.config)).toEqual(Object.keys(INITIAL_VALUES))
})

test('should have the same initialized keys after update', () => {
  const configManager = new ConfigManager<Test>(INITIAL_VALUES)
  configManager.update({ c: true })
  expect(Object.keys(configManager.config)).toEqual(['a', 'b', 'c'])
})

test('should have the same initialized values', () => {
  const configManager = new ConfigManager<Test>(INITIAL_VALUES)

  expect(configManager.config.a).toEqual(INITIAL_VALUES.a)
  expect(configManager.config.b).toEqual(INITIAL_VALUES.b)
})

test('should have the same initialized values after update', () => {
  const configManager = new ConfigManager<Test>(INITIAL_VALUES)
  configManager.update({ c: true })
  expect(configManager.config.a).toEqual(INITIAL_VALUES.a)
  expect(configManager.config.b).toEqual(INITIAL_VALUES.b)
  expect(configManager.config.c).toEqual(true)
})

test('should throw error for not initialized value', () => {
  const configManager = new ConfigManager<Test>(INITIAL_VALUES)
  expect(() => configManager.config.c).toThrow('config attribute c has not been initialized')
})

test('should lazily evaluate init value function', () => {
  const configManager = new ConfigManager<Test>({ a: () => 'lazy' })
  expect(configManager.config.a).toEqual('lazy')
})

test('should lazily evaluate update value function', () => {
  const configManager = new ConfigManager<Test>(INITIAL_VALUES)
  configManager.update({ a: () => 'lazy' })
  expect(configManager.config.a).toEqual('lazy')
})
