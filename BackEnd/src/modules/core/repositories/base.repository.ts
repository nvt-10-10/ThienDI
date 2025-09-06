import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import { BaseEntity } from '@app/entities/base.entity';
import { IRepository } from '../interfaces';
import { FindOptions } from '@app/prototype/types';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseAndCodeAndSlug } from '@app/entities/base-code-and-slug.entity';
import { buildPaginationOptions, generateSelect, Paginate } from '@app/utils';

export abstract class BaseRepository<T extends BaseEntity | BaseAndCodeAndSlug>
  implements IRepository<T> {
  constructor(protected readonly entityClass: EntityTarget<T>) { }

  async exists(manager: EntityManager, where?: FindOptionsWhere<T>): Promise<boolean> {
    return await manager.exists(this.entityClass, { where })
  }

  async count(manager: EntityManager, where?: FindOptionsWhere<T>): Promise<number> {
    return await manager.count(this.entityClass, { where })
  }

  async findWithPagination(manager: EntityManager, options: FindOptions<T>): Promise<Paginate<T>> {
    const { fields, paginate, sort } = options
    const selects = fields ? generateSelect(fields) : null

    const { skip, take, orderBy } = buildPaginationOptions(paginate, sort)

    const [results, count] = await manager.findAndCount(this.entityClass, {
      where: options?.where ?? {},
      ...(options?.fields
        ? { select: selects as FindOptionsSelect<T> }
        : {}),
      relations: options?.relations || [],
      skip,
      take,
      order: orderBy as FindOptionsOrder<T>,
    });


    return new Paginate(results, count, paginate.page, paginate.size)
  }

  async findAll(
    manager: EntityManager,
    options?: FindOptions<T>,
  ): Promise<T[]> {
    const selects = options?.fields ? generateSelect(options?.fields) : null
    return await manager.find(this.entityClass, {
      where: options?.where ?? {},
      ...(options?.fields
        ? { select: selects as FindOptionsSelect<T> }
        : {}),
      relations: options?.relations || [],
    });
  }

  async findById(
    manager: EntityManager,
    id: number,
    options?: FindOptions<T>,
  ): Promise<T | null> {
    const selects = options?.fields ? generateSelect(options?.fields) : null
    return await manager.findOne(this.entityClass, {
      where: { id } as FindOptionsWhere<T>,
      ...(options?.fields
        ? { select: selects as FindOptionsSelect<T> }
        : {}),
      relations: options?.relations || [],
    });
  }

  async createOne(manager: EntityManager, data: DeepPartial<T>): Promise<T> {
    const entity = manager.create(this.entityClass, data);
    return await manager.save(this.entityClass, entity);
  }

  async createMany(
    manager: EntityManager,
    data: DeepPartial<T>[],
  ): Promise<T[]> {
    const entities = manager.create(this.entityClass, data);
    return await manager.save(this.entityClass, entities);
  }

  async update(
    manager: EntityManager,
    id: number,
    data: DeepPartial<T>,
  ): Promise<T> {
    await manager.update(this.entityClass, id, data as QueryDeepPartialEntity<T>);
    const updated = await this.findById(manager, id);
    if (!updated) throw new Error('Entity not found after update');
    return updated;
  }

  async delete(manager: EntityManager, id: number): Promise<void> {
    await manager.softDelete(this.entityClass, id);
  }

  async deleteMany(
    manager: EntityManager,
    ids: number[],
  ): Promise<void> {
    await manager.softDelete(this.entityClass, ids);
  }

  async findOne(
    manager: EntityManager,
    options?: FindOptions<T>,
  ): Promise<T | null> {
    const selects = options?.fields ? generateSelect(options?.fields) : null
    return await manager.findOne(this.entityClass, {
      where: options?.where ?? {},
      ...(selects ? { select: selects as FindOptionsSelect<T> } : {}),
      relations: options?.relations || [],
    });
  }
}
