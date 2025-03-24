import Link from "next/link";

export default async function MassageCatalog({ massageJson }: { massageJson: Promise<MassageJson> }) {
    const massageJsonReady = await massageJson;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
                Select Your Massage
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Explore {massageJsonReady.count} Shops in our catalog
            </p>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {massageJsonReady.data.map((MassageItem: MassageItem) => (
                    <Link href={`/massage/${MassageItem._id.toString()}`} key={MassageItem._id}>
                        <div className="bg-yellow-200 rounded-lg shadow-md p-5 text-center hover:shadow-xl transition duration-300 cursor-pointer">
                            <h2 className="text-lg font-semibold text-yellow-950">
                                {MassageItem.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
