import { User } from "@app/entities";
import { IJwtPayload } from "@app/prototype/interfaces";

import { v4 as uuidv4 } from 'uuid';

function generateUUID(length: number = 6): string {
  return uuidv4().replace(/-/g, '').substring(0, length);
}


export function generateJwtPayLoad(user: User): IJwtPayload {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    key: generateUUID(6),
  }
}
