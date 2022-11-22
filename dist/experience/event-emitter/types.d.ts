import type { Emitter } from 'mitt';
declare type TimeEvents = {
    'time/tick': {
        start: number;
        current: number;
        elapsed: number;
        delta: number;
    };
};
declare type ExperienceEvents = {
    'experience/resize': {
        width: number;
        height: number;
        pixelRatio: number;
    };
};
declare type WorldEvents = {
    'world/physics_initialized': undefined;
};
export declare type Events = TimeEvents & ExperienceEvents & WorldEvents;
export declare type EventEmitter = Emitter<Events>;
export {};
