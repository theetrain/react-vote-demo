import classes from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  svg: string
  label: string
  className?: string
}

export function Button({ svg, label, className, ...rest }: ButtonProps) {
  return (
    <button className={`${classes.btn} ${className || ''}`} {...rest}>
      <img src={svg} alt={label} />
    </button>
  )
}
