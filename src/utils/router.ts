import EditOutlined from '@/components/MenuIcon/EditOutlined';
import type { MenuDataItem } from '@umijs/route-utils';

interface ServerMenu extends MenuDataItem {
  end_type: number;
  ico: string;
  is_permission: number;
  level: number;
  menu_desc: string;
  menu_id: number;
  menu_name: string;
  menu_url: string;
  parent_id: number;
  sort: number;
  spacer: string;
  status: number;
  type: number;
  path: string;
  name: string;
  meta: Meta;
  parent_path?: string;
  parent_name?: string;
  childlist: Partial<ServerMenu>[];
}

interface Meta {
  requiresAuth: boolean;
  icon: string;
  locale: string;
  order: number;
}

function createPath(serverMenu: Partial<ServerMenu>) {
  // if(serverMenu.parent_name){
  //   return `${serverMenu.parent_path}/${serverMenu.path}`
  // }

  return `${serverMenu.path}`;
}

function createName(serverMenu: Partial<ServerMenu>) {
  if (serverMenu.parent_name) {
    return `./${serverMenu.name}/${serverMenu.name}`;
  }

  return `./${serverMenu.name}`;
}

// 根据上面的 menuList变量生成适用于当前umi框架的router配置的函数
export function generateMenu(serverMenu: Partial<ServerMenu>): MenuDataItem {
  if (serverMenu.childlist && serverMenu.childlist.length > 0) {
    for (let i = 0; i < serverMenu.childlist.length; i++) {
      serverMenu.childlist[i].parent_path = `${serverMenu.path}`;
      serverMenu.childlist[i].parent_name = serverMenu.name;
      serverMenu.childlist[i] = generateMenu(serverMenu.childlist[i]);
    }
  }
  const route: MenuDataItem = {
    name: serverMenu.menu_name as string,
    path: createPath(serverMenu),
    icon: EditOutlined(),
  };

  if (serverMenu.childlist && serverMenu.childlist.length > 0) {
    route['routes'] = serverMenu.childlist;
  } else {
    route['component'] = createName(serverMenu);
  }

  return route;
}
