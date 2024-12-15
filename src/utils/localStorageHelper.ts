export function getLocalValue(key: string) {
  let value: any[] = [];
  try {
    value = JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch (err) {
    console.error("Could not get favourite.");
  }

  return value;
}

export function setLocalValue(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error("Could not save favourite.");
  }
}
