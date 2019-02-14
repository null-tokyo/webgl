class LongTaskChecker {
    observe() {
        this.observer = new PerformanceObserver(list => {
            const perfEntries = list.getEntries();
            console.log("%cThis Task have more than 50ms per frame!!", "font-weight: bold; color:#f00");
            for(const longtask of perfEntries) {
                console.log(
                    `Name: ${longtask.name}\n`,
                    `Entry Type: ${longtask.entryType}\n`,
                    `Start Time: ${longtask.startTime}\n`,
                    `Duration: ${longtask.duration}`
                );
                console.log('Attribution: ', longtask.attribution);
            }
        });
        this.observer.observe({entryTypes: ['longtask']});
    }
    disconnect() {
        if(this.observer) {
            this.observer.disconnect();
        }
    }
}

export default LongTaskChecker;