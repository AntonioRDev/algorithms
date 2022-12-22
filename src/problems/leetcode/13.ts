//13. Roman to Integer

function romanToInt(s: string): number {
  const romansNumbesMap = new Map<string, number>();
  romansNumbesMap.set("I", 1);
  romansNumbesMap.set("V", 5);
  romansNumbesMap.set("X", 10);
  romansNumbesMap.set("L", 50);
  romansNumbesMap.set("C", 100);
  romansNumbesMap.set("D", 500);
  romansNumbesMap.set("M", 1000);

  let value = 0;
  let i = 0;

  while (i < s.length) {
    if (s[i + 1]) {
      const actualNumber = romansNumbesMap.get(s[i])!;
      const nextNumber = romansNumbesMap.get(s[i + 1])!;

      if (actualNumber < nextNumber) {
        value += nextNumber - actualNumber;
        i = i + 2;
        continue;
      } else {
        value += actualNumber;
      }
    } else {
      value += romansNumbesMap.get(s[i])!;
    }

    i++;
  }

  return value;
}
