import React, { useRef, useCallback, useState } from 'react'
import { useGesture } from '@use-gesture/react'
import { useSprings, a } from '@react-spring/web'

const styles = {
    container: { position: 'relative', height: '100%', width: '75%', touchAction: 'none' },
    item: { position: 'absolute', height: '100%', willChange: 'transform' },
    // Add a transform property behind , or a margin-left to offset the position
}

/**
 * Calculates a spring-physics driven infinite slider
 *
 * @param {Array} items - display items
 * @param {Function} children - render child
 * @param {number} width - fixed item with
 * @param {number} visible - number of items that muste be visible on screen
 */
export function Slider({ items, width = 787, visible = 4, style, children, setActiveIndex, setModal }) {
    const idx = useCallback((x, l = items.length) => (x < 0 ? x + l : x) % l, [items])
    const getPos = useCallback((i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx), [idx])
    const [springs, api] = useSprings(
        items.length,
        // This part to change the starting point abit
        i => ({ x: (i < items.length - 1 ? i + 1 : 0) * width - width })
    )
    const prev = useRef([0, 1])
    const target = useRef()
    const [prevIndex, setPrevIndex] = useState(0);


    const runSprings = useCallback(
        (y, dy) => {
            const firstVis = idx(Math.floor(y / width) % items.length)
            const firstVisIdx = dy < 0 ? items.length - visible - 1 : 1
            api.start(i => {
                const position = getPos(i, firstVis, firstVisIdx)
                const prevPosition = getPos(i, prev.current[0], prev.current[1])
                const rank = firstVis - (y < 0 ? items.length : 0) + position - firstVisIdx
                const configPos = dy > 0 ? position : items.length - position
                return {
                    x: (-y % (width * items.length)) + width * rank,
                    immediate: dy < 0 ? prevPosition > position : prevPosition < position,
                    config: { tension: (1 + items.length - configPos) * 100, friction: 30 + configPos * 40 },
                }
            })
            prev.current = [firstVis, firstVisIdx]
        },
        [idx, getPos, width, visible, api, items.length]
    )

    const wheelOffset = useRef(0)
    const dragOffset = useRef(0)


    const handleDrag = ({ event, offset: [x], direction: [dx] }) => {
        setModal(false);

        if (dx) {
            dragOffset.current = -x
            runSprings(wheelOffset.current + -x, -dx)

            let currentIndex = Math.round(((-x + dragOffset.current) / 2) / width)

            if (currentIndex >= 0) {
                const subtract = currentIndex > 12 ? currentIndex - 12 * Math.floor(currentIndex / 13) - 1 : currentIndex
                setActiveIndex(subtract)
            } else {
                setActiveIndex(13 + currentIndex + 13 * Math.abs(Math.floor(currentIndex / 13) + 1))
            }

            setPrevIndex(currentIndex);
        }
    }

    useGesture({ onDrag: handleDrag }, { target, wheel: { eventOptions: { passive: false } } })

    return <>
        <div ref={target} style={{ ...style, ...styles.container }}>
            {springs.map(({ x }, i) => (
                <a.div key={i} style={{ ...styles.item, width, x }} children={children(items[i], i)} />
            ))}
        </div>
    </>
}
