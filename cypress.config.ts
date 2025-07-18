import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "1ndmxw",
    e2e: {
        baseUrl: 'https://staging.syllable.cloud',
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 120000,
        screenshotOnRunFailure: true,
        experimentalOriginDependencies: true,
        setupNodeEvents(on, config) {
            on('task', {
            log(message) {
                console.log(message)
                return null
            },
            })    
        },
    },
});