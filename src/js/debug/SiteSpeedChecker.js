class SiteSpeedChecker {
    getAll() {
        this.getUseTiming();
        this.getNavigationTiming();
        this.getResourceTiming();
        this.getPaintTiming();
        this.getServerTiming();
    }
    getUseTiming() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', location.pathname, true);
        xhr.onload = () => {
            performance.mark('mark-xhr-end');
            performance.measure('xhr-start-end', 'mark-xhr-start', 'mark-xhr-end');
            console.log('%cUser Timing', 'font-weight: bold; color: tomato');
            console.log(performance.getEntriesByType('mark'));
            console.log(performance.getEntriesByType('measure'));
        }
        performance.mark('mark-xhr-start');
        xhr.send();
    }
    getNavigationTiming() {
        const timing = performance.timing;
        console.log('%cNavigation Timing', 'font-weight: bold; color: tomato');
        console.table(
            `Unload: ${timing.unloadEventEnd - timing.unloadEventStart}\n`,
            `Redirect: ${timing.redirectEnd - timing.redirectStart}\n`,
            `App Cache: ${timing.domainLookupStart - timing.fetchStart}\n`,
            `DNS: ${timing.domainLookupEnd - timing.domainLookupStart}\n`,
            `TCP: ${timing.connectEnd - timing.connectStart}\n`,
            `Request: ${timing.responseStart - timing.requestStart}\n`,
            `Response: ${timing.responseEnd - timing.responseStart}\n`,
            `Processing: ${timing.domComplete - timing.domLoading}\n`,
            `Onload: ${timing.loadEventEnd - timing.loadEventStart}\n`
        );
    }
    getResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        console.log('%cResource Timing', 'font-weight: bold; color: tomato');
        for(const resource of resources) {
            console.log(
            `Name: ${resource.name}\n`,
            `Entry Type: ${resource.entryType}\n`,
            `Start Time: ${resource.startTime}\n`,
            `Duration: ${resource.duration}\n`,
            `Redirect: ${resource.redirectEnd - resource.redirectStart}\n`,
            `DNS: ${resource.domainLookupEnd - resource.domainLookupStart}\n`,
            `TCP: ${resource.connectEnd - resource.connectStart}\n`,
            `Request: ${resource.responseStart - resource.requestStart}\n`,
            `Response: ${resource.responseEnd - resource.responseStart}\n`
            );
        }
    }
    getPaintTiming () {
        const paints = performance.getEntriesByType('paint');
        console.log('%cPaint Timing', 'font-weight: bold; color: tomato');
        for(const paint of paints) {
            console.log(
                `Name: ${paint.name}\n`,
                `Entry Type: ${paint.entryType}\n`,
                `Start Time: ${paint.startTime}\n`,
                `Duration: ${paint.duration}\n`
            );
        }
    }
    getServerTiming () {
        const servers = performance.getEntriesByType('server');
        console.log('%cServer Timing', 'font-weight: bold; color: tomato');
        for(const server of servers) {
            console.log(
                `Name: ${server.name}\n`,
                `Entry Type: ${server.entryType}\n`,
                `Start Time: ${server.startTime}\n`,
                `Duration: ${server.duration}\n`,
                `Metric: ${server.metric}\n`,
                `Description: ${server.description}\n`
            );
        }
    }
}

export default SiteSpeedChecker;