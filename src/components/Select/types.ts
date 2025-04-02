import type { VNode } from 'vue'

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

// 自定义下拉菜单样式
export type RenderLabelFunc = (option: SelectOption) => VNode;
// 自定义筛选方式
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;

export interface SelectProps {
  // v-model
  modelValue: string;
  // 选项
  options?: SelectOption[];
  // 一些基本表单属性
  placeholder: string;
  disabled: boolean;
  clearable?: boolean; // 可清空
  renderLabel?: RenderLabelFunc; // 自定义菜单
  filterable?: boolean; // 是否可筛选
  filterMethod?: CustomFilterFunc; // 自定义筛选
  remote?: boolean; // 是否远程搜索
  remoteMethod?: CustomFilterRemoteFunc; // 远程搜索
}

export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number; // 高亮
}

export interface SelectEmits {
  (e:'change', value: string) : void;
  // (e:'update:modelValue', value: string) : void;
  (e: 'visible-change', value:boolean): void;
  (e: 'clear'): void;
}
