export type SwitchValueType = boolean | string | number;

export interface SwitchProps {
  modelValue: SwitchValueType;
  disabled?: boolean;
  activeText?: string; // 开启时的文字
  inactiveText?: string; // 关闭时的文字
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
}

export interface SwitchEmits {
  // (e: 'update:modelValue', value: SwitchValueType) : void;
  (e: 'change', value: SwitchValueType): void;
}
