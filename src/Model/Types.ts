/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-04-05T14:04:54+02:00
 * @Copyright: Technology Studio
**/

export type OnChange<CONFIG> = (config: CONFIG) => void

export type ConfigValue<VALUE> = (() => VALUE) | VALUE
