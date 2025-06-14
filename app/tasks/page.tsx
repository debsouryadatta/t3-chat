"use client";

import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<"all" | "incomplete" | "completed">("all");
  
  // Query different task lists based on our requirements
  const allTasks = useQuery(api.tasks.get);
  const incompleteTasks = useQuery(api.tasks.getAllIncompleteTasks);
  const completedTasks = useQuery(api.tasks.getCompletedTasks);
  
  // Get the appropriate tasks based on the active tab
  const displayedTasks = 
    activeTab === "all" ? allTasks :
    activeTab === "incomplete" ? incompleteTasks :
    completedTasks;
  
  // Mutation to toggle task completion status
  const setTaskCompleted = useMutation(api.tasks.setTaskCompleted);
  
  // Handler for toggling task completion
  const handleToggleComplete = (taskId: Id<"tasks">, currentStatus: boolean) => {
    setTaskCompleted({ taskId, isCompleted: !currentStatus });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">✅ Task Manager</h1>
            <p className="text-blue-100 mt-2">Stay organized and productive</p>
          </div>
          
          {/* Tab navigation */}
          <div className="bg-gray-50 px-8 py-4">
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "all" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                All Tasks
              </button>
              <button 
                onClick={() => setActiveTab("incomplete")} 
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "incomplete" 
                    ? "bg-white text-orange-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                Incomplete
              </button>
              <button 
                onClick={() => setActiveTab("completed")} 
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "completed" 
                    ? "bg-white text-green-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          {/* Task list */}
          <div className="px-8 py-6">
            {displayedTasks?.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 text-lg font-medium">No tasks found</p>
                <p className="text-gray-400 text-sm mt-2">Add some tasks to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedTasks?.map(({ _id, text, isCompleted }) => (
                  <div 
                    key={_id} 
                    className={`group flex items-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      isCompleted 
                        ? "bg-green-50 border-green-200 hover:bg-green-100" 
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={isCompleted} 
                        onChange={() => handleToggleComplete(_id, isCompleted)}
                        className={`mr-4 h-5 w-5 rounded border-2 transition-colors duration-200 ${
                          isCompleted 
                            ? "text-green-600 border-green-300 focus:ring-green-500" 
                            : "text-blue-600 border-gray-300 focus:ring-blue-500"
                        }`}
                      />
                      <span className={`text-lg transition-all duration-200 ${
                        isCompleted 
                          ? "line-through text-green-600 opacity-75" 
                          : "text-gray-800 group-hover:text-blue-700"
                      }`}>
                        {text}
                      </span>
                    </div>
                    <div className="ml-auto">
                      {isCompleted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Done
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          ⏳ Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
