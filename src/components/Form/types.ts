import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

// 表单项包括标签名和插槽
export interface FormItemProps {
  label: string; // 标签名
  prop?: string; // 是model上的哪个属性
}

// 校验规则类型
export interface FormItemRule extends RuleItem {
  trigger?: string; // 验证触发方式
}

// 数据和规则存储在表单里
export type FormRules = Record<string, FormItemRule[]>
export interface FormProps {
  model: Record<string, any>; // 数据
  rules: FormRules; // 校验规则
}

// 表单实例的内容，即添加或移除表单项规则
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

// 表单项实例的内容
export interface FormItemContext {
  prop: string;
  validate: (trigger?: string) => Promise<any>;
  resetField(): void;
  clearValidate(): void;
}

// 错误类型
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

// 要暴露的表单实例
export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void;
  clearValidate: (props?: string[]) => void;
}

export interface ValidateStatusProp {
  state: 'init' |  'success' | 'error';
  errorMessage: string;
  loading: boolean;
}

// 要暴露的表单项实例
export interface FormItemInstance {
  validateStatus: ValidateStatusProp;
  validate: (trigger?: string) => Promise<any>;
  resetField(): void;
  clearValidate(): void;
}

// 使用透传
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
