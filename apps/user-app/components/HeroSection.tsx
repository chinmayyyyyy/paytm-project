"use client";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export default function HeroFunction({ user, onSignin, onSignout }: AppbarProps) {
    return (
        <div className="relative bg-gradient-to-b from-green-50 to-green-100">
            <header className="absolute inset-x-0 top-0 z-10 w-full">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <a href="#" title="Wallet App" className="flex">
                                <h1 className="text-4xl font-bold text-black text-green-500">Wallet</h1>
                            </a>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-white uppercase transition-all duration-200 bg-black lg:hidden focus:bg-gray-800 hover:bg-gray-800"
                        >
                            <svg className="block w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            <svg className="hidden w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>

                            Menu
                        </button>

                        <div className="hidden lg:flex lg:items-center lg:justify-center lg:ml-10 lg:mr-auto lg:space-x-10">
                            <a href="/dashboard" className="text-base text-black transition-all duration-200 hover:text-opacity-80">Dashboard</a>
                            <a href="/transaction" className="text-base text-black transition-all duration-200 hover:text-opacity-80">Transactions</a>
                            <a href="/dashboard" className="text-base text-black transition-all duration-200 hover:text-opacity-80">Analytics</a>
                            <a href="/scan" className="text-base text-black transition-all duration-200 hover:text-opacity-80">Scan and Pay</a>
                        </div>

                        <a
                            href="#"
                            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"
                            role="button"
                            onClick={user ? onSignout : onSignin}
                        >
                            {user ? "Logout" : "Login"}
                        </a>
                    </div>
                </div>
            </header>

            <section className="overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
                    <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                        <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                            <div className="flex flex-col justify-between flex-1 h-full">
                                <div>
                                    <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">Manage Your Wallet <br />with Ease</h1>
                                    <p className="mt-6 text-base text-black sm:text-xl">Track your expenses, send and receive payments, and stay on top of your financial health.</p>
                                    <a
                                        href="/dashboard"
                                        className="inline-flex items-center px-6 py-5 text-base font-semibold text-black transition-all duration-200 bg-green-300 mt-9 hover:bg-green-400 focus:bg-green-400"
                                        role="button"
                                    >
                                        Get started for free
                                    </a>
                                </div>
                                <div className="border-t-2 border-black  sm:mt-14">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
                        <div className="lg:absolute lg:bottom-0 lg:left-0">
                            <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png" alt="Wallet App Mockup" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
