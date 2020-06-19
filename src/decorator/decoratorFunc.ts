const delay = (f: Function, delay: number) => (...args: any) => setTimeout(() => f(...args), delay);
const debounce = (f: Function, ms: number) => {
  let lastCallTime = 0;

  return (...args: any) => {
    if(Date.now() - lastCallTime >= ms){
      lastCallTime = Date.now();
      f(...args);
    }
  }
};
const throttle = (f: Function, ms: number) => {
  let lastArgs: any;
  let hasSomethingToCall = false;
  let onCooldown = false;

  let execute = () => {
    if(hasSomethingToCall){
      setTimeout(() => {onCooldown = false; execute();}, ms);
      f(...lastArgs);
      onCooldown = true;
      hasSomethingToCall = false;
      lastArgs = undefined;
    }
  }

  return (...args: any) => {
    lastArgs = args;
    hasSomethingToCall = true;
    if(!onCooldown) execute();
  }
}
const f = (...args: any) => console.log(Date.now() + ':', ...args);

const fDelay100 = delay(f, 100);
const fDebounce1000 = debounce(f, 1000);
const ft500 = throttle(f, 500);
const mixed = delay(ft500, 500);

const test = (f: Function, prefix: string) => {
  f(prefix + ' 1');
  f(prefix + ' 2');
  setTimeout(() => f(prefix + ' 3'), 5);
  setTimeout(() => f(prefix + ' 4'), 100);
  setTimeout(() => f(prefix + ' 5'), 500);
  setTimeout(() => f(prefix + ' 6'), 900);
  setTimeout(() => f(prefix + ' 7'), 1500);
  setTimeout(() => f(prefix + ' 8'), 2100);
}

test(f, 'f');
test(mixed, 'mixed');
