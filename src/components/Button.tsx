import classes from './button.module.css'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  svg: TrustedHTML
  label: string
}

export function Button({ svg, label, className, ...rest }: ButtonProps) {
  return (
    <button className={`${classes.btn} ${className || ''}`} {...rest}>
      <span dangerouslySetInnerHTML={{ __html: svg }}></span>
      <span className="visually-hidden">{label}</span>
    </button>
  )
}
