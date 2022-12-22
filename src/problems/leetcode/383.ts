// 383. Ransom Note

function canConstruct(ransomNote: string, magazine: string): boolean {
  const magazineLetterMap = new Map<string, number>();

  for (let i = 0; i < magazine.length; i++) {
    const count = magazineLetterMap.get(magazine[i]);

    if (count !== undefined) {
      magazineLetterMap.set(magazine[i], count + 1);
    } else {
      magazineLetterMap.set(magazine[i], 1);
    }
  }

  for (let j = 0; j < ransomNote.length; j++) {
    const count = magazineLetterMap.get(ransomNote[j]);

    if (!count) {
      return false;
    }

    magazineLetterMap.set(ransomNote[j], count - 1);
  }

  return true;
}
