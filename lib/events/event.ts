
export class Events{
    events: { [key: string]: Function[]};

    constructor(){
        /**
         * The registered events
         */
        this.events = {};

    }


    triggerEvent(name : string, args : any[]){
        // the caller index
        let index = 0;

        /**
         * Call this function to run the next function
         */
        const callEvent = () => {
            // check if the callback exists
            if(this.events[name][index]){
                // run the callback
                this.events[name][index](...args, () => {
                    index++;
                    callEvent();
                });
            }
        };

        if(this.events[name]){
            callEvent();
        }
    }

    /**
     * Add a Event listener to the event name
     * 
     * @param name The event name
     * @param callback The callback function.
     */
    on(name : string, callback : Function) {
        if(!this.events[name]){
            this.events[name] = [];
        }

        // add the callback to the event listeners
        this.events[name].push(callback);
    }

    /**
     * Remove the event from the list
     * 
     * @param name The event name
     * @param callback the callback to remove
     */
    remove(name:string, callback: Function){

        // check if the list exists
        if(this.events[name]){
            // look for the function in the list
            for(let i = this.events[name].length - 1; i >= 0; i--){

                // match the callback function
                if(this.events[name][i] === callback){
                    // remove the function from the list
                    this.events[name].splice(i, 1);
                }
            }
        }
    }
}