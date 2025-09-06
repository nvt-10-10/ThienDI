import { SelectTree } from "@app/prototype/types";

export function generateSelect(fields: string[]): SelectTree {
  const selectObj = {};
  fields.forEach((field) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      let current = selectObj;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }

      current[parts[parts.length - 1]] = true;
    } else {
      selectObj[field] = true;
    }
  });

  return selectObj;
}
