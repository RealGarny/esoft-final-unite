export interface ClassNameProp {
    className?: string
}

export interface ChildrenProp {
    children?: React.ReactNode;
}

export interface ContainerProps extends ClassNameProp, ChildrenProp {}

export interface ClickableComp extends ClassNameProp {
    onClick?: (...args:any) => void;
}

export interface ButtonProps extends ClickableComp, ChildrenProp {}