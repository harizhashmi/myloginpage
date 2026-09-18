import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
    label: string
    error?: string
}

function Input({ label, error, id, ...rest }: InputProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                id={id}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                {...rest}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input