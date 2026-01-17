import { useEffect, useState } from 'react';
import API from '../api/axios';
import Sidebar from '../components/Sidebar';
import { Trash2, FolderPlus } from 'lucide-react'; // Added icons for a better UI

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await API.get('/admin/categories');
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await API.post('/admin/category', { name: newCategory });
            setNewCategory('');
            fetchCategories();
            alert("Category added successfully!");
        } catch (err) {
            alert("Error adding category");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category? This might affect existing courses.")) {
            try {
                await API.delete(`/admin/category/${id}`);
                fetchCategories(); // Refresh list after deletion
            } catch (err) {
                alert("Delete failed. Make sure your backend route is set up.");
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8">
                    <FolderPlus className="text-indigo-600" size={32} />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Categories</h2>
                </div>
                
                {/* Add Category Form */}
                <form onSubmit={handleAddCategory} className="mb-10 bg-white p-4 sm:p-6 rounded shadow-md flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <input 
                        type="text" 
                        placeholder="New Category Name (e.g. Data Science)"
                        className="flex-1 p-2 sm:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded font-semibold hover:bg-indigo-700 transition duration-200 text-sm whitespace-nowrap">
                        Add Category
                    </button>
                </form>

                {/* Categories List Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <div key={cat._id} className="bg-white p-5 rounded-lg shadow border-l-8 border-indigo-500 flex justify-between items-center group">
                                <span className="font-bold text-gray-700 text-lg uppercase tracking-wider">{cat.name}</span>
                                <button 
                                    onClick={() => handleDelete(cat._id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                                    title="Delete Category"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 bg-white rounded shadow italic text-gray-400">
                            No categories found. Start by adding one above.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CategoryManagement;