export const name = 'dawei dai david';

export function throttle(callback, delay) {
  // Write your code here.
  let timeID;
  let timeLastCalled = 0;
  const wrapper = function(...args) {
    const timeNow = Date.now();
    const timeElapedSinceLastCalled = timeNow - timeLastCalled;
    const remainingTime = delay - timeElapedSinceLastCalled;
    if (remainingTime <= 0) {
      callback.apply(this, args);
      timeLastCalled = Date.now();
    } else {
      clearTimeout(timeID);
      timeID = setTimeout(() => {
        callback.apply(this, args);
        timeLastCalled = Date.now();
      }, remainingTime)
    }
  }

  wrapper.cancel = function() {
    clearTimeout(timeID);
  };

  return wrapper;
}


