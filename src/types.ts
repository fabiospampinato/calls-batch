
/* TYPES */

type IQueue = [Function, any[] | undefined][];

type IOptions = {
  preflush?: Function,
  postflush?: Function,
  wait: number
};

/* EXPORT */

export {IQueue, IOptions};
