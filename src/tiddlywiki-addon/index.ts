import { MxListenEvents, MxSendEvents, IClippedMessage } from 'src/maoxian-library/type';

const PROTOCOL = 'http://';
const HOST = 'localhost';
const PORT = 5213;

export class TiddlywikiAddon {
  initForm() {
    window.MxAPI.sendEvent(MxSendEvents.setFormInputs, {
      category: 'wiki',
      tagstr: '',
    });
    window.MxAPI.sendEvent(MxSendEvents.overwriteConfig, {
      format: 'markdown',
    });
  }

  setupSaveClippingHandler() {
    window.MxAPI.sendEvent(MxSendEvents.setYielding, {
      name: 'clipped',
    });
    window.MxAPI.listenEvent(MxListenEvents.clipped, this.onClipped.bind(this));
  }

  onClipped(message: IClippedMessage) {
    window.MxAPI.sendEvent(MxSendEvents.setSavingHint, {
      hint: 'Saving to Tiddlywiki...',
    });
    window.MxAPI.sendEvent(MxSendEvents.completeClipping, {
      result: {
        clipID: '612905100',
        originalUrl: 'https://a.org/posts/awesome.html',
        filename: '/home/user/Downloads/clippings/box/security/253143434/index.html',
        url: 'https://my.server.org/clippings/',
        downloadItemId: '',
        taskNum: 6,
        failedTaskNum: 0,
        pendingTaskNum: 0,
        completedTaskNum: 6,
        failedTasks: [],
      },
    });
    window.MxAPI.sendEvent(MxSendEvents.completeClipping, { filename: 'clippings/box/security/253143434/assets/a.jpg', errMsg: 'NetError: open timeout' });
  }
}
