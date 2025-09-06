// is-entity-id-exists.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
type EntityClassType<T = any> = new () => T;
@ValidatorConstraint({ async: true })
export class IsEntityIdExistsConstraint
  implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async validate(
    entityId: number,
    args: ValidationArguments,
  ): Promise<boolean> {
    const [EntityClass] = args.constraints as [new () => object];
    if (!entityId || !EntityClass) return false;

    const entity = await this.dataSource.getRepository(EntityClass).findOne({
      where: { id: entityId },
    });

    return !!entity;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} with value "${args.value}" does not exist.`;
  }
}

export function IsEntityIdExists<T = any>(
  EntityClass: EntityClassType<T>,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [EntityClass],
      validator: IsEntityIdExistsConstraint,
    });
  };
}
