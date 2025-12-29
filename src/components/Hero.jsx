import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.css'

const baseImages = [
  {
    src: '/images/image2.avif',
    title: 'Basundii',
    desc: 'Soft, milk dough dipped in\nsweet kesar magic.',
  },
  {
    src: '/images/image1.jpg',
    title: 'Tikhi Aamthi',
    desc: 'Turichi special a\nTikhhi Amthi.',
  },
  {
    src: '/images/image3.webp',
    title: 'Vada Paw',
    desc: 'Fluffy bread layered with\na vada.',
  },
  {
    src: '/images/image5.jpg',
    title: '56 Bhog ',
    desc: 'All in one \n veg thali.',
  },
  {
    src: '/images/image4.webp',
    title: 'Ukadhiche Modak',
    desc: 'Deep fried with air\ngolden, flaky crown.',
  },
]

const images = [...baseImages, ...baseImages, ...baseImages]
const GAP = 700

const Hero = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1) 

  const next = () => {
    setDirection(1) 
    setIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setDirection(-1) 
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const visible = [
    images[index % images.length],
    images[(index + 1) % images.length],
    images[(index + 2) % images.length],
  ]

  const centerItem = images[(index + 1) % images.length]

  return (
    <div className="hero">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={centerItem.title}
          className="hero-text"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1>{centerItem.title}</h1>
          <p>
            {centerItem.desc.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="carousel">
        <AnimatePresence initial={false}>
          {visible.map((item, i) => (
            <motion.div
              key={item.src}
              className="card"
              onClick={i === 2 ? next : i === 0 ? prev : undefined}
              initial={{
                x: i === 2 ? GAP * 2 : (i - 1) * GAP,
                opacity: 0,
                scale: 0.7,
                rotate: 180,
              }}
              animate={{
                x: (i - 1) * GAP,
                opacity: 1,
                scale: i === 1 ? 1.15 : 0.7,
                rotate: i === 1 ? 0 : 180,
              }}
              exit={{
                x: -direction * GAP * 2, 
                opacity: 0,
                scale: 0.7,
                rotate: 180,
              }}
              transition={{
                x: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
                rotate: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: 1.1,
                  ease: 'easeOut',
                },
                opacity: {
                  duration: 0.4,
                },

              }}
            >
              <img src={item.src} alt={item.title} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Hero
