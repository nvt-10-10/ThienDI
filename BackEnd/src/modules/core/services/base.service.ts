import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { IRepository } from '../interfaces';

@Injectable()
export abstract class BaseService<T> {
  constructor(
    protected readonly repository: IRepository<T>,
  ) { }

  async findAll(
    manager: EntityManager,
    options?: {
      fields?: string[];
      relations?: string[];
    }
  ): Promise<T[]> {
    return this.repository.findAll(manager, options);
  }

  async findById(
    manager: EntityManager,
    id: number,
    options?: {
      fields?: string[];
      relations?: string[];
    }
  ): Promise<T | null> {
    return this.repository.findById(manager, id, options);
  }

  async createOne(manager: EntityManager, data: DeepPartial<T>): Promise<T> {
    return this.repository.createOne(manager, data);
  }

  async createMany(manager: EntityManager, data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.createMany(manager, data);
  }

  async update(manager: EntityManager, id: number, data: DeepPartial<T>): Promise<T> {
    return this.repository.update(manager, id, data);
  }

  async delete(manager: EntityManager, id: number): Promise<void> {
    return this.repository.delete(manager, id);
  }

  async deleteMany(manager: EntityManager, ids: number[]): Promise<void> {
    return this.repository.deleteMany(manager, ids);
  }
}
