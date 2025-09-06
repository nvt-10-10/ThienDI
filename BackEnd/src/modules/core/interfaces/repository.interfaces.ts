import { FindOptions } from '@app/prototype/types';
import { Paginate } from '@app/utils';
import { DeepPartial, EntityManager, FindOptionsWhere } from 'typeorm';

/**
 * Generic interface định nghĩa các phương thức CRUD cơ bản cho một entity.
 * @template T - Entity kiểu generic (phải kế thừa từ BaseEntity).
 */
export interface IRepository<T> {
  /**
   * Lấy danh sách tất cả bản ghi của entity.
   * @param manager - EntityManager từ TypeORM.
   * @param options - Tuỳ chọn lọc trường (fields) và quan hệ (relations).
   * @returns Danh sách các bản ghi.
   */
  findAll(
    manager: EntityManager,
    options?: FindOptions<T>
  ): Promise<T[]>;

  /**
   * Tìm một bản ghi theo ID.
   * @param manager - EntityManager từ TypeORM.
   * @param id - Khoá chính của entity.
   * @param options - Tuỳ chọn lọc trường và quan hệ.
   * @returns Bản ghi nếu tồn tại, hoặc null.
   */
  findById(
    manager: EntityManager,
    id: number,
    options?: FindOptions<T>
  ): Promise<T | null>;

  /**
 * Kiểm tra xem một bản ghi có tồn tại với điều kiện cụ thể không.
 * @param manager - EntityManager từ TypeORM.
 * @param options - Điều kiện để kiểm tra.
 */
  exists(manager: EntityManager, where?: FindOptionsWhere<T>): Promise<boolean>;

  /**
 * Đếm số lượng bản ghi thỏa mãn điều kiện.
 * @param manager - EntityManager từ TypeORM.
 * @param condition - Điều kiện đếm.
 */
  count(manager: EntityManager, where?: FindOptionsWhere<T>): Promise<number>;

  /**
 * Tìm kiếm theo điều kiện kèm phân trang (page, size, sort...).
 * @param manager - EntityManager từ TypeORM.
 * @param options - Bao gồm filter + phân trang + sắp xếp.
 */
  findWithPagination(
    manager: EntityManager,
    options: FindOptions<T>
  ): Promise<Paginate<T>>;

  /**
   * Tạo một bản ghi mới trong cơ sở dữ liệu.
   * @param manager - EntityManager từ TypeORM.
   * @param data - Dữ liệu của bản ghi mới (có thể thiếu trường vì dùng DeepPartial).
   * @returns Bản ghi đã được lưu.
   */
  createOne(manager: EntityManager, data: DeepPartial<T>): Promise<T>;

  /**
   * Tạo nhiều bản ghi mới trong cơ sở dữ liệu.
   * @param manager - EntityManager từ TypeORM.
   * @param data - Mảng dữ liệu của nhiều bản ghi.
   * @returns Danh sách bản ghi đã được lưu.
   */
  createMany(manager: EntityManager, data: DeepPartial<T>[]): Promise<T[]>;

  /**
   * Cập nhật một bản ghi theo ID.
   * @param manager - EntityManager từ TypeORM.
   * @param id - Khoá chính của bản ghi cần cập nhật.
   * @param data - Dữ liệu cập nhật.
   * @returns Bản ghi sau khi đã cập nhật.
   */
  update(manager: EntityManager, id: number, data: DeepPartial<T>): Promise<T>;

  /**
   * Xoá mềm một bản ghi (soft delete).
   * @param manager - EntityManager từ TypeORM.
   * @param id - Khoá chính của bản ghi cần xoá.
   */
  delete(manager: EntityManager, id: number): Promise<void>;

  /**
   * Xoá mềm nhiều bản ghi theo danh sách ID.
   * @param manager - EntityManager từ TypeORM.
   * @param ids - Danh sách khoá chính cần xoá.
   */
  deleteMany(manager: EntityManager, ids: number[]): Promise<void>;
}
