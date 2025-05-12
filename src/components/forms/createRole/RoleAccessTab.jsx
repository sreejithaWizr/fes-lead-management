import React, { useState } from 'react';
import RoleAccessOptions from './RoleAccessOptions';

const tabs = [
  'Lead Management Module',
  'Tech 1 - Student Profile',
  'Tech 1 - Application Process',
  'Marketing Module'
];

const RoleAccessTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2">Role Access</h3>

      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Lead Management Module' && <RoleAccessOptions />}
      {/* Add logic for other tabs if needed */}
    </div>
  );
};

export default RoleAccessTabs;
