import { useState, useRef, useEffect } from 'react'

type DropdownProps = {
  onSelect: (option: string) => void
}

export default function Dropdown({ onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('최신순')

  const dropdownRef = useRef<HTMLDivElement>(null)

  const options = ['최신순', '좋아요순', '조회순']

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      className="bg-custom-gray-300 border-custom-gray-200 text-custom-white relative flex cursor-pointer rounded-lg border px-4 py-2"
    >
      <div
        onClick={toggleDropdown}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <span className="text-white">{selectedOption}</span>
        <span className="ml-2">{isOpen ? '🔼' : '🔽'}</span>
      </div>

      {isOpen && (
        <div className="bg-custom-gray-300 border-custom-gray-200 absolute left-0 mt-10 w-full rounded-lg border shadow-md">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => selectOption(option)}
              className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-950"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
