interface NavCrearProps {
    onSubmit: (e:any) => void
    onCancel: () => void
}

export default function NavCrear({ onSubmit, onCancel }: NavCrearProps) {
    return (
        <header className="relative h-14 shadow-md z-50">
            <nav className="bg-opacity-50 backdrop-blur-md fixed top-0 w-full transition-transform duration-300">
                <div className="mx-auto max-w-7xl px-1 sm:px-4 lg:px-6">
                    <div className="relative flex h-14 items-center justify-between sm:justify-center">
                        {/* Hamburguesa */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                {/* Icon when menu is closed.
                                    Menu open: "hidden", Menu closed: "block"
                                */}
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/* Icon when menu is open.
                                Menu open: "block", Menu closed: "hidden" */}
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* tabs */}
                        <div className="w-full justify-between grid grid-cols-3">
                            {/*  items  */}
                            <div className="md:flex flex-1 items-center justify-center hidden">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <button className="text-verde-claro hover:bg-verde hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={onSubmit}>Crear</button>
                                        <button className="text-rose-600 hover:bg-rose-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={onCancel}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={onSubmit}>Crear</button>
                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={onCancel}>Cancelar</button>
                    </div>
                </div>
            </nav>
        </header>
    );
}