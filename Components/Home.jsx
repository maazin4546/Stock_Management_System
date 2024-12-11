import Link from "next/link";

const Home = () => {
    return (
        <div className='mt-24 px-28'>
            <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col justify-center items-center text-white">
                <header className="bg-white bg-opacity-20 shadow-lg w-full">
                    <div className="container mx-auto p-6 text-center">
                        <h1 className="text-2xl sm:text-5xl font-extrabold text-white drop-shadow-lg">Welcome to Stock Management System</h1>
                    </div>
                </header>

                <main className="container mx-auto p-6 text-center">
                    <section className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Manage Your Inventory Efficiently</h2>
                        <p className="text-lg mb-6">
                            It is a project that features a product addition form and a dynamic table to display products. The table allows users to manage products with actions like delete, edit, and add to cart, ensuring seamless stock management.
                        </p>
                        <Link href="/form">
                            <button className="bg-white text-gray-500 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                                Get Started
                            </button>
                        </Link>
                    </section>
                </main>

                <footer className="bg-white bg-opacity-20 shadow-lg mt-8 w-full">
                    <div className="container mx-auto p-6 text-center">
                        <p className="text-white">© 2024 Stock Management System</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home;
