import { InputHTMLAttributes, ReactElement } from "react";
import { CSSProp } from "styled-components";

export interface IInputSearchProps extends InputHTMLAttributes<HTMLInputElement>{
  placeholder?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  icon?: boolean;
}

export interface ContainerProps {
  styleContainer: CSSProp
}

export interface InputProps {
  styleInput: CSSProp;
}