import type { VNode, ComponentInternalInstance } from "vue";

export interface MessageProps {
  message?: string | VNode;
  duration?: number; // 持续时间，如果为0则一直显示
  showClose?: boolean;
  type?: 'success' | 'warning' | 'info' | 'error'
  onDestroy: () => void;
  offset?: number // 两个消息之间的距离
  id: string;
  zIndex: number
  transitionName?: string
}

// 忽略在工具函数中才插入的必选项
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>;

// message数组项
export interface MessageContext {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance; // 组件内部实例，以便拿到bottom计算位置
  destroy: () => void; // 销毁函数
}
