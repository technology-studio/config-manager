declare module "@txo/config-manager" {
    declare class ConfigManager<CONFIG extends Object> {
        constructor (config: CONFIG);
        update (config: Partial<CONFIG>)
        subscribe (onChange: (config: CONFIG) => void);
        unsubscribe (onChange: (config: CONFIG) => void);
    };
}
