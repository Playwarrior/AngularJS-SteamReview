export function clone<T>(array: T[]): T[]{
  let newArray: T[] = [];

  for(let a of array) {
    newArray.push(Object.assign({}, a));
  }

  return newArray;
}

