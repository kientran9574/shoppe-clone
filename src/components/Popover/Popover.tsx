import { arrow, autoUpdate, FloatingPortal, offset, shift, useFloating, type Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useId, useRef, useState, type ReactNode } from 'react'

interface IProps {
  children: ReactNode
  renderPopover: ReactNode
  className?: string
  positionArrorLeft?: boolean
  placement?: Placement
}
const Popover = ({ children, renderPopover, className, positionArrorLeft,placement }: IProps) => {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const id = useId()
  const { x, y, middlewareData, refs, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement,
    whileElementsMounted: autoUpdate
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10'
                style={{
                  // left: middlewareData.arrow?.x,
                  left: positionArrorLeft ? '140px' : middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
              {/* <div className='bg-white relative shadow-md rounded-sm border border-gray-200 w-[200px]'>
                <div className='flex flex-col items-start py-2 px-3'>
                  <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
                  <button className='py-2 px-3 hover:text-orange mt-2'>English</button>
                </div>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}

export default Popover
