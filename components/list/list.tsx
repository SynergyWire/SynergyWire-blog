import React from 'react'
import './styles.css'

interface Props {
  type?: 'highlight' | 'piled'
  className?: string
  title?: string
  children?: React.ReactNode
}

export function List ({ type = 'piled', title, className = '', children }: Props) {
  return (
    <section className={`list ${className}`}>
      {title && <h3 className="text-slate-700 text-base mb-3">{title}</h3>}
      <div className={`list__items list__items--${type} list__items--${React.Children.count(children)}`}>
        {type === 'highlight' ? React.Children.map(children, (child, index) => (
          <div className={`list__item list__item--${index === 0 ? 'vertical' : 'horizontal'}`}>
            {child}
          </div>
        )) :
         children
        }
      </div>
    </section>
  )
}