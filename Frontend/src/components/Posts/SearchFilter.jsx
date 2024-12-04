
const SearchFilter = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
            <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 rounded">All Posts</button>
                <button className="px-4 py-2 bg-gray-200 rounded">Inspiration</button>
                <button className="px-4 py-2 bg-gray-200 rounded">Design</button>
            </div>
            <div className="w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto px-4 py-2 border rounded"
                />
            </div>
        </div>
    );
};

export default SearchFilter;
