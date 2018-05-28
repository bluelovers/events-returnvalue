/**
 * Created by user on 2018/5/28/028.
 */
/// <reference types="node" />
import * as EventEmitterNode from 'events';
export declare class EventEmitter extends EventEmitterNode {
    on<R extends any, T extends any>(event: string, listener: (cacheEvent?: {
        triggered?: boolean;
        name?: string;
        returnValue?: R;
    } & T, ...argv: any[]) => void): this;
    once<R extends any, T extends any>(event: string, listener: (cacheEvent?: {
        triggered?: boolean;
        name?: string;
        returnValue?: R;
    } & T, ...argv: any[]) => void): this;
    emit<R extends any, T extends any>(event: string, cacheEvent?: {
        triggered?: boolean;
        name?: string;
        returnValue?: R;
    } & T, ...argv: any[]): {
        triggered?: boolean;
        name?: string;
        returnValue?: R;
    } & T;
}
export default EventEmitter;
