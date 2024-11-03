import React, { useState } from 'react';

const SuggestionForm = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    return (
        <div className="mt-10 text-center">
            <button 
                onClick={toggleForm} 
                className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700">
                Suggest Something
            </button>
            {showForm && (
                <form className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md inline-block">
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Your suggestion" 
                            className="w-full p-2 border border-gray-300 rounded-lg" 
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default SuggestionForm;
