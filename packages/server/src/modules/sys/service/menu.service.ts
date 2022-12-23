import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { BaseService } from '../../base/base.service';
import {
  MenuCreateDTO,
  MenuDTO,
  MenuPageDTO,
  MenuUpdateDTO,
} from '../dto/menu.dto';
import { Menu } from '../entity/menu';
import { RoleMenu } from '../entity/roleMenu';

@Provide()
export class MenuService extends BaseService {
  @InjectEntityModel(Menu)
  menuModel: Repository<Menu>;

  @InjectEntityModel(Menu)
  roleMenuModel: Repository<RoleMenu>;

  async page(options: Partial<MenuPageDTO>) {
    const { id, name, type, pid } = options;

    const where = {
      id,
      pid,
      type,
      name: name ? Like(name + '%') : undefined,
    };

    const results = await this.menuModel.findAndCount({
      select: [
        'id',
        'name',
        'pid',
        'code',
        'icon',
        'orderNum',
        'url',
        'type',
        'keepAlive',
        'isShow',
        'createTime',
        'updateTime',
      ],
      where,
      order: {
        id: 'DESC',
        createTime: 'DESC',
      },
      skip: (options.current - 1) * options.size,
      take: options.size,
    });

    return { list: results[0], count: results[1] };
  }

  async list(options: Partial<MenuDTO>) {
    const { type, pid } = options || {};
    const list = await this.menuModel.find({
      select: ['id', 'name', 'pid', 'code', 'icon', 'orderNum'],
      where: { type, pid },
    });
    return { list };
  }

  async listByRole(options) {
    const { roleIds } = options || {};
    console.log(roleIds);

    const list = await this.menuModel
      .createQueryBuilder('a')
      .select(
        ` 
        a.id,
        a.pid,
        a.name,
        a.code,
        a.icon,
        a.type,
        a.url,
        a.is_show AS isShow,
        a.keep_alive AS keepAlive,
        a.order_num AS oderName `
      )
      .innerJoin(RoleMenu, 'b', 'a.id =b.menuId')
      .where('b.roleId In (:ids)', { ids: roleIds })
      .groupBy('a.id')
      .getRawMany();

    return { list };
  }

  async info(id: number) {
    const info = await this.menuModel.findOne({ where: { id } });
    return info;
  }

  async create(inDto: MenuCreateDTO) {
    const { id } = await this.menuModel.save(inDto);
    return { id };
  }

  async update(upDto: MenuUpdateDTO) {
    return await this.menuModel.update(upDto.id, upDto);
  }

  async delete(id: number) {
    return await this.menuModel.delete(id);
  }
}
