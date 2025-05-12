import React from 'react';

const checkboxGroups = [
  {
    title: 'Lead Form View Permission',
    options: ['Lead Information', 'Education Qualification', 'Lead Source', 'Lead Status', 'Opportunity']
  },
  {
    title: 'Lead Form Edit Permission',
    options: ['Lead Information', 'Education Qualification', 'Lead Source', 'Lead Status', 'Opportunity']
  },
  {
    title: 'Masked Data View',
    options: ['Email', 'Secondary Email', 'Phone', 'Whatsapp Number', 'Source 1']
  },
  {
    title: 'Delete Access',
    options: ['Opportunity Lead', 'Lead Delete']
  }
];

const singleOptions = [
  'Dashboard Access',
  'Bulk Transfer Option',
  'Bulk Upload Option',
  'Leads Export Option',
  'Leads List View Access',
  'Merge Leads Option',
  'Sleep Option Access',
  'Lead Management Module Access',
  'Create Lead'
];

const RoleAccessOptions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {checkboxGroups.map((group) => (
        <div key={group.title} className="bg-gray-100 p-4 rounded shadow-sm">
          <p className="font-semibold mb-2">{group.title}</p>
          {group.options.map((opt) => (
            <label key={opt} className="flex items-center space-x-2 mb-1">
              <input type="checkbox" className="accent-blue-600" />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      ))}

      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {singleOptions.map((opt) => (
          <label key={opt} className="flex items-center space-x-2">
            <input type="checkbox" className="accent-blue-600" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleAccessOptions;
