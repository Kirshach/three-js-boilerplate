import type {Emitter} from 'mitt';

type TimeEvents = {
  'time/tick': {start: number; current: number; elapsed: number; delta: number};
};

type ExperienceEvents = {
  'experience/resize': {width: number; height: number; pixelRatio: number};
};

export type Events = TimeEvents & ExperienceEvents;

export type EventEmitter = Emitter<Events>;
