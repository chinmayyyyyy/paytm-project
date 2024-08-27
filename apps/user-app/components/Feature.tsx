export default function Feature() {
    return (
        <section className="py-10 bg-gradient-to-b from-green-50 to-green-100 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
                    <div className="relative mb-12">
                        <img className="w-full rounded-md" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/1/team-work.jpg" alt="Wallet Features" />

                        <div className="absolute w-full max-w-xs px-4 -translate-x-1/2 sm:px-0 sm:max-w-sm left-1/2 -bottom-12">
                            <div className="overflow-hidden bg-white rounded">
                                <div className="px-10 py-6">
                                    <div className="flex items-center">
                                        <p className="flex-shrink-0 text-3xl font-bold text-green-600 sm:text-4xl">24/7</p>
                                        <p className="pl-6 text-sm font-medium text-black sm:text-lg">Secure Transactions <br />Anytime, Anywhere</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
                            <svg className="w-8 h-8 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="mt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">Your Wallet, Your Control</h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600">Easily manage your finances, make instant payments, and track transactions with a user-friendly interface.</p>
                        <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md mt-9 bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-80 focus:opacity-80" role="button">
                            Explore more
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
