import React from "react";

const ProjectMetrics = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-700">Total Projects</h4>
        <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-700">Completed</h4>
        <p className="text-3xl font-bold text-green-600 mt-2">9</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-700">In Progress</h4>
        <p className="text-3xl font-bold text-yellow-600 mt-2">3</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-700">Upcoming</h4>
        <p className="text-3xl font-bold text-gray-600 mt-2">4</p>
      </div>
    </section>
  );
};

export default ProjectMetrics;
