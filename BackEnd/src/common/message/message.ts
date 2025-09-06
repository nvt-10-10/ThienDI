export type Message = { code: string; message: string };

export const ENTITIES = {
  SPECIFY_TREE: 'SPECIFY_TREE',
  AUTH: 'AUTH',
  REGISTER: 'REGISTER',
  LOGUT: 'LOGOUT',
} as const;
export const ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const;
export const STATUS = { SUCCESS: 'SUCCESS', FAILED: 'FAILED' } as const;

type Entity = keyof typeof ENTITIES;
type Action = keyof typeof ACTIONS;
type Status = keyof typeof STATUS;

export const generateMessage = (
  entity: Entity | null,
  action: Action | null,
  status: Status,
  message: string,
): Message => {
  const codeParts = [entity, action, status].filter(Boolean); // Loại bỏ null hoặc undefined
  return { code: codeParts.join('_'), message };
};
