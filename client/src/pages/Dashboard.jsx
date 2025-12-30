import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Edit2 } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await axios.get('http://localhost:5000/api/tasks', config);
            setTasks(data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            if (editingTask) {
                await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, { title, description }, config);
                toast.success('Task updated');
                setEditingTask(null);
            } else {
                await axios.post('http://localhost:5000/api/tasks', { title, description }, config);
                toast.success('Task created');
            }
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
            toast.success('Task deleted');
            fetchTasks();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(filter.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                    PrimeTrade
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 font-medium">Hello, {user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile & Add Task */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-xl">
                            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                            </div>
                            <div className="px-6 py-5 bg-gradient-to-br from-white to-gray-50">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-gray-900">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Task Form Card */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-xl">
                            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {editingTask ? 'Edit Task' : 'Create New Task'}
                                </h3>
                            </div>
                            <div className="px-6 py-5">
                                <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Task Title</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            placeholder="e.g., Review Portfolio"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                            placeholder="Add details..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className={`flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${editingTask ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                                        >
                                            {editingTask ? 'Update Task' : 'Add Task'}
                                        </button>
                                        {editingTask && (
                                            <button
                                                type="button"
                                                onClick={() => { setEditingTask(null); setTitle(''); setDescription(''); }}
                                                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Task List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white overflow-hidden shadow-lg rounded-xl min-h-[500px]">
                            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Tasks</h3>
                                <div className="relative rounded-md shadow-sm max-w-xs w-full">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">🔍</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="Search tasks..."
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-6">
                                {filteredTasks.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="mx-auto h-12 w-12 text-gray-400">
                                            {/* Empty State Icon */}
                                            <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                        {filteredTasks.map(task => (
                                            <div key={task._id} className="relative group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-2">
                                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                                                        <p className="text-gray-600 text-sm line-clamp-3">{task.description}</p>
                                                        <p className="text-xs text-gray-400 font-mono mt-2">
                                                            {new Date(task.createdAt).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(task)}
                                                        className="p-1 text-blue-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(task._id)}
                                                        className="p-1 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
