export const wait = (time: number = 1000) => new Promise<void>((resolve) => setTimeout(resolve, time));
