'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    color: string
    size: number
}

const COLORS = [
    '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff',
    '#5f27cd', '#01a3a4', '#f368e0', '#ff9f43', '#ee5a24',
    '#00d2d3', '#c8d6e5', '#ffd32a', '#ff6348', '#7bed9f',
]

export default function FireworksBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animFrameRef = useRef<number>(0)

    const createBurst = useCallback((x: number, y: number) => {
        const count = 25 + Math.floor(Math.random() * 15)
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
            const speed = 2 + Math.random() * 4
            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 40 + Math.random() * 30,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 2 + Math.random() * 3,
            })
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const handleClick = (e: MouseEvent) => {
            createBurst(e.clientX, e.clientY)
        }
        window.addEventListener('click', handleClick)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife)

            for (const p of particlesRef.current) {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.06 // gravity
                p.vx *= 0.99
                p.life++

                const alpha = 1 - p.life / p.maxLife
                ctx.save()
                ctx.globalAlpha = alpha
                ctx.fillStyle = p.color
                ctx.shadowBlur = 6
                ctx.shadowColor = p.color
                const radius = Math.max(0, p.size * alpha)
                ctx.beginPath()
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }

            animFrameRef.current = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('click', handleClick)
            cancelAnimationFrame(animFrameRef.current)
        }
    }, [createBurst])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: 'screen' }}
        />
    )
}
