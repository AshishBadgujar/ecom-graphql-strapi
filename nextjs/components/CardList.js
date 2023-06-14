import Link from 'next/link'
import React from 'react'

export default function CardList({ id, text, togglePalette }) {
    return (
        <div>
            <Link href={`/product/${id}`}>
                <div class="w-full lg:max-w-full lg:flex cursor-pointer hover:bg-gray-200" onClick={togglePalette}>
                    <div class="p-4 flex flex-col justify-between leading-normal">
                        <p class="text-gray-900">{text}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
