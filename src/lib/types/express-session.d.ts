/** Declaration file generated by dts-gen */

export = express_session;

declare function express_session(options: any, ...args: any[]): any;

declare namespace express_session {
    class Cookie {
        constructor(options: any);

        serialize(name: any, val: any): any;

        toJSON(): any;

    }

    class MemoryStore {
        constructor();

        all(callback: any): void;

        clear(callback: any): void;

        destroy(sessionId: any, callback: any): void;

        get(sessionId: any, callback: any): void;

        length(callback: any): any;

        set(sessionId: any, session: any, callback: any): void;

        touch(sessionId: any, session: any, callback: any): void;

    }

    class Session {
        constructor(req: any, data: any);

        destroy(fn: any): any;

        regenerate(fn: any): any;

        reload(fn: any): any;

        resetMaxAge(): any;

        save(fn: any): any;

        touch(): any;

    }

    class Store {
        constructor();

        createSession(req: any, sess: any): any;

        load(sid: any, fn: any): any;

        regenerate(req: any, fn: any): void;

    }

    const prototype: {
    };

    namespace Cookie {
        namespace Cprototype {
            const data: {
                domain: any;
                expires: any;
                httpOnly: any;
                originalMaxAge: any;
                path: any;
                sameSite: any;
                secure: any;
            };

            const expires: any;

            const maxAge: any;

            function serialize(name: any, val: any): any;

            function toJSON(): any;

            namespace serialize {
                const prototype: {
                };

            }

            namespace toJSON {
                const prototype: {
                };

            }

        }

    }

    namespace MemoryStore {
        namespace Mprototype {
            const domain: any;

            function addListener(type: any, listener: any): any;

            function all(callback: any): void;

            function clear(callback: any): void;

            function createSession(req: any, sess: any): any;

            function destroy(sessionId: any, callback: any): void;

            function emit(type: any, ...args: any[]): any;

            function eventNames(): any;

            function get(sessionId: any, callback: any): void;

            function getMaxListeners(): any;

            function length(callback: any): any;

            function listenerCount(type: any): any;

            function listeners(type: any): any;

            function load(sid: any, fn: any): any;

            function on(type: any, listener: any): any;

            function once(type: any, listener: any): any;

            function prependListener(type: any, listener: any): any;

            function prependOnceListener(type: any, listener: any): any;

            function regenerate(req: any, fn: any): void;

            function removeAllListeners(type: any, ...args: any[]): any;

            function removeListener(type: any, listener: any): any;

            function set(sessionId: any, session: any, callback: any): void;

            function setMaxListeners(n: any): any;

            function touch(sessionId: any, session: any, callback: any): void;

            namespace addListener {
                const prototype: {
                };

            }

            namespace all {
                const prototype: {
                };

            }

            namespace clear {
                const prototype: {
                };

            }

            namespace createSession {
                const prototype: {
                };

            }

            namespace destroy {
                const prototype: {
                };

            }

            namespace emit {
                const prototype: {
                };

            }

            namespace eventNames {
                const prototype: {
                };

            }

            namespace get {
                const prototype: {
                };

            }

            namespace getMaxListeners {
                const prototype: {
                };

            }

            namespace length {
                const prototype: {
                };

            }

            namespace listenerCount {
                const prototype: {
                };

            }

            namespace listeners {
                const prototype: {
                };

            }

            namespace load {
                const prototype: {
                };

            }

            namespace on {
                const prototype: {
                };

            }

            namespace once {
                const prototype: {
                };

            }

            namespace prependListener {
                const prototype: {
                };

            }

            namespace prependOnceListener {
                const prototype: {
                };

            }

            namespace regenerate {
                const prototype: {
                };

            }

            namespace removeAllListeners {
                const prototype: {
                };

            }

            namespace removeListener {
                const prototype: {
                };

            }

            namespace set {
                const prototype: {
                };

            }

            namespace setMaxListeners {
                const prototype: {
                };

            }

            namespace touch {
                const prototype: {
                };

            }

        }

    }

    namespace Session {
        namespace Sprototype {
            function destroy(fn: any): any;

            function regenerate(fn: any): any;

            function reload(fn: any): any;

            function resetMaxAge(): any;

            function save(fn: any): any;

            function touch(): any;

            namespace destroy {
                const prototype: {
                };

            }

            namespace regenerate {
                const prototype: {
                };

            }

            namespace reload {
                const prototype: {
                };

            }

            namespace resetMaxAge {
                const prototype: {
                };

            }

            namespace save {
                const prototype: {
                };

            }

            namespace touch {
                const prototype: {
                };

            }

        }

    }

    namespace Store {
        namespace STprototype {
            const domain: any;

            function addListener(type: any, listener: any): any;

            function createSession(req: any, sess: any): any;

            function emit(type: any, ...args: any[]): any;

            function eventNames(): any;

            function getMaxListeners(): any;

            function listenerCount(type: any): any;

            function listeners(type: any): any;

            function load(sid: any, fn: any): any;

            function on(type: any, listener: any): any;

            function once(type: any, listener: any): any;

            function prependListener(type: any, listener: any): any;

            function prependOnceListener(type: any, listener: any): any;

            function regenerate(req: any, fn: any): void;

            function removeAllListeners(type: any, ...args: any[]): any;

            function removeListener(type: any, listener: any): any;

            function setMaxListeners(n: any): any;

            namespace addListener {
                const prototype: {
                };

            }

            namespace createSession {
                const prototype: {
                };

            }

            namespace emit {
                const prototype: {
                };

            }

            namespace eventNames {
                const prototype: {
                };

            }

            namespace getMaxListeners {
                const prototype: {
                };

            }

            namespace listenerCount {
                const prototype: {
                };

            }

            namespace listeners {
                const prototype: {
                };

            }

            namespace load {
                const prototype: {
                };

            }

            namespace on {
                const prototype: {
                };

            }

            namespace once {
                const prototype: {
                };

            }

            namespace prependListener {
                const prototype: {
                };

            }

            namespace prependOnceListener {
                const prototype: {
                };

            }

            namespace regenerate {
                const prototype: {
                };

            }

            namespace removeAllListeners {
                const prototype: {
                };

            }

            namespace removeListener {
                const prototype: {
                };

            }

            namespace setMaxListeners {
                const prototype: {
                };

            }

        }

    }

}
