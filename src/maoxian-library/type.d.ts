/* eslint-disable no-use-before-define */
export enum MxListenEvents {
  actived = 'actived',
  clipped = 'clipped',
  clipping = 'clipping',
  completed = 'completed',
  confirmed = 'confirmed',
  idle = 'idle',
  ready = 'ready',
  selected = 'selected',
  selecting = 'selecting',
}
export enum MxSendEvents {
  clipElement = 'clip-elem',
  completeClipping = 'complete-clipping',
  confirmElement = 'confirm-elem',
  exitClipping = 'exit-clipping',
  overwriteConfig = 'overwrite-config',
  resumeActived = 'resume-actived',
  saveClipping = 'save-clipping',
  selectElement = 'select-elem',
  setFormInputs = 'set-form-inputs',
  setSavingHint = 'set-saving-hint',
  setYielding = 'set-yielding',
  unsetYielding = 'unset-yielding',
}

export interface IClippedMessage {
  clipping: IClippedMessageClipping;
}

export interface IClippedMessageClipping {
  info: IClippedMessageInfo;
  tasks: IClippedMessageTask[];
}

export interface IClippedMessageInfo {
  category: string;
  clipID: string;
  created_at: string;
  format: string;
  link: string;
  tags: string[];
  title: string;
  version: string;
}

export interface IClippedMessageTask {
  clipId: string;
  createdMs: string;
  filename: string;
  mimeType: string;
  taskType: string;
  text: string;
  type: string;
}

declare global {
  interface Window {
    MxAPI: {
      listenEvent(eventName: MxListenEvents.clipped, listener: (message: IClippedMessage) => void): void;
      listenEvent(eventName: MxListenEvents, listener: (message: any) => void): void;
      sendEvent(eventName: MxSendEvents, message: any): void;
    };
  }
}

export {};
