import React from 'react'
import './styles.css'

interface Props {
  type?: 'highlight' | 'piled'
  className?: string
  title?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const getCardDesign = (index: number) => index === 0 ? 'vertical' : 'horizontal'

export function List ({ type = 'piled', title, className = '', style = {}, children }: Props) {
  const totalItems = React.Children.count(children)

  return (
    <section className={`list ${className}`} style={style}>
      {title && <h3 className="text-slate-700 text-2xl font-bold mb-6">{title}</h3>}
      <div className={`list__items list__items--${type} list__items--${totalItems}`}>
        {React.Children.map(children, (child, index) => (
          <div className={`list__item list__item--${type === 'highlight' && totalItems > 2 ?  getCardDesign(index) : 'vertical'}`}>
            {child}
          </div>
        ))}
      </div>
    </section>
  )
}