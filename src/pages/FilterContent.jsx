import React from 'react';

const FilterContent = ({ onClose }) => {
  return (
    <div className="space-y-6">
      {/* Example Filter Section */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Related Record Action</h3>
        <select className="w-full border rounded px-3 py-2">
          <option>Done</option>
          <option>Pending</option>
        </select>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm">In the last</span>
          <input type="number" className="w-16 border rounded px-2 py-1 text-sm" defaultValue={2} />
          <span className="text-sm">Days</span>
        </div>
      </div>

      {/* Example Footer */}
      <div className="flex justify-between pt-4 border-t">
        <button onClick={onClose} className="text-gray-500 text-sm">Clear all</button>
        <button className="bg-primary text-white px-4 py-2 rounded text-sm">Apply Filter</button>
      </div>
    </div>
  );
};

export default FilterContent;
