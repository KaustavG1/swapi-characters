export function getLocalValue(key: string) {
  let value: any[] = [];
  try {
    value = JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch (err) {
    console.error("Could not get favourite.");
  }

  return value;
}

export function setLocalValue(key: string, value: any[]) {
  let success = false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    success = true;
  } catch (err) {
    console.error("Could not save favourite.");
  }

  return success;
}
