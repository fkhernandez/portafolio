import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'

const Grid = () => {
  return (
  <section id="about" className="section-shell">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-purple/80">
        About
      </p>
      <h2 className="heading mt-4">
        Building thoughtful products with a clean, dependable frontend foundation
      </h2>
      <p className="section-copy">
        I focus on communication, performance, and maintainable implementation so the final product feels polished for users and practical for teams.
      </p>
    </div>

    <div className="mt-12 md:mt-16">
        <BentoGrid> 
            {gridItems.map(({id, title, description, className, img, imgClassName, titleClassName, spareImg}) => (
                <BentoGridItem 
                    id={id} 
                    key={id} 
                    title={title} 
                    description={description}
                    className={className}
                    img={img}
                    imgClassName={imgClassName}
                    titleClassName={titleClassName}
                    spareImg={spareImg}
                />
            ))}
        </BentoGrid>
        </div>
    </section>
  )
}

export default Grid