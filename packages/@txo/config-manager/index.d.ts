declare module "@txo/config-manager" {
    class ConfigManager<CONFIG extends Object> {
        config: CONFIG
        constructor (config: CONFIG);
        update (config: Partial<CONFIG>): void;
        subscribe (onChange: (config: CONFIG) => void): void;
        unsubscribe (onChange: (config: CONFIG) => void): void;
    }
}
